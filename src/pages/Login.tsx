import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/accountService";
import { ToastMessage, ToastVariant } from "../components";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login: loginAuth } = useAuth();
  const [identifier, setIdentifier] = useState<string>(""); // Email or Username
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [toastProps, setToastProps] = useState<{
    show: boolean;
    message: string;
    variant: ToastVariant;
  }>({
    show: false,
    message: "",
    variant: "info",
  });

  //for email confirmation---------------------------
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    const message = params.get("message") ?? "";
    let variant: ToastVariant = "info";
    switch (status) {
      case "success":
        variant = "success";
        break;
      case "failure":
        variant = "danger";
        break;
    }
    if (status && message)
      setToastProps({
        show: true,
        message: message,
        variant: variant,
      });
  }, [location]);
  //------------------------------------------------------

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const result = await login(identifier, password);
      loginAuth(result);
      navigate("/product");
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  return (
    <Container>
      <ToastMessage
        onClose={() => {
          setToastProps({
            show: false,
            message: "",
            variant: "info",
          });
        }}
        {...toastProps}
      />
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center my-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formIdentifier" className="mb-3">
              <Form.Label>Email or Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email or username"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
