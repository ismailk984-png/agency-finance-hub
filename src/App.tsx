import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminAuthProvider, AdminRoute } from "@/contexts/AdminAuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/AppLayout";
import AdminLayout from "@/components/AdminLayout";

// Public pages
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Onboarding from "@/pages/Onboarding";

// Admin pages
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminTenants from "@/pages/admin/AdminTenants";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminSettings from "@/pages/admin/AdminSettings";

// Protected pages
import Dashboard from "@/pages/Dashboard";
import Clients from "@/pages/Clients";
import Employees from "@/pages/Employees";
import FixedExpenses from "@/pages/FixedExpenses";
import Vendors from "@/pages/Vendors";
import Contracts from "@/pages/Contracts";
import FounderDashboard from "@/pages/FounderDashboard";
import SettingsPage from "@/pages/SettingsPage";
import TeamManagement from "@/pages/TeamManagement";
import BillingPage from "@/pages/BillingPage";
import {
  QuoteBuilder, SalaryDates, ExpenseReport, MonthlyBilling,
  TaxPortal, Projects, AssignTasks, EditorDashboard,
  TeamDashboard,
} from "@/pages/PlaceholderPages";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin routes (separate auth context) */}
          <Route element={<AdminAuthProvider><Route /></AdminAuthProvider>}>
            <Route path="/admin/login" element={<AdminAuthProvider><AdminLogin /></AdminAuthProvider>} />
            <Route element={<AdminAuthProvider><AdminRoute><AdminLayout /></AdminRoute></AdminAuthProvider>}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/tenants" element={<AdminTenants />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* Customer routes */}
          <Route element={<AuthProvider><Route /></AuthProvider>}>
            {/* Public routes */}
            <Route path="/" element={<AuthProvider><Landing /></AuthProvider>} />
            <Route path="/login" element={<AuthProvider><Login /></AuthProvider>} />
            <Route path="/signup" element={<AuthProvider><Signup /></AuthProvider>} />
            <Route path="/forgot-password" element={<AuthProvider><ForgotPassword /></AuthProvider>} />
            <Route path="/reset-password" element={<AuthProvider><ResetPassword /></AuthProvider>} />

            {/* Onboarding */}
            <Route path="/onboarding" element={<AuthProvider><ProtectedRoute><Onboarding /></ProtectedRoute></AuthProvider>} />

            {/* Protected app routes */}
            <Route element={<AuthProvider><ProtectedRoute><AppLayout /></ProtectedRoute></AuthProvider>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/fixed-expenses" element={<FixedExpenses />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/founders" element={<FounderDashboard />} />
              <Route path="/quote" element={<QuoteBuilder />} />
              <Route path="/salary-dates" element={<SalaryDates />} />
              <Route path="/expense-report" element={<ExpenseReport />} />
              <Route path="/monthly-billing" element={<MonthlyBilling />} />
              <Route path="/tax" element={<TaxPortal />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/assign-tasks" element={<AssignTasks />} />
              <Route path="/editor-dashboard" element={<EditorDashboard />} />
              <Route path="/team-dashboard" element={<TeamDashboard />} />
              <Route path="/team" element={<TeamManagement />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/billing" element={<BillingPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
