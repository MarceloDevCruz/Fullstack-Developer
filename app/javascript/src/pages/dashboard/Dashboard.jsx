import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading.jsx";
import { fetchUsers } from "./userApi";
import { Main } from "../../components/styles/Main.jsx";

export default function Dashboard() {
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

  const avatarStyle = {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #fff",
  };

  return (
    <Main>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h4">Dashboard</h1>
        </div>
        <div className="card bg-secondary text-white shadow-sm">
          <div className="card-body">
            {error && <p className="text-danger">Erro: {error}</p>}
            {users.length === 0 && !error ? (
              <p>Nenhum usuário encontrado.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Foto</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Função</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td> <img src={user.attributes.avatar.src} alt={user.attributes.full_name} style={avatarStyle} /></td>
                        <td>{user.attributes.full_name}</td>
                        <td>{user.attributes.email}</td>
                        <td>{user.attributes.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Main>
  );
}