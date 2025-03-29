"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import LoginModal from "@/components/login-modal"

export function useAuthRequired() {
  const { data: session } = useSession()
  const [showLoginModal, setShowLoginModal] = useState(false)

  const requireAuth = (callback?: () => void) => {
    if (session) {
      callback && callback()
      return true
    } else {
      setShowLoginModal(true)
      return false
    }
  }

  return {
    isAuthenticated: !!session,
    requireAuth,
    LoginModal: <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />,
  }
}

