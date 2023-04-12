// Import necessários
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { CreateRecipe } from './pages/create-receita';
import { SavedRecipes } from './pages/receita-salva';
import { Navbar } from './components/navbar';

// Função principal do App.js com as Routes utilizando react
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-receita" element={<CreateRecipe />} />
          <Route path="/receita-salva" element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
