import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import { ScrollLinked } from "./pages/OhSeungHa";
import { ScrollLinkedParkSuBin } from "./pages/ParkSuBin";
import { ScrollLinkedMoonJaeWoong } from "./pages/MoonJaeWoong";
import { useEffect } from "react";

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [location]);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        document.body.style.overflow = "auto";
        window.scrollTo(0, 0);
      }}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/profile/1" element={<ScrollLinked />} />
        <Route path="/profile/2" element={<ScrollLinkedParkSuBin />} />
        <Route path="/profile/3" element={<ScrollLinkedMoonJaeWoong />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
