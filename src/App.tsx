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
import AdminTickets from "@/pages/admin/AdminTickets";
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
import SupportTickets from "@/pages/SupportTickets";
import {
  QuoteBuilder, SalaryDates, ExpenseReport, MonthlyBilling,
  TaxPortal, Projects, AssignTasks, EditorDashboard,
  TeamDashboard,
} from "@/pages/PlaceholderPages";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="tenants" element={<AdminTenants />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="tickets" element={<AdminTickets />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}

function CustomerRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Onboarding */}
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />

        {/* Protected app routes */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<CustomerRoutes />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
