import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { useAuth } from "./context/AuthContext.jsx";

//pages
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import Show from "./pages/profile/Show.jsx";
import Edit from "./pages/profile/Edit.jsx";

function WithAuth({ children }) {
  const { user, isAuthenticated, loading } = useAuth();
  return React.cloneElement(children, { user, isAuthenticated, loading });
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <>
              <WithAuth>
                <Dashboard />
              </WithAuth>
            </>
          } />
          <Route path="/perfil" element={
            <>
              <WithAuth>
                <Show />
              </WithAuth>
            </>
          } />
          <Route path="/perfil/editar" element={
            <>
              <WithAuth>
                <Edit />
              </WithAuth>
            </>
          } />
          <Route path="*" element={
            <NotFound />
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}