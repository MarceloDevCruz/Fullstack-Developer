import React from "react";
import { Link } from "react-router-dom";
import { Main } from "../../components/styles/Main.jsx";

export default function NotFound() {
  return (
    <Main>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card bg-secondary text-white shadow-sm">
              <div className="card-body text-center">
                <h1 className="display-4 fw-bold">404</h1>
                <p className="lead mb-3">Página não encontrada</p>
                <p className="mb-4">A rota que você tentou acessar não existe ou foi removida.</p>
                <Link to="/" className="btn btn-outline-light">Voltar para o início</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}