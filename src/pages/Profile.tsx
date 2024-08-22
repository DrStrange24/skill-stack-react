import { ReactElement, useEffect, useState } from "react";
import { useRequireAuthentication } from "../helpers/authHelpers";
import { getProfile, IUser } from "../services/userService";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Loading } from "../components";

export const Profile = (): ReactElement => {
  useRequireAuthentication();

  const [profile, setProfile] = useState<IUser>({
    id: "",
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    emailConfirmed: false,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getProfile("1");
        setProfile(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Container>
      {loading && <Loading />}
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="mt-5">
            <Card.Body>
              <Card.Title>User Profile</Card.Title>
              <Card.Text>
                <strong>ID:</strong> {profile.id}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {profile.email}
              </Card.Text>
              <Card.Text>
                <strong>First Name:</strong> {profile.firstName}
              </Card.Text>
              <Card.Text>
                <strong>Last Name:</strong> {profile.lastName}
              </Card.Text>
              <Card.Text>
                <strong>Username:</strong> {profile.username}
              </Card.Text>
              <Card.Text>
                <strong>Email Confirmed:</strong>{" "}
                {profile.emailConfirmed ? "Yes" : "No"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
