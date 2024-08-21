import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { ISignup, signup } from "../services/accountService";
import { ToastMessage, ToastVariant } from "../components";
import { useNavigate } from "react-router-dom";

export const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ISignup>({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [toastProps, setToastProps] = useState<{
    show: boolean;
    message: string;
    variant: ToastVariant;
  }>({
    show: false,
    message: "",
    variant: "info",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError("");

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      const result = await signup(formData);
      console.log("Signup successful:", result);

      //to do: toast globally
      setToastProps({
        show: true,
        message: "Account created successfully",
        variant: "success",
      });
      navigate("/login");
      // Optionally, redirect the user or update the UI
    } catch (err) {
      setToastProps({
        show: true,
        message: "Signup failed. Please try again.",
        variant: "danger",
      });
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center my-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
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
    </Container>
  );
};
