import { Route, Routes } from "react-router-dom";
import "./App.css";
import { WordGroup } from "./components/WordGroup";
import nationalite from "./data/nationalite.json";
import semaine from "./data/semaine.json";
import unit1 from "./data/unit1.json";
import Guide from "./guide";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Guide />} />
      <Route path="nationalité" element={<WordGroup words={nationalite} />} />
      <Route path="semaine" element={<WordGroup words={semaine} />} />
      <Route path="unit1" element={<WordGroup words={unit1} />} />
    </Routes>
  );
}

export default App;
