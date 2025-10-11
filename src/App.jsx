import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import './index.js'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública - Login */}
        <Route path="/" element={<Menu> <Home/></Menu>} />

        {/* Rota protegida - Itens */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
