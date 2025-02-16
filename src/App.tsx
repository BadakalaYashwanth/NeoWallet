
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/AuthProvider";
import { useAuth } from "@/components/AuthProvider";
import Sidebar from "@/components/Sidebar";
import Auth from "@/pages/Auth";
import Send from "@/pages/Send";
import Receive from "@/pages/Receive";
import Split from "@/pages/Split";
import Transactions from "@/pages/Transactions";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black to-purple-900">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/send"
            element={
              <ProtectedRoute>
                <Send />
              </ProtectedRoute>
            }
          />
          <Route
            path="/receive"
            element={
              <ProtectedRoute>
                <Receive />
              </ProtectedRoute>
            }
          />
          <Route
            path="/split"
            element={
              <ProtectedRoute>
                <Split />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
