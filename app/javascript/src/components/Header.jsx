import React from "react";
import PATHS from "../navigation/navigation.js";
import { useNavigate } from "react-router-dom";
import {Bar,
  Inner,
  Avatar,
  Nav,
  Link,
  SignOut,
} from "./styled"

export default function Header({ user }) {
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
      const res = await fetch(PATHS.logout, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Accept": "text/html,application/xhtml+xml,application/xml",
        },
        credentials: "include",
      });
      if (res.ok) {
        window.location.href = PATHS.login;
      } else {
        window.location.reload();
      }
    } catch {
      window.location.reload();
    }
  };

  return (
    <Bar>
      <Inner>
        <Avatar src={user?.attributes?.avatar?.src} alt={user?.attributes?.full_name} />
        <Nav>
          <Link type="button" onClick={() => navigate(PATHS.admin)}>Admin</Link>
          <Link type="button" onClick={() => navigate(PATHS.profile)}>Perfil</Link>
          <Link type="button" onClick={() => navigate(PATHS.edit)}>Editar Perfil</Link>
          <Link as="a" href={PATHS.spreedsheet}>Planilha</Link>
          <SignOut onClick={handleSignOut}>Sair</SignOut>
        </Nav>
      </Inner>
    </Bar>
  );
}