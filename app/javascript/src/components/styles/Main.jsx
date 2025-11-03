import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  color: #e5e7eb;
  background-image:
    linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)),
    url("/background.svg"),
    radial-gradient(800px 600px at 10% -10%, rgba(168,85,247,0.08), transparent 40%),
    radial-gradient(700px 500px at 110% 120%, rgba(59,130,246,0.06), transparent 45%),
    linear-gradient(180deg, #050505 0%, #0a0a0f 50%, #0b0b12 100%);
  background-repeat: no-repeat, repeat, no-repeat, no-repeat, no-repeat;
  background-size: 100% 100%, 800px 800px, auto, auto, auto;
  background-position: center, center, center, center, center;
  background-attachment: fixed, scroll, fixed, fixed, fixed;
`;

export function Main({ children }) {
  return <Container>{children}</Container>;
}
    