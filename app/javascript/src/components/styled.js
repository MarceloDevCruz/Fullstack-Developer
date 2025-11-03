import styled from "styled-components";

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
  background: linear-gradient(180deg, rgba(46,16,101,0.78), rgba(19,12,32,0.78));
  border-bottom: 1px solid rgba(167,139,250,0.28);
  box-shadow:
    0 8px 20px rgba(0,0,0,0.35),
    0 0 0 1px rgba(139,92,246,0.06) inset;
`;

export const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px clamp(16px, 3vw, 24px);
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(216,180,254,0.9);
  box-shadow: 0 0 0 3px rgba(139,92,246,0.18);
  background: #1a0b2e;
`;

export const Brand = styled.a`
  color: #f5f3ff;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.2px;
  margin-right: 6px;
  &:hover { color: #ffffff; }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Link = styled.a`
  color: #e9d5ff;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid transparent;
  transition: background 140ms ease, border-color 140ms ease, color 140ms ease;
  &:hover {
    background: rgba(139,92,246,0.16);
    border-color: rgba(167,139,250,0.35);
    color: #ffffff;
  }
`;

export const SignOut = styled.button`
  color: #fee2e2;
  background: rgba(239,68,68,0.10);
  border: 1px solid rgba(239,68,68,0.28);
  padding: 8px 12px;
  border-radius: 10px;
  font: inherit;
  cursor: pointer;
  transition: background 140ms ease, border-color 140ms ease, color 140ms ease;
  &:hover {
    background: rgba(239,68,68,0.18);
    border-color: rgba(239,68,68,0.38);
    color: #ffffff;
  }
`;