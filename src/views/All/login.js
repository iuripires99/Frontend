import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../App.css";
import logo from '../../images/logo.png';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="login-background d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <img
              src={logo}
              alt="Logo"
              className="img-fluid mb-4"
              style={{ display: 'block', margin: '0 auto', maxWidth: '300px' }}
            />
            <h2 className="text-center mb-4 text-white">Bem-Vindo!</h2>
            <Form onSubmit={handleSubmit} style={{ maxWidth: '400px', textAlign: "center", margin: '0 auto' }}>
              <Form.Group className="mb-3 text-white" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="custom-input"
                />
              </Form.Group>
  
              <Form.Group className="mb-3 text-white" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="custom-input"
                />
              </Form.Group>
  
              <Button variant="warning" type="submit" className="w-100 custom-button" style={{ fontSize: '1.25rem' }}>
                Entrar
              </Button>
            </Form>
            <div className="text-center mt-3">
              <Link to="./" className="custom-link" style={{ textDecoration: 'underline', fontSize: '1rem' }}>
                Esqueci-me da palavra passe
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>  
  );
}

export default Login;
