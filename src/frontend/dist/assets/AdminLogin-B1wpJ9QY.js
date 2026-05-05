import { a as useNavigate, r as reactExports, j as jsxRuntimeExports, d as ue } from "./index-BgVkh6qM.js";
import { c as createLucideIcon, j as useAdmin, k as useAdminLogin, L as Layout, F as Factory, I as Input, E as Eye, B as Button } from "./useArticles-C4geP0DZ.js";
import { L as Label } from "./label-B-A-uBM4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode);
function AdminLoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAdmin();
  const { mutate: login, isPending } = useAdminLogin();
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  if (isAuthenticated) {
    navigate({ to: "/admin" });
    return null;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const passwordHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    login(
      { username, passwordHash },
      {
        onSuccess: () => {
          ue.success("Logged in successfully");
          navigate({ to: "/admin" });
        },
        onError: (err) => {
          ue.error(err instanceof Error ? err.message : "Login failed");
        }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { hideFooter: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background px-4",
      "data-ocid": "admin_login.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-8 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Factory, { className: "w-6 h-6 text-primary-foreground" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-center text-foreground mb-1", children: "Admin Login" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center mb-8", children: "Sign in to manage CementHub content" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "username", className: "font-display text-sm", children: "Username" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "username",
                type: "text",
                autoComplete: "username",
                value: username,
                onChange: (e) => setUsername(e.target.value),
                required: true,
                placeholder: "admin",
                "data-ocid": "admin_login.username_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "font-display text-sm", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "password",
                  type: showPassword ? "text" : "password",
                  autoComplete: "current-password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  required: true,
                  placeholder: "••••••••",
                  className: "pr-10",
                  "data-ocid": "admin_login.password_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth",
                  onClick: () => setShowPassword(!showPassword),
                  "aria-label": showPassword ? "Hide password" : "Show password",
                  "data-ocid": "admin_login.toggle_password",
                  children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full font-display",
              disabled: isPending || !username || !password,
              "data-ocid": "admin_login.submit_button",
              children: isPending ? "Signing in…" : "Sign in"
            }
          )
        ] })
      ] }) })
    }
  ) });
}
export {
  AdminLoginPage as default
};
