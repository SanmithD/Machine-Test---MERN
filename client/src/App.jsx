import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from "./pages/NotFound";
import { UseAuthStore } from "./store/UseAuthStore";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const { authUser, checkAuth } = UseAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  return (
    <div>
      <Toaster position="top-right" />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route 
            path="/login" 
            element={authUser ?  <Navigate to='/' replace/> : <Login/> }
          />
          <Route 
            path="/" 
            element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
