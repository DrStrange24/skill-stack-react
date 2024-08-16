import React from "react";
import { Spinner } from "react-bootstrap";

export interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <div className="mt-2">{message}</div>
      </div>
    </div>
  );
};
