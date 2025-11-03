import React, { useEffect, useState } from 'react';
import { Main } from "../../components/styles/Main.jsx";
import PATHS from "../../navigation/navigation.js";
import { edit, update } from './userApi';
import Loading from '../../components/Loading';
import { useNavigate } from "react-router-dom";
import {
  Page,
  Card,
  Title,
  Grid,
  AvatarBig,
  Field,
  Label,
  ErrorText,
  Actions,
  Button,
  Form,
  Input,
  ButtonPrimary,
} from './styled';

export default function ProfileEdit({ user }) {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ full_name: "", email: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;
    const loadProfile = async () => {
      try {
        const data = await edit(user.id);
        setProfile(data);
        const a = data?.attributes || {};
        setForm({
          full_name: a.full_name || "",
          email: a.email || "",
        });
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

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.full_name || !form.email) {
      setError("Nome e e-mail são obrigatórios.");
      return;
    }
    try {
      setSaving(true);
      await update(user.id, {
        full_name: form.full_name,
        email: form.email,
      });
      navigate(PATHS.profile);
    } catch (err) {
      setError(err?.response?.data?.error || err.message || "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Main user={user}>
      <Page>
        <Card>
          <Title>Editar Perfil</Title>
          {error && <ErrorText>Erro: {error}</ErrorText>}
          <Form onSubmit={onSubmit}>
            <Grid>
              <AvatarBig src={profile?.attributes?.avatar?.src} alt={form.full_name || "Avatar"} />
              <div>
                <Field>
                  <Label>Nome</Label>
                  <Input
                    name="full_name"
                    value={form.full_name}
                    onChange={onChange}
                    placeholder="Seu nome completo"
                  />
                </Field>
                <Field>
                  <Label>E-mail</Label>
                  <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="seuemail@exemplo.com"
                  />
                </Field>
                <Actions>
                  <ButtonPrimary type="submit" disabled={saving}>
                    {saving ? "Salvando..." : "Salvar"}
                  </ButtonPrimary>
                  <Button to={PATHS.profile}>Cancelar</Button>
                </Actions>
              </div>
            </Grid>
          </Form>
        </Card>
      </Page>
    </Main>
  );
}