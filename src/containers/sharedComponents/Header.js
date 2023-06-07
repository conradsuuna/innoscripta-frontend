import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NewsFeedPersonalisationModal } from "../components/Articles/components/NewsFeedPersonalisationModal";
import { SignUpModal } from "../components/Auth/SignupModal";
import { LoginModal } from "../components/Auth/LoginModal";

const Header = () => {
  const [show, setShow] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSignUpShow = () => setShowSignUp(!showSignUp);
  const handleLoginShow = () => setShowLogin(!showLogin);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const onLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ position: "fixed", width: "100%", top: 0, zIndex: 1, marginBottom: "20px" }}>
        <Container>
          <Navbar.Brand>In The News</Navbar.Brand>
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link onClick={handleSignUpShow}>Sign Up</Nav.Link>
                <Nav.Link onClick={handleLoginShow}>Log In</Nav.Link>
              </>
            )}
            {user && (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item id="personalise" onClick={handleShow}>Personalise Your Newsfeed</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {user ? (
                <span> Signed in as: {user.name}</span>
              ) : (
                <span> Signed in as: Anonymous</span>
              )}
            </Navbar.Text>
            {/* logout */}
            {user && (
              <Navbar.Text style={{ marginLeft: '10px' }}>
                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <NewsFeedPersonalisationModal
        show={show}
        handleClose={handleClose}
      />

      <SignUpModal
        show={showSignUp}
        handleClose={handleSignUpShow}
      />

      <LoginModal
        show={showLogin}
        handleClose={handleLoginShow}
      />
    </>
  );
};

export default Header;
