"use client"

import { useState, useEffect, useCallback } from "react"

export interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
  totalSeconds: number
}

interface UseCountdownOptions {
  /** Whether to start the countdown immediately */
  autoStart?: boolean
  /** Callback when countdown reaches zero */
  onComplete?: () => void
  /** Update interval in milliseconds (default: 1000) */
  interval?: number
}

/**
 * Custom hook for countdown timer functionality
 * @param targetDate - The target date string or Date object
 * @param options - Configuration options
 */
export function useCountdown(
  targetDate: string | Date,
  options: UseCountdownOptions = {}
): CountdownTime {
  const { autoStart = true, onComplete, interval = 1000 } = options

  const calculateTimeLeft = useCallback((): CountdownTime => {
    const target = typeof targetDate === "string" 
      ? new Date(targetDate).getTime() 
      : targetDate.getTime()
    const now = new Date().getTime()
    const difference = target - now

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
        totalSeconds: 0,
      }
    }

    const totalSeconds = Math.floor(difference / 1000)

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
      totalSeconds,
    }
  }, [targetDate])

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft)

  useEffect(() => {
    if (!autoStart) return

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)

      if (newTimeLeft.isExpired) {
        clearInterval(timer)
        onComplete?.()
      }
    }, interval)

    return () => clearInterval(timer)
  }, [autoStart, calculateTimeLeft, interval, onComplete])

  return timeLeft
}

/**
 * Format countdown time to display string
 */
export function formatCountdownUnit(value: number): string {
  return value.toString().padStart(2, "0")
}
