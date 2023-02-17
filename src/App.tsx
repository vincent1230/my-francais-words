import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Conjugation } from "./components/Conjugation";
import { Phonetic } from "./components/Phonetic";
import { RandomAlphabet } from "./components/RandomAlphabet";
import { RandomNum } from "./components/RandomNum";
import { WordGroup } from "./components/WordGroup";
import colours from "./data/colours.json";
import nationalite from "./data/nationalite.json";
import possessive_adjectives from "./data/possessive_adjectives.json";
import professions from "./data/professions.json";
import semaine from "./data/semaine.json";
import tourbillon from "./data/tourbillon.json";
import unit1 from "./data/unit1.json";
import unit2 from "./data/unit2.json";
import unit3 from "./data/unit3.json";
import verbs from "./data/verbs.json";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Phonetic />} />
      <Route path="phonetic" element={<Phonetic />} />
      <Route path="num" element={<RandomNum />} />
      <Route path="conjugation" element={<Conjugation />} />
      <Route path="alphabet" element={<RandomAlphabet />} />
      <Route path="verbs" element={<WordGroup words={verbs} />} />
      <Route path="nationalité" element={<WordGroup words={nationalite} />} />
      <Route path="semaine" element={<WordGroup words={semaine} />} />
      <Route path="professions" element={<WordGroup words={professions} />} />
      <Route path="tourbillon" element={<WordGroup words={tourbillon} />} />
      <Route path="colours" element={<WordGroup words={colours} />} />
      <Route
        path="possessive_adjectives"
        element={<WordGroup words={possessive_adjectives} />}
      />
      <Route path="unité-1" element={<WordGroup words={unit1} />} />
      <Route path="unité-2" element={<WordGroup words={unit2} />} />
      <Route path="unité-3" element={<WordGroup words={unit3} />} />
    </Routes>
  );
}

export default App;
