import { Routes, Route } from "react-router-dom"
import LandingPage from "./components/pages/LandingPage"
import LoginPage from "./components/pages/Auth"
import NotFound from "./components/pages/NotFound"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/*" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
