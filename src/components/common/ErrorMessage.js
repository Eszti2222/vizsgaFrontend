import { Link } from "react-router";

export default function ErrorMessage({ message, backTo = "/doctors" }) {
  return (
    <div className="container mt-4">
      <div className="alert alert-danger">{message}</div>
      <Link to={backTo} className="btn btn-secondary mt-2">
        Vissza
      </Link>
    </div>
  );
}
