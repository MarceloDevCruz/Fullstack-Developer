import React from "react";

export default function Header({user}) {

  console.log(user);

  return (
    <header className="py-3 mb-4 border-bottom">
      <div className="container d-flex flex-wrap justify-content-center">
        <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-white text-decoration-none">
          <span className="fs-4">Meu App</span>
        </a>
      </div>
    </header>
  );
}