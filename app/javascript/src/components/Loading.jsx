import React from "react";

export default function Loading() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
      <div className="text-center">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3">Carregando dados...</p>
      </div>
    </div>
  );
}
