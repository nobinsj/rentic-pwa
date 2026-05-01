import { useAuth } from "@/hooks/useAuth"
import { Navigate, useLocation } from "react-router"
import { Zap } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation()
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#161311]">
        <Zap className="animate-pulse text-[#06F2A2]" />
        <span className="ml-2 text-[10px] font-black text-zinc-500 uppercase">
          Syncing Session...
        </span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute