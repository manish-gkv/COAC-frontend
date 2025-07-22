import { Routes, Route, Navigate } from "react-router-dom"
import LandingPage from "./components/pages/LandingPage"
import LoginPage from "./components/pages/Auth"
import NotFound from "./components/pages/NotFound"
import useAuth from "./hooks/useAuth"
import Home from "./components/pages/Home"
function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <Home />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/*" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </>
  )
}

export default App
