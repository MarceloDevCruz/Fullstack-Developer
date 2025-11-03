import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading.jsx";
import { fetchUsers } from "./userApi";
import { Main } from "../../components/styles/Main.jsx";
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

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
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
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <Tr key={u.id}>
                      <Td>{u.id}</Td>
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