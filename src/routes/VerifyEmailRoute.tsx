import { useAuth } from "@/hooks/useAuth"
import type { ReactNode } from "react"
import { Navigate } from "react-router"

interface VerifyEmailRouteProps {
  children: ReactNode
}

const VerifyEmailRoute = ({ children }: VerifyEmailRouteProps) => {
  const { user, isLoading } = useAuth()

  // Wait for auth check before deciding
  if (isLoading) {
    return null
  }

  // Not logged in or already verified → go home
  if (!user || user.isVerified) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default VerifyEmailRoute