import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

function CustomNavbar() {
    return (
        <div
            className="d-flex flex-column vh-100 bg-body-tertiary p-2"
            style={{ width: '200px' }}
        >
            <Nav className="flex-column">
                <Nav.Link as={Link} to="/" className="mb-3 fw-bold">
                    Davi's Imports
                </Nav.Link>
                <Nav.Link as={Link} to="/">
                    Produtos
                </Nav.Link>
                <Nav.Link as={Link} to="/about">
                    Sobre
                </Nav.Link>
            </Nav>
        </div>
    );
}

export default CustomNavbar;
