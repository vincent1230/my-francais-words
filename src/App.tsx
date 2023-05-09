import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Conjugation } from "./components/Conjugation";
import { Phonetic } from "./components/Phonetic";
import { RandomAlphabet } from "./components/RandomAlphabet";
import { RandomNum } from "./components/RandomNum";
import { WordGroup } from "./components/WordGroup";
import a1dossier0 from "./data/a1dossier0.json";
import a1dossier1lecon1 from "./data/a1dossier1lecon1.json";
import a1dossier1lecon2 from "./data/a1dossier1lecon2.json";
import a1dossier1lecon3 from "./data/a1dossier1lecon3.json";
import a1dossier2lecon1 from "./data/a1dossier2lecon1.json";
import a1dossier2lecon2 from "./data/a1dossier2lecon2.json";
import a1dossier2lecon3 from "./data/a1dossier2lecon3.json";
import biaodian from "./data/biaodian.json";
import buchong from "./data/buchong.json";
import couleur from "./data/couleur.json";
import nationalite from "./data/nationalite.json";
import possessive_adjectives from "./data/possessive_adjectives.json";
import professions from "./data/professions.json";
import semaine from "./data/semaine.json";
import tourbillon from "./data/tourbillon.json";
import unit1 from "./data/unit1.json";
import unit2 from "./data/unit2.json";
import unit3_1 from "./data/unit3_1.json";
import unit3_2 from "./data/unit3_2.json";
import unit3_3 from "./data/unit3_3.json";
import unit4_1 from "./data/unit4_1.json";
import unit4_2 from "./data/unit4_2.json";
import unit4_3 from "./data/unit4_3.json";
import unit5_1 from "./data/unit5_1.json";
import unit5_2 from "./data/unit5_2.json";
import unit5_3 from "./data/unit5_3.json";
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
      <Route path="couleur" element={<WordGroup words={couleur} />} />
      <Route
        path="possessive_adjectives"
        element={<WordGroup words={possessive_adjectives} />}
      />
      <Route path="unité-1" element={<WordGroup words={unit1} />} />
      <Route path="unité-2" element={<WordGroup words={unit2} />} />
      <Route path="unité-3-1" element={<WordGroup words={unit3_1} />} />
      <Route path="unité-3-2" element={<WordGroup words={unit3_2} />} />
      <Route path="unité-3-3" element={<WordGroup words={unit3_3} />} />
      <Route path="unité-4-1" element={<WordGroup words={unit4_1} />} />
      <Route path="unité-4-2" element={<WordGroup words={unit4_2} />} />
      <Route path="unité-4-3" element={<WordGroup words={unit4_3} />} />
      <Route path="unité-5-1" element={<WordGroup words={unit5_1} />} />
      <Route path="unité-5-2" element={<WordGroup words={unit5_2} />} />
      <Route path="unité-5-3" element={<WordGroup words={unit5_3} />} />
      <Route path="biaodian" element={<WordGroup words={biaodian} />} />
      <Route path="buchong" element={<WordGroup words={buchong} />} />
      <Route path="a1dossier0" element={<WordGroup words={a1dossier0} />} />
      <Route path="a1dossier1lecon1" element={<WordGroup words={a1dossier1lecon1} />} />
      <Route path="a1dossier1lecon2" element={<WordGroup words={a1dossier1lecon2} />} />
      <Route path="a1dossier1lecon3" element={<WordGroup words={a1dossier1lecon3} />} />
      <Route path="a1dossier2lecon1" element={<WordGroup words={a1dossier2lecon1} />} />
      <Route path="a1dossier2lecon2" element={<WordGroup words={a1dossier2lecon2} />} />
      <Route path="a1dossier2lecon3" element={<WordGroup words={a1dossier2lecon3} />} />
    </Routes>
  );
}

export default App;
