"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LoginModal from "@/components/login-modal"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      setShowLoginModal(true)
    }
  }, [status])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      {session ? (
        children
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-4 max-w-md">
            <h1 className="text-3xl font-bold">Authentication Required</h1>
            <p className="text-muted-foreground">
              You need to be logged in to access this page. Please sign in or create an account.
            </p>
          </div>
        </div>
      )}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false)
          router.push("/")
        }}
      />
    </>
  )
}

