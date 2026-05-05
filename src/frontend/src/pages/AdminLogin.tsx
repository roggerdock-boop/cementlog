import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin } from "@/hooks/useAdmin";
import { useAdminLogin } from "@/hooks/useArticles";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Factory } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAdmin();
  const { mutate: login, isPending } = useAdminLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) {
    navigate({ to: "/admin" });
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const passwordHash = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    login(
      { username, passwordHash },
      {
        onSuccess: () => {
          toast.success("Logged in successfully");
          navigate({ to: "/admin" });
        },
        onError: (err: unknown) => {
          toast.error(err instanceof Error ? err.message : "Login failed");
        },
      },
    );
  }

  return (
    <Layout hideFooter>
      <div
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background px-4"
        data-ocid="admin_login.page"
      >
        <div className="w-full max-w-sm">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Factory className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-2xl font-display font-bold text-center text-foreground mb-1">
              Admin Login
            </h1>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Sign in to manage CementHub content
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="font-display text-sm">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="admin"
                  data-ocid="admin_login.username_input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-display text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="pr-10"
                    data-ocid="admin_login.password_input"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    data-ocid="admin_login.toggle_password"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full font-display"
                disabled={isPending || !username || !password}
                data-ocid="admin_login.submit_button"
              >
                {isPending ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
