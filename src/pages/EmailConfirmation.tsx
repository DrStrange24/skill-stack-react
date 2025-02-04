import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { confirmEmail as confirmEmailService } from "../services/accountService";
import { Container, Alert, Row, Col, Card } from "react-bootstrap";
import { Loading } from "../components";

export const EmailConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const confirmEmail = async () => {
      const userId = searchParams.get("userId") || null;
      const token = searchParams.get("token") || null;
      if (userId && token) {
        try {
          const result = await confirmEmailService(userId, token);
          setMessage(result?.message);
        } catch (error: any) {
          setMessage(error.response.data.message);
        } finally {
          setLoading(false);
        }
      } else {
        setMessage("Invalid confirmation link.");
        setLoading(false);
      }
    };
    confirmEmail();
  }, [searchParams]);

  return (
    <>
      {loading ? (
        <Loading message="Confirming your email, please wait..." />
      ) : (
        <Container className="d-flex justify-content-center align-items-center mt-5">
          <Row className="w-100 justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-lg p-4 rounded-3 text-center">
                <Card.Body>
                  <Alert
                    variant={message.includes("success") ? "success" : "danger"}
                  >
                    <strong>{message}</strong>
                  </Alert>
                  {message.includes("success") && (
                    <>
                      Click <Link to="/login">here</Link> to login.
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
