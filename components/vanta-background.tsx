"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface VantaBackgroundProps {
  className?: string
}

declare global {
  interface Window {
    VANTA: any
    THREE: any
    p5: any
  }
}

export function VantaBackground({ className }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement | null>(null)
  const vantaEffectRef = useRef<any>(null)
  const [scriptsReady, setScriptsReady] = useState(false)
  const [opacity, setOpacity] = useState(0) // Start invisible for fade-in
  const { theme, resolvedTheme } = useTheme()

  // Poll for scripts to be ready
  useEffect(() => {
    const checkScripts = () => {
      // Ensure Vanta and its dependencies (THREE or p5) are available
      const hasThree = typeof window !== "undefined" && !!window.THREE
      const hasP5 = typeof window !== "undefined" && !!window.p5
      const hasVanta = typeof window !== "undefined" && window.VANTA?.TOPOLOGY

      if ((hasThree || hasP5) && hasVanta) {
        setScriptsReady(true)
        return true
      }
      return false
    }

    // Check immediately
    if (checkScripts()) return

    // Poll every 100ms
    const interval = setInterval(() => {
      if (checkScripts()) {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Init Vanta once scripts are ready & theme is resolved
  useEffect(() => {
    if (!scriptsReady) return
    if (!vantaRef.current) return
    // Prevent color flashing by waiting for theme resolution
    if (!resolvedTheme) return

    const isDark = theme === "dark" || resolvedTheme === "dark"
    
    // Brand primary color #1EA8D2
    const color = 0x1EA8D2
    const backgroundColor = isDark ? 0xfafafa : 0x0a0a0a

    try {
      if (typeof window.p5 !== 'undefined') {
         // console.log("Initializing Vanta with p5.js")
      }

      // Destroy previous effect if it exists
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy()
      }

      vantaEffectRef.current = window.VANTA.TOPOLOGY({
        el: vantaRef.current,
        p5: window.p5,
        THREE: window.THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: color,
        backgroundColor: backgroundColor,
      })
      console.log(`Vanta initialized: ${isDark ? 'Dark' : 'Light'} (Bg: ${backgroundColor.toString(16)})`)
      
      // Fade in container after initialization
      setTimeout(() => {
        setOpacity(1)
      }, 100)
      
    } catch (error) {
      console.error("Vanta initialization failed:", error)
    }

    return () => {
      // Cleanup effect
      setOpacity(0)
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy()
        vantaEffectRef.current = null
      }
    }
  }, [scriptsReady, theme, resolvedTheme])

  // Initial background color placeholder
  const isDark = theme === "dark" || resolvedTheme === "dark"
  const bgColor = isDark ? "#fafafa" : "#0a0a0a"

  return (
    <div 
      ref={vantaRef} 
      className={className}
      style={{
        backgroundColor: bgColor, // Matches Vanta bg color
        transition: "background-color 0.5s ease, opacity 1s ease",
        opacity: opacity, // Controls fade in
      }}
    />
  )
}
