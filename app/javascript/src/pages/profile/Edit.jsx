import React, { useEffect, useState } from 'react';
import { edit } from './userApi';
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
        const data = await edit(user?.id);
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
    <p>pinto</p>
  );
}