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
import a1dossier3lecon1 from "./data/a1dossier3lecon1.json";
import a1dossier3lecon2 from "./data/a1dossier3lecon2.json";
import a1dossier3lecon3 from "./data/a1dossier3lecon3.json";
import a1dossier4lecon1 from "./data/a1dossier4lecon1.json";
import a1dossier4lecon2 from "./data/a1dossier4lecon2.json";
import a1dossier4lecon3 from "./data/a1dossier4lecon3.json";
import a1dossier5lecon1 from "./data/a1dossier5lecon1.json";
import a1dossier5lecon2 from "./data/a1dossier5lecon2.json";
import a1dossier5lecon3 from "./data/a1dossier5lecon3.json";
import a1dossier6lecon1 from "./data/a1dossier6lecon1.json";
import a1dossier6lecon2 from "./data/a1dossier6lecon2.json";
import a1dossier6lecon3 from "./data/a1dossier6lecon3.json";
import a1dossier7lecon1 from "./data/a1dossier7lecon1.json";
import a1dossier7lecon2 from "./data/a1dossier7lecon2.json";
import a1dossier7lecon3 from "./data/a1dossier7lecon3.json";
import a1dossier8lecon1 from "./data/a1dossier8lecon1.json";
import a1dossier8lecon2 from "./data/a1dossier8lecon2.json";
import a1dossier8lecon3 from "./data/a1dossier8lecon3.json";
import a1dossier9lecon1 from "./data/a1dossier9lecon1.json";
import a1dossier9lecon2 from "./data/a1dossier9lecon2.json";
import a1dossier9lecon3 from "./data/a1dossier9lecon3.json";
import a2dossier1lecon1 from "./data/a2dossier1lecon1.json";
import a2dossier1lecon2 from "./data/a2dossier1lecon2.json";
import a2dossier1lecon3 from "./data/a2dossier1lecon3.json";
import adj from "./data/adj.json";
import biaodian from "./data/biaodian.json";
import buchong from "./data/buchong.json";
import corps from "./data/corps.json";
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
import verbs_participe_passe_practice from "./data/verbs_participe_passe_practice.json";
import vetements from "./data/vetements.json";

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
      <Route path="a1dossier3lecon1" element={<WordGroup words={a1dossier3lecon1} />} />
      <Route path="a1dossier3lecon2" element={<WordGroup words={a1dossier3lecon2} />} />
      <Route path="a1dossier3lecon3" element={<WordGroup words={a1dossier3lecon3} />} />
      <Route path="a1dossier4lecon1" element={<WordGroup words={a1dossier4lecon1} />} />
      <Route path="a1dossier4lecon2" element={<WordGroup words={a1dossier4lecon2} />} />
      <Route path="a1dossier4lecon3" element={<WordGroup words={a1dossier4lecon3} />} />
      <Route path="a1dossier5lecon1" element={<WordGroup words={a1dossier5lecon1} />} />
      <Route path="a1dossier5lecon2" element={<WordGroup words={a1dossier5lecon2} />} />
      <Route path="a1dossier5lecon3" element={<WordGroup words={a1dossier5lecon3} />} />
      <Route path="a1dossier6lecon1" element={<WordGroup words={a1dossier6lecon1} />} />
      <Route path="a1dossier6lecon2" element={<WordGroup words={a1dossier6lecon2} />} />
      <Route path="a1dossier6lecon3" element={<WordGroup words={a1dossier6lecon3} />} />
      <Route path="a1dossier7lecon1" element={<WordGroup words={a1dossier7lecon1} />} />
      <Route path="a1dossier7lecon2" element={<WordGroup words={a1dossier7lecon2} />} />
      <Route path="a1dossier7lecon3" element={<WordGroup words={a1dossier7lecon3} />} />
      <Route path="a1dossier8lecon1" element={<WordGroup words={a1dossier8lecon1} />} />
      <Route path="a1dossier8lecon2" element={<WordGroup words={a1dossier8lecon2} />} />
      <Route path="a1dossier8lecon3" element={<WordGroup words={a1dossier8lecon3} />} />
      <Route path="a1dossier9lecon1" element={<WordGroup words={a1dossier9lecon1} />} />
      <Route path="a1dossier9lecon2" element={<WordGroup words={a1dossier9lecon2} />} />
      <Route path="a1dossier9lecon3" element={<WordGroup words={a1dossier9lecon3} />} />
      <Route path="a2dossier1lecon1" element={<WordGroup words={a2dossier1lecon1} />} />
      <Route path="a2dossier1lecon2" element={<WordGroup words={a2dossier1lecon2} />} />
      <Route path="a2dossier1lecon3" element={<WordGroup words={a2dossier1lecon3} />} />
      <Route path="corps" element={<WordGroup words={corps} />} />
      <Route path="vetements" element={<WordGroup words={vetements} />} />
      <Route path="adj" element={<WordGroup words={adj} />} />
      <Route
        path="verbs_participe_passe_practice"
        element={<WordGroup words={verbs_participe_passe_practice} />}
      />
    </Routes>
  );
}

export default App;
