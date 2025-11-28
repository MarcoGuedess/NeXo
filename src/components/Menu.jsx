// src/components/Menu.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/nxlogo.png';

// Ícones
import { 
  FaBullseye,      // Objetivos
  FaDumbbell,      // Academia
  FaPiggyBank,     // Finanças
  FaRunning,       // Equipamento
  FaPlane,         // Viagem
} from 'react-icons/fa';

import './../styles/menu.css';

function Menu() {
  return (
    <nav className="menu-container">
      <div className="menu-logo">
        <img src={logo} alt="NeXo Logo" />
      </div>
      
      <ul className="menu-itens">
        
        {/* Item 1: Objetivos (com Dropdown) */}
        <li className="menu-item dropdown">
          <Link to="/objetivos">
            <FaBullseye className="menu-icon" />
            <span className="menu-text">Objetivos</span>
          </Link>
          
          <ul className="dropdown-content">
            <li>
              <Link to="/objetivos/academia">
                <FaDumbbell className="dropdown-icon" />
                <span>Academia</span>
              </Link>
            </li>
            <li>
              <Link to="/objetivos/equipamento">
                <FaRunning className="dropdown-icon" />
                <span>Equipamento</span>
              </Link>
            </li>
            <li>
              <Link to="/objetivos/viagem">
                <FaPlane className="dropdown-icon" />
                <span>Viagem</span>
              </Link>
            </li>
          </ul>
        </li>
        
        {/* Item 2: Academia (Ficha) */}
        <li className="menu-item">
          <Link to="/academia">
            <FaDumbbell className="menu-icon" />
            <span className="menu-text">Academia</span>
          </Link>
        </li>
        
        {/* Item 3: Finanças */}
        <li className="menu-item">
          <Link to="/financas">
            <FaPiggyBank className="menu-icon" />
            <span className="menu-text">Finanças</span>
          </Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default Menu;