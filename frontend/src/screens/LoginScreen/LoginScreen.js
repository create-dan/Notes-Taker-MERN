import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import MainScreen from "../../components/MainScreen";
import "./LoginScreen.css";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
 
  const [problem, setProblem] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) { 
  //     // history.push("/mynotes");
  //     navigate('/mynotes');
  //   }
  // }, [history]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(email, password);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",

        { email, password },
        config
      );

      console.log(data);

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
    } catch (error) {
      console.log(error);
      setProblem(error);
      console.log("error is ", error);
      setLoading(false);
    }
  };

  return (
    <>
      <MainScreen title="LOGIN">
        <div className="loginContainer">
          {problem && <ErrorMessage variant="danger" />}
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
