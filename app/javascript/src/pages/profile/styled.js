import { styled } from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(16px, 3vw, 28px);
`;

export const Card = styled.div`
  background: linear-gradient(180deg, rgba(24,12,44,0.55), rgba(16,8,30,0.55));
  border: 1px solid rgba(167,139,250,0.18);
  border-radius: 16px;
  padding: clamp(16px, 2.4vw, 24px);
  box-shadow:
    0 12px 30px rgba(0,0,0,0.35),
    0 0 0 1px rgba(139,92,246,0.10) inset;
  backdrop-filter: blur(8px);
  color: #e7e8ee;
`;

export const Title = styled.h1`
  margin: 0 0 16px 0;
  font-size: clamp(20px, 2.4vw, 28px);
  font-weight: 700;
  color: #f5f3ff;
  text-shadow: 0 1px 0 rgba(0,0,0,0.4);
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 18px;
  align-items: start;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: left;
  }
`;

export const AvatarBig = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 16px;
  object-fit: cover;
  border: 2px solid rgba(216,180,254,0.9);
  box-shadow: 0 0 0 4px rgba(139,92,246,0.18);
  background: #1a0b2e;
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 10px;
  padding: 10px 0;
  border-top: 1px solid rgba(167,139,250,0.14);

  &:first-of-type {
    border-top: 0;
    padding-top: 0;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 6px;
  }
`;

export const Label = styled.div`
  color: #c7bdfc;
  font-weight: 600;
`;

export const Value = styled.div`
  color: #e5e7eb;
  word-break: break-word;
`;

export const RoleBadge = styled.span`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: #ede9fe;
  background: rgba(139,92,246,0.18);
  border: 1px solid rgba(167,139,250,0.35);
  text-transform: capitalize;
`;

export const ErrorText = styled.p`
  color: #fecaca;
  background: rgba(239,68,68,0.10);
  border: 1px solid rgba(239,68,68,0.28);
  padding: 10px 12px;
  border-radius: 10px;
  margin: 0 0 12px 0;
`;

export const Actions = styled.div`
  margin-top: 14px;
  display: flex;
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

export const ButtonPrimary = styled.button`
  color: #0b0416;
  background: #c4b5fd;
  border: 1px solid rgba(167,139,250,0.55);
  padding: 10px 14px;
  border-radius: 12px;
  font: inherit;
  cursor: pointer;
  transition: background 140ms ease, border-color 140ms ease, box-shadow 140ms ease, color 140ms ease;

  &:hover {
    background: #a78bfa;
    border-color: rgba(167,139,250,0.75);
    box-shadow: 0 8px 24px rgba(139,92,246,0.20);
    color: #0b0416;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(216,180,254,0.35);
  }
`;

export const Input = styled.input`
  width: 100%;
  color: #e5e7eb;
  background: rgba(17, 12, 28, 0.9);
  border: 1px solid rgba(167,139,250,0.25);
  border-radius: 10px;
  padding: 10px 12px;
  outline: none;
  transition: border-color 140ms ease, box-shadow 140ms ease, background 140ms ease;

  &::placeholder { color: #a78bfa; opacity: 0.7; }

  &:focus {
    border-color: rgba(167,139,250,0.55);
    box-shadow: 0 0 0 3px rgba(216,180,254,0.20);
    background: rgba(20, 14, 34, 0.95);
  }
`;

export const Form = styled.form`
  width: 100%;
`;