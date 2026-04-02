"use client"

import { useState, useMemo, useCallback } from "react"
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore"
import { useFirestore, useCollection } from "@/firebase"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError, type SecurityRuleContext } from "@/firebase/errors"

export interface Wish {
  id: string
  name: string
  status: "Hadir" | "Absen"
  message: string
  createdAt: Date | null
  isPending?: boolean
}

export interface WishFormData {
  name: string
  status: "Hadir" | "Absen"
  message: string
}

interface UseWishesReturn {
  wishes: Wish[]
  isLoading: boolean
  isSending: boolean
  sendWish: (data: WishFormData) => Promise<{ success: boolean; error?: string }>
  isDuplicate: (name: string, message: string) => boolean
}

/**
 * Custom hook for managing wedding wishes with realtime updates
 * and optimistic UI updates
 */
export function useWishes(): UseWishesReturn {
  const firestore = useFirestore()
  const [isSending, setIsSending] = useState(false)
  const [pendingWishes, setPendingWishes] = useState<Wish[]>([])

  // Realtime query for wishes
  const wishesQuery = useMemo(() => {
    if (!firestore) return null
    return query(collection(firestore, "wishes"), orderBy("createdAt", "desc"))
  }, [firestore])

  const { data: wishesFromDb, loading: isLoading } = useCollection(wishesQuery)

  // Combine pending wishes with database wishes for instant display
  const wishes = useMemo(() => {
    const dbWishes = (wishesFromDb || []) as Wish[]
    // Filter out pending wishes that already exist in db
    const filteredPending = pendingWishes.filter(
      pw => !dbWishes.some(dw => 
        dw.name === pw.name && dw.message === pw.message
      )
    )
    return [...filteredPending, ...dbWishes]
  }, [wishesFromDb, pendingWishes])

  // Check for duplicate wishes
  const isDuplicate = useCallback((name: string, message: string): boolean => {
    return wishes.some(
      (wish) => 
        wish.name.toLowerCase() === name.toLowerCase() && 
        wish.message.toLowerCase() === message.toLowerCase()
    )
  }, [wishes])

  // Send a new wish with optimistic update
  const sendWish = useCallback(async (data: WishFormData): Promise<{ success: boolean; error?: string }> => {
    if (!firestore) {
      return { success: false, error: "Database tidak tersedia" }
    }

    if (!data.name || !data.status || !data.message) {
      return { success: false, error: "Mohon lengkapi semua data" }
    }

    if (isDuplicate(data.name, data.message)) {
      return { success: false, error: "Anda sudah mengirimkan ucapan dengan isi yang sama" }
    }

    setIsSending(true)

    const wishData = {
      name: data.name,
      status: data.status,
      message: data.message,
      createdAt: serverTimestamp()
    }

    // Optimistic update
    const tempId = `temp-${Date.now()}`
    const optimisticWish: Wish = {
      id: tempId,
      name: data.name,
      status: data.status,
      message: data.message,
      createdAt: new Date(),
      isPending: true
    }
    setPendingWishes(prev => [optimisticWish, ...prev])

    const wishesRef = collection(firestore, "wishes")

    try {
      await addDoc(wishesRef, wishData)
      // Remove from pending (will be replaced by real data from Firestore subscription)
      setPendingWishes(prev => prev.filter(w => w.id !== tempId))
      setIsSending(false)
      return { success: true }
    } catch (error) {
      // Remove the optimistic update on error
      setPendingWishes(prev => prev.filter(w => w.id !== tempId))
      setIsSending(false)

      const permissionError = new FirestorePermissionError({
        path: wishesRef.path,
        operation: "create",
        requestResourceData: wishData,
      } satisfies SecurityRuleContext)
      errorEmitter.emit("permission-error", permissionError)

      return { success: false, error: "Gagal mengirim konfirmasi. Silakan coba lagi." }
    }
  }, [firestore, isDuplicate])

  return {
    wishes,
    isLoading,
    isSending,
    sendWish,
    isDuplicate,
  }
}
