import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export type ToastVariant = "success" | "danger" | "warning" | "info";

interface ToastMessageProps {
  show: boolean;
  onClose: () => void;
  message: string;
  variant?: ToastVariant;
  title?: string;
  delay?: number;
  autohide?: boolean;
}

export const ToastMessage: React.FC<ToastMessageProps> = ({
  show,
  onClose,
  message,
  variant = "info",
  title = "Notification",
  delay = 3000,
  autohide = true,
}) => {
  return (
    <ToastContainer position="top-center" className="p-3">
      <Toast
        onClose={onClose}
        show={show}
        delay={delay}
        autohide={autohide}
        bg={variant}
      >
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
