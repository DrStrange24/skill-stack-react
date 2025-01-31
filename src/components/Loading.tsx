import { Spinner } from "react-bootstrap";

export interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = "Loading..." }: LoadingProps) => {
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
