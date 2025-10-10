import "./App.css"
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import Catalogo from "./pages/Catalogo.jsx";
import DetalleCelular from "./pages/DetalleCelular.jsx";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad.jsx";
import TerminosCondiciones from "./pages/TerminosCondiciones.jsx";
import Locales from "./pages/Locales.jsx";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Catalogo />} />
        <Route path="/celular/:id" element={<DetalleCelular/>} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />
        <Route path="/locales" element={<Locales />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  

  return (
    <BrowserRouter>
      <header>
        <Link to="/" className="logo-link">
          <img className="logo" src="/logos/logo.png" alt="Logo de HTZ" />
        </Link>
      </header>
      <main>
        <AnimatedRoutes/>
      </main>
      <footer>
        <div>
          <img className="footer-logo" src="/logos/logo.png" alt="Logo de HTZ" />
          <p className="eslogan">Tu tecnología, nuestra pasión.</p>
        </div>
        <p>Todos los derechos reservados &copy; 2025 HTZ</p>
        <div className="footer-links">
          <Link to="/terminos-y-condiciones" className="react-link">Terminos y condiciones</Link>
          <Link to="/politica-privacidad" className="react-link">Politica de privacidad</Link>
        </div>
      </footer>
    </BrowserRouter>
  )
}

export default App
