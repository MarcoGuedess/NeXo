import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública - Login */}
        <Route path="/" element={<Menu />} />

        {/* Rota protegida - Itens */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
