import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Gejala from "@/pages/Gejala";
import Penyakit from "@/pages/Penyakit";

export const RoutesTemplate = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gejala" element={<Gejala />} />
        <Route path="/penyakit" element={<Penyakit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesTemplate;