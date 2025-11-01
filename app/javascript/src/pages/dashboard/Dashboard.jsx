import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading.jsx";
import { fetchUsers } from "./userApi";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-start justify-content-center bg-dark text-white py-5">
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
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Função</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
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
    </div>
  );
}