import { Route, Routes } from "react-router-dom";
import "./App.css";
import { WordGroup } from "./components/WordGroup";
import { words } from "./data";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WordGroup words={words} />} />
    </Routes>
  );
}

export default App;
