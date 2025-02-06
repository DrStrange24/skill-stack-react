import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth, useCheckAdminRole } from "../context/AuthContext";

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const isAdmin = useCheckAdminRole();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Personal Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/product">
              <Nav.Link>Product</Nav.Link>
            </LinkContainer>
            {isAdmin && (
              <LinkContainer to="/users">
                <Nav.Link>Users</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <LinkContainer to="/profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
                <LinkContainer
                  to="/login"
                  onClick={() => {
                    logout();
                  }}
                >
                  <Nav.Link>Logout</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <Nav.Link>Sign up</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
