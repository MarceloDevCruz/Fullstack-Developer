import React, { useEffect, useState } from 'react';
import { show } from './userApi';
import Loading from '../../components/Loading';

export default function Profile({ user }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    const loadProfile = async () => {
      try {
        const data = await show(user?.id);
        setProfile(data);
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
    loadProfile();
  }, [user?.id]);

  if (blocked) return null;

  if (loading) return (<Loading />);

  return (
    <div className="container py-4 text-white">
      <h1 className="h4 mb-3">Perfil</h1>
      <div className="card bg-secondary text-white">
        <div className="card-body d-flex flex-column gap-2">
          <div><strong>Nome:</strong> {profile?.attributes?.full_name}</div>
          <div><strong>E-mail:</strong> {profile?.attributes?.email}</div>
          <div><strong>Função:</strong> {profile?.attributes?.role}</div>
          <div><strong>Foto:</strong> <img src={profile.attributes.avatar.src} alt={profile.attributes.full_name} /></div>
        </div>
      </div>
    </div>
  );
}