import React from "react";
import { styled } from "styled-components";

const Bg = styled.div`
  min-height: 100vh;
  color: #e5e7eb;
  background-image:
    linear-gradient(rgba(46,16,101,0.78), rgba(19, 12, 32, 0.78)),
    url("/background.svg"),
    radial-gradient(800px 600px at 10% -10%, rgba(61, 27, 87, 0.1), transparent 40%),
    radial-gradient(700px 500px at 110% 120%, rgba(44, 23, 59, 0.08), transparent 45%),
    linear-gradient(180deg, #0d0718 0%, #0a0611 50%, #07010f 100%);
  background-repeat: no-repeat, repeat, no-repeat, no-repeat, no-repeat;
  background-size: 100% 100%, 800px 800px, auto, auto, auto;
  background-position: center, center, center, center, center;
  background-attachment: fixed, scroll, fixed, fixed, fixed;
`;

export default function Loading() {
  return (
    <Bg className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div
          className="spinner-border"
          role="status"
          style={{
            color: "#a78bfa",
            width: "3rem",
            height: "3rem",
            borderWidth: "0.25rem",
            filter: "drop-shadow(0 0 18px rgba(139,92,246,0.35))",
          }}
        >
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3 mb-0" style={{ color: "#ede9fe" }}>
          Carregando dados...
        </p>
      </div>
    </Bg>
  );
}