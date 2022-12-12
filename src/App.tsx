import { Route, Routes } from "react-router-dom";
import "./App.css";
import { WordGroup } from "./components/WordGroup";
import nationalite from "./data/nationalite.json";
import { WordQuery } from "./interfaces";

function App() {
  const nationaliteWords: WordQuery[] = nationalite;

  return (
    <Routes>
      <Route
        path="/my-francais-words"
        element={<WordGroup words={nationaliteWords} />}
      >
        <Route
          path="nationalité"
          element={<WordGroup words={nationaliteWords} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
