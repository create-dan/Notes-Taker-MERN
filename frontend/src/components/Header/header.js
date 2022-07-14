import React from "react";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <Navbar bg="primary" expand="lg" varient="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">Note Keeper </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="search"
                  className="mr-sm-2"
                />
              </Form>
            </Nav>
            <Nav>
              <Nav.Link>
                <Link to="/mynotes">My Notes</Link>
              </Nav.Link>

              <NavDropdown title="Dnyaneshwar Shinde" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Log Out
                </NavDropdown.Item>

                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
