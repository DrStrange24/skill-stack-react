import { ReactElement, useEffect, useState } from "react";
import { useRequireAuthentication } from "../helpers/authHelpers";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { Loading } from "../components";
import { useAuth } from "../context/AuthContext";
import {
  changePassword,
  getProfile,
  IProfile,
  updateProfile,
} from "../services/accountService";
import { toast } from "react-toastify";

// Profile Form Component
const ProfileForm = ({
  profileData,
  setProfileData,
  isLoading,
  onSubmit,
}: {
  profileData: {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
  };
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}) => (
  <Form onSubmit={onSubmit}>
    <Form.Group controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email"
        value={profileData.email}
        onChange={(e) =>
          setProfileData({ ...profileData, email: e.target.value })
        }
      />
    </Form.Group>

    <Form.Group controlId="firstName">
      <Form.Label>First Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter first name"
        value={profileData.firstName}
        onChange={(e) =>
          setProfileData({ ...profileData, firstName: e.target.value })
        }
      />
    </Form.Group>

    <Form.Group controlId="lastName">
      <Form.Label>Last Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter last name"
        value={profileData.lastName}
        onChange={(e) =>
          setProfileData({ ...profileData, lastName: e.target.value })
        }
      />
    </Form.Group>

    <Form.Group controlId="userName">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter username"
        value={profileData.userName}
        onChange={(e) =>
          setProfileData({ ...profileData, userName: e.target.value })
        }
      />
    </Form.Group>

    <Button
      variant="primary"
      type="submit"
      disabled={isLoading}
      className="mt-4"
    >
      {isLoading ? "Updating..." : "Update Profile"}
    </Button>
  </Form>
);

// Password Form Component
const PasswordForm = ({
  passwordData,
  setPasswordData,
  isLoading,
  onSubmit,
}: {
  passwordData: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
  setPasswordData: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}) => (
  <Form onSubmit={onSubmit}>
    <Form.Group controlId="oldPassword">
      <Form.Label>Old Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Enter old password"
        value={passwordData.oldPassword}
        onChange={(e) =>
          setPasswordData({ ...passwordData, oldPassword: e.target.value })
        }
      />
    </Form.Group>

    <Form.Group controlId="newPassword">
      <Form.Label>New Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Enter new password"
        value={passwordData.newPassword}
        onChange={(e) =>
          setPasswordData({ ...passwordData, newPassword: e.target.value })
        }
      />
    </Form.Group>

    <Form.Group controlId="confirmNewPassword">
      <Form.Label>Confirm New Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Confirm new password"
        value={passwordData.confirmNewPassword}
        onChange={(e) =>
          setPasswordData({
            ...passwordData,
            confirmNewPassword: e.target.value,
          })
        }
      />
    </Form.Group>

    <Button
      variant="primary"
      type="submit"
      disabled={isLoading}
      className="mt-4"
    >
      {isLoading ? "Changing..." : "Change Password"}
    </Button>
  </Form>
);

// Profile Modal Component (Wrapper for Forms)
const ProfileModal = ({
  showModal,
  setShowModal,
  modalType,
  profileData,
  setProfileData,
  passwordData,
  setPasswordData,
  handleProfileChange,
  handlePasswordChange,
  isLoading,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: "profile" | "password";
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
  passwordData: any;
  setPasswordData: React.Dispatch<React.SetStateAction<any>>;
  handleProfileChange: (e: React.FormEvent) => Promise<void>;
  handlePasswordChange: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
}) => (
  <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>
        {modalType === "profile" ? "Update Profile" : "Change Password"}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {modalType === "profile" ? (
        <ProfileForm
          profileData={profileData}
          setProfileData={setProfileData}
          isLoading={isLoading}
          onSubmit={handleProfileChange}
        />
      ) : (
        <PasswordForm
          passwordData={passwordData}
          setPasswordData={setPasswordData}
          isLoading={isLoading}
          onSubmit={handlePasswordChange}
        />
      )}
    </Modal.Body>
  </Modal>
);

// Main Profile Component
export const Profile = (): ReactElement => {
  useRequireAuthentication();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<IProfile>({
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
  });
  const [profileData, setProfileData] = useState<IProfile>({
    email: userData.email ?? "",
    firstName: userData.firstName ?? "",
    lastName: userData.lastName ?? "",
    userName: userData.userName ?? "",
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"profile" | "password">("profile");

  // Initialize user data
  useEffect(() => {
    const initializeUser = async () => {
      const fetchedUser = await getProfile();
      setUserData(fetchedUser);
      setProfileData(fetchedUser);
      setIsLoading(false);
    };

    initializeUser();
  }, []);

  const handleProfileChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile(profileData);
      setUserData(profileData);
      setShowModal(false);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error("Error updating profile", error);
      toast.error("Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.warning("New passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      setShowModal(false);
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      toast.success("Password has been change successfully");
    } catch (error) {
      console.error("Error changing password", error);
      toast.error("Error changing password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="mt-5">
            <Card.Body>
              <Card.Title>User Profile</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {userData?.email}
              </Card.Text>
              <Card.Text>
                <strong>First Name:</strong> {userData?.firstName}
              </Card.Text>
              <Card.Text>
                <strong>Last Name:</strong> {userData?.lastName}
              </Card.Text>
              <Card.Text>
                <strong>Username:</strong> {userData?.userName}
              </Card.Text>

              {/* Buttons for Profile and Password Modals */}
              <Button
                variant="primary"
                className="m-2"
                onClick={() => {
                  setModalType("profile");
                  setShowModal(true);
                }}
              >
                Update Profile
              </Button>
              <Button
                variant="primary"
                className="m-2"
                onClick={() => {
                  setModalType("password");
                  setShowModal(true);
                }}
              >
                Change Password
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Profile Update or Password Change */}
      <ProfileModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
        profileData={profileData}
        setProfileData={setProfileData}
        passwordData={passwordData}
        setPasswordData={setPasswordData}
        handleProfileChange={handleProfileChange}
        handlePasswordChange={handlePasswordChange}
        isLoading={isLoading}
      />
    </Container>
  );
};
