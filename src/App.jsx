import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./components/pages/LandingPage"
import LoginPage from "./components/pages/Auth"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
