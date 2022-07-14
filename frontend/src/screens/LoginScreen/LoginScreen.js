import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import MainScreen from "../../components/MainScreen";
import "./LoginScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  // const [problem, setProblem] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      // navigate("/mynotes");
      // <Redirect to='/mynotes' />
      // <Navigate to="/mynotes" replace={true} />;
      // history.push("/mynots");
      navigate("/mynotes");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <MainScreen title="LOGIN">
        <div className="loginContainer">
          {error && <ErrorMessage variant="danger" >{error}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              New Customer ? <Link to="/register">Resister Here</Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </>
  );
};

export default LoginScreen;
