import { Route, Routes } from "react-router-dom";
import "./App.css";
import { WordGroup } from "./components/WordGroup";
import nationalite from "./data/nationalite.json";
import semaine from "./data/semaine.json";
import Guide from "./guide";
import { WordQuery } from "./interfaces";

function App() {
  const nationaliteWords: WordQuery[] = nationalite;

  return (
    <Routes>
      <Route path="/" element={<Guide />}></Route>
      <Route
        path="nationalité"
        element={<WordGroup words={nationaliteWords} />}
      />
      <Route path="semaine" element={<WordGroup words={semaine} />} />
    </Routes>
  );
}

export default App;
