import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../components/Loading.jsx";
import { indexUser, deleteUser } from "./user.api.js";
import { Main } from "../../components/styles/Main.jsx";
import PATHS from "../../navigation/navigation.js";
import { Page,
  Title,
  Card, 
  TableWrap,
  Table,
  Th,
  Tr,
  Td,
  Avatar,
  RoleBadge,
  ErrorText,
  EmptyText
} from "./styled.js";

export default function Dashboard({user}) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await indexUser();
        setUsers(data);
      } catch (err) {
        const status = err?.response?.status;
        if (status === 403 || status === 401 || status === 500) {
          setBlocked(true);
          return;
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  if (blocked) return null;
  if (loading) return (<Loading />);

  const onDelete = async (u) => {
    const result = await Swal.fire({
      title: `Excluir usuário?`,
      text: `Tem certeza que deseja excluir ${u.attributes.full_name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
    });
    if (!result.isConfirmed) return;

    try {
      await deleteUser(u.attributes.slug || u.id);
      setUsers((prev) => prev.filter((x) => x.id !== u.id));
      Swal.fire({
        icon: "success",
        title: "Excluído",
        text: "Usuário excluído com sucesso.",
        timer: 1600,
        showConfirmButton: false,
      });
    } catch (err) {
      const msg = err?.response?.data?.error || err?.response?.data?.errors?.join(", ") || err.message || "Erro ao excluir.";
      Swal.fire({ icon: "error", title: "Erro", text: msg });
    }
  };

  return (
    <Main user={user}>
      <Page>
        <Title>Dashboard</Title>
        <Card>
          {error && <ErrorText>Erro: {error}</ErrorText>}
          {users.length === 0 && !error ? (
            <EmptyText>Nenhum usuário encontrado.</EmptyText>
          ) : (
            <TableWrap>
              <Table>
                <thead>
                  <tr>
                    <Th>Id</Th>
                    <Th>Foto</Th>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th>Função</Th>
                    <Th>Ações</Th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <Tr key={u.id}>
                      <Td>
                        <button
                          type="button"
                          title="Abrir perfil"
                          onClick={() => navigate(`${PATHS.profile}/${u.attributes.slug}`)}
                          style={{
                            all: "unset",
                            cursor: "pointer",
                            color: "white",
                            textDecoration: "underline",
                          }}
                        >
                          {u.id}
                        </button>
                      </Td>
                      <Td>
                        <Avatar
                          src={u.attributes.avatar.src}
                          alt={u.attributes.full_name}
                        />
                      </Td>
                      <Td>{u.attributes.full_name}</Td>
                      <Td>{u.attributes.email}</Td>
                      <Td>
                        <RoleBadge>{u.attributes.role}</RoleBadge>
                      </Td>
                      <Td>
                        <button
                          type="button"
                          onClick={() => onDelete(u)}
                          disabled={user?.id === u.id}
                          style={{
                            all: "unset",
                            cursor: user?.id === u.id ? "not-allowed" : "pointer",
                            color: user?.id === u.id ? "#9ca3af" : "#ef4444",
                            fontWeight: 600,
                          }}
                        >
                          Excluir
                        </button>
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </TableWrap>
          )}
        </Card>
      </Page>
    </Main>
  );
}