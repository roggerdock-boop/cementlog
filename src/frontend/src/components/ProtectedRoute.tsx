import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/admin/login" });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
