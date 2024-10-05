import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detailed from "./components/Detailed";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users/:id" element={<Detailed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
