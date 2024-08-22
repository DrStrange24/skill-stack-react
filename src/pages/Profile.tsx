import { ReactElement, useState } from "react";
import { useRequireAuthentication } from "../helpers/authHelpers";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Loading } from "../components";
import { useAuth } from "../context/AuthContext";

export const Profile = (): ReactElement => {
  useRequireAuthentication();
  const { user } = useAuth();

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="mt-5">
            <Card.Body>
              <Card.Title>User Profile</Card.Title>
              <Card.Text>
                <strong>ID:</strong> {user?.id}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {user?.email}
              </Card.Text>
              <Card.Text>
                <strong>First Name:</strong> {user?.firstName}
              </Card.Text>
              <Card.Text>
                <strong>Last Name:</strong> {user?.lastName}
              </Card.Text>
              <Card.Text>
                <strong>Username:</strong> {user?.username}
              </Card.Text>
              <Card.Text>
                <strong>Email Confirmed:</strong>{" "}
                {user?.emailConfirmed ? "Yes" : "No"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
