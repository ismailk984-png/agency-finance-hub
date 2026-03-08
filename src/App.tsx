import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Clients from "@/pages/Clients";
import Employees from "@/pages/Employees";
import FixedExpenses from "@/pages/FixedExpenses";
import Vendors from "@/pages/Vendors";
import Contracts from "@/pages/Contracts";
import FounderDashboard from "@/pages/FounderDashboard";
import {
  QuoteBuilder, SalaryDates, ExpenseReport, MonthlyBilling,
  TaxPortal, Projects, AssignTasks, EditorDashboard,
  TeamDashboard, Settings,
} from "@/pages/PlaceholderPages";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/" element={<Dashboard />} />
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
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
