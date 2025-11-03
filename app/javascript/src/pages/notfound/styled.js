import { styled } from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(16px, 3vw, 28px);
`;

export const Center = styled.div`
  min-height: calc(100vh - 120px);
  display: grid;
  place-content: center;
`;

export const Card = styled.div`
  width: min(680px, 92vw);
  padding: clamp(18px, 3vw, 28px);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(24,12,44,0.55), rgba(16,8,30,0.55));
  border: 1px solid rgba(167,139,250,0.18);
  box-shadow:
    0 18px 40px rgba(0,0,0,0.35),
    0 0 0 1px rgba(139,92,246,0.10) inset;
  backdrop-filter: blur(8px);
  text-align: center;
`;

export const Title404 = styled.h1`
  margin: 0 0 8px 0;
  font-weight: 800;
  line-height: 1;
  font-size: clamp(48px, 12vw, 120px);
  letter-spacing: 2px;
  background: linear-gradient(180deg, #ede9fe 0%, #c4b5fd 60%, #a78bfa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 4px 24px rgba(139,92,246,0.25);
`;

export const Lead = styled.p`
  margin: 0 0 6px 0;
  color: #f5f3ff;
  font-size: clamp(16px, 2.4vw, 22px);
  font-weight: 700;
`;

export const Text = styled.p`
  margin: 0 0 16px 0;
  color: #d9d6fe;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const Button = styled(RouterLink)`
  color: #ede9fe;
  text-decoration: none;
  padding: 10px 14px;
  border-radius: 12px;
  background: rgba(139,92,246,0.16);
  border: 1px solid rgba(167,139,250,0.35);
  transition: background 140ms ease, border-color 140ms ease, color 140ms ease, box-shadow 140ms ease;

  &:hover {
    background: rgba(139,92,246,0.26);
    border-color: rgba(167,139,250,0.5);
    color: #ffffff;
    box-shadow: 0 8px 24px rgba(139,92,246,0.20);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(216,180,254,0.35);
  }
`;