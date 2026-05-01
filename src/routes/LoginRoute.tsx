import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router"

const LoginRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Checking auth...</div>
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default LoginRoute