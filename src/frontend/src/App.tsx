import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("@/pages/Home"));
const ArticleDetailPage = lazy(() => import("@/pages/ArticleDetail"));
const AdminLoginPage = lazy(() => import("@/pages/AdminLogin"));
const AdminDashboardPage = lazy(() => import("@/pages/AdminDashboard"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
});

function PageLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
      <Skeleton className="h-8 w-2/5" />
      <Skeleton className="h-4 w-3/5" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  validateSearch: (
    search: Record<string, unknown>,
  ): { search?: string; category?: string; page?: number } => ({
    search: typeof search.search === "string" ? search.search : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
    page: typeof search.page === "number" ? search.page : undefined,
  }),
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const articleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/articles/$slug",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ArticleDetailPage />
    </Suspense>
  ),
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminLoginPage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminDashboardPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  articleRoute,
  adminLoginRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors position="bottom-right" />
    </QueryClientProvider>
  );
}
