import styled from "styled-components";

export const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(16px, 3vw, 28px);
`;

export const Title = styled.h1`
  margin: 0 0 18px 0;
  font-size: clamp(20px, 2.4vw, 28px);
  font-weight: 700;
  letter-spacing: 0.2px;
  color: #f5f3ff;
  text-shadow: 0 1px 0 rgba(0,0,0,0.4);
`;

export const Card = styled.div`
  background: linear-gradient(180deg, rgba(24,12,44,0.55), rgba(16,8,30,0.55));
  border: 1px solid rgba(167,139,250,0.18);
  border-radius: 16px;
  padding: clamp(14px, 2vw, 22px);
  box-shadow:
    0 12px 30px rgba(0,0,0,0.35),
    0 0 0 1px rgba(139,92,246,0.10) inset;
  backdrop-filter: blur(8px);
`;

export const TableWrap = styled.div`
  margin-top: 6px;
  overflow: auto;
  border-radius: 12px;
  border: 1px solid rgba(167,139,250,0.16);
  background: rgba(12,6,22,0.35);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  color: #e7e8ee;
  font-size: 0.95rem;
`;

export const Th = styled.th`
  text-align: left;
  font-weight: 700;
  color: #ede9fe;
  padding: 14px 16px;
  position: sticky;
  top: 0;
  z-index: 1;
  background:
    linear-gradient(180deg, rgba(76,29,149,0.36), rgba(46,16,101,0.32));
  border-bottom: 1px solid rgba(167,139,250,0.35);
  letter-spacing: 0.2px;

  &:first-child { border-top-left-radius: 12px; }
  &:last-child { border-top-right-radius: 12px; }
`;

export const Tr = styled.tr`
  transition: transform 140ms ease, background 160ms ease, box-shadow 160ms ease;
  &:hover {
    background:
      linear-gradient(90deg, rgba(139,92,246,0.10), rgba(139,92,246,0.03));
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(139,92,246,0.12);
  }
`;

export const Td = styled.td`
  padding: 14px 16px;
  border-top: 1px solid rgba(167,139,250,0.14);
  color: #e5e7eb;
  vertical-align: middle;

  &:first-child { width: 80px; color: #c7bdfc; }
  &:nth-child(2) { width: 80px; }
  &:last-child { white-space: nowrap; }
`;

export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(216,180,254,0.9);
  box-shadow: 0 0 0 3px rgba(139,92,246,0.18);
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

export const EmptyText = styled.p`
  color: #c4b5fd;
  margin: 8px 0 0 0;
`;