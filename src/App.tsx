import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Phonetic } from "./components/Phonetic";
import { WordGroup } from "./components/WordGroup";
import nationalite from "./data/nationalite.json";
import semaine from "./data/semaine.json";
import unit1 from "./data/unit1.json";
import unit2 from "./data/unit2.json";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Phonetic />} />
      <Route path="/phonetic" element={<Phonetic />} />
      <Route path="nationalité" element={<WordGroup words={nationalite} />} />
      <Route path="semaine" element={<WordGroup words={semaine} />} />
      <Route path="unité-1" element={<WordGroup words={unit1} />} />
      <Route path="unité-2" element={<WordGroup words={unit2} />} />
    </Routes>
  );
}

export default App;
