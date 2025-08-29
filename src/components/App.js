import Header from "./Header";
import { Route,Routes } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import SongDetail from "./Pages/SongDetail";
function App() {
  return (
    <div>
        <Header appName='Music'/>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/song/:id" element={<SongDetail />} />
        </Routes>
    </div>
  );
}

export default App;
