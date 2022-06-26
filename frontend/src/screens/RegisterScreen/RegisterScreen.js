import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading/Loading";
import MainScreen from "../../components/MainScreen";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [problem, setProblem] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(email);

    if (password !== confirmpassword) {
      setMessage("Password do not match");
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        setLoading(true);
        const { data } = await axios.post(
          "http://localhost:5000/api/users",
          {
            name,
            pic,
            email,
            password,
          },
          config
        );

        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
        console.log(data);
      } catch (error) {
        setProblem(error.message);
      }
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please select an image");
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {

      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', note_maker);
      data.append('cloud_name',dnyaneshwar);

      fetch('')
    }

    setPicMessage(null);
  };
  return (
    <>
      <MainScreen title="REGISTER">
        <div className="loginContainer">
          {problem && <ErrorMessage variant="danger">{problem} </ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmpassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group controlId="pic">
              <Form.Label>Profile Picture</Form.Label>
              <Form.File
                // onChange={(e) => postDetails(e.target.files[0])}
                id="custom-file"
                type="file"
                label="Upload Profile Picture"
                custom
              ></Form.File>
            </Form.Group> */}

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              Have an Account ? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </>
  );
};

export default RegisterScreen;
