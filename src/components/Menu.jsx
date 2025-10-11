import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NXLogo from '../assets/nxlogo.png'

function Menu({children}) {
  return (
    <>
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand href="#home" id='Marca'><img src={NXLogo} width={50} alt="logo" className="me-2" />NeXo</Navbar.Brand>
        <Navbar.Toggle/>
        <Navbar.Collapse >
          <Nav>
            <Nav.Link href="#home" id='TextoNav'>Home</Nav.Link>
            <Nav.Link href="#link" id='TextoNav'>Anotações</Nav.Link>
            <NavDropdown title="Financeiro" id='TextoNav'>
              <NavDropdown.Item href="#action/3.1" id='TextoNav'>Gastos e Objetivos</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" id='TextoNav'>Metas</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

{children}

    <footer className="custom-footer text-center text-lg-start">
        <div className="text-center p-3">
          © 2025 MaG:{}
          <a
            className="footer-link"
            href=""
            target="_blank"
            rel="noreferrer"
          >
            NeXo
          </a>
        </div>
      </footer>




</>
  );
}

export default Menu;