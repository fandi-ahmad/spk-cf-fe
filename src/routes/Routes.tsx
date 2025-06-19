import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Gejala from "@/pages/Gejala";
import Penyakit from "@/pages/Penyakit";
import PenyakitDetail from "@/pages/PenyakitDetail";

import Pengetahuan from "@/pages/Pengetahuan";
import PengetahuanDetail from "@/pages/PengetahuanDetail";

export const RoutesTemplate = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gejala" element={<Gejala />} />
        <Route path="/penyakit" element={<Penyakit />} />
        <Route path="/penyakit/:id_penyakit" element={<PenyakitDetail />} />
        <Route path="/pengetahuan" element={<Pengetahuan />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesTemplate;