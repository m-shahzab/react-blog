import React from "react";
import { Container } from "../components";
import { Link, useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Container>
      <div
        id="notFound"
        className="grid place-content-center h-[25rem] text-center text-2xl select-none "
      >
        <h1 className="mb-2 text-6xl ">404</h1>
        <h2>Page not found</h2>

        <p>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </p>
        {<Link to="/">Go back home</Link>}
      </div>
    </Container>
  );
}

export default ErrorPage;
