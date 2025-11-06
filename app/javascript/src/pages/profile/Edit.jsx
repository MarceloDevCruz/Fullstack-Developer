import React, { useEffect, useState } from 'react';
import { Main } from "../../components/styles/Main.jsx";
import PATHS from "../../navigation/navigation.js";
import { editUser, updateUser } from './user.api.js';
import Loading from '../../components/Loading';
import { useNavigate, useParams } from "react-router-dom";
import {
  Page,
  Card,
  Title,
  Grid,
  ErrorText,
  Actions,
  Button,
  Form,
  ButtonPrimary,
} from './styled';
import { FullName, Email, Password, PasswordConfirmation, Role, Avatar } from "../../components/inputs";

export default function ProfileEdit({ user }) {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ full_name: "", email: "", role: "user", password: "", password_confirmation: "" });
  const [avatarFile, setAvatarFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (!user?.id && !slug) return;
    const loadProfile = async () => {
      try {
        const idOrSlug = slug || user.id;
        const data = await editUser(idOrSlug);
        setProfile(data);
        const a = data?.attributes;
        setForm((f) => ({
          ...f,
          full_name: a.full_name || "",
          email: a.email || "",
          role: a.role || "",
          password: "",
          password_confirmation: "",
        }));
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
  }, [user?.id, slug]);

  if (blocked) return null;
  if (loading) return (<Loading />);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onAvatarFile = (file) => setAvatarFile(file);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.full_name || !form.email) {
      setError("Nome e e-mail são obrigatórios.");
      return;
    }
    const payload = {
      full_name: form.full_name,
      email: form.email,
    };

    if (isAdmin(user)) {
      payload.role = form.role;
    }
    if (form.password || form.password_confirmation) {
      if (form.password.length < 6) {
        setError("A senha deve ter pelo menos 6 caracteres.");
        return;
      }
      if (form.password !== form.password_confirmation) {
        setError("A confirmação de senha não confere.");
        return;
      }
      payload.password = form.password;
      payload.password_confirmation = form.password_confirmation;
    }
    if (avatarFile) {
      payload.avatar = avatarFile;
    }
    try {
      setSaving(true);
  const idOrSlug = slug || user.id;
  await updateUser(idOrSlug, payload);
  const nextSlug = profile?.attributes?.slug || slug || user?.attributes?.slug || idOrSlug;
  navigate(`${PATHS.profile}/${nextSlug}`);
    } catch (err) {
      setError(err?.response?.data?.error || err?.response?.data?.errors?.join(", ") || err.message || "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  function isAdmin(currentUser) {
    if (!currentUser) return false;
    const r = (currentUser.role || "").toString().toLowerCase();
    return r.includes("admin");
  }

  const serverAvatar = profile?.attributes?.avatar?.src || "";
  const avatarSrc = serverAvatar;

  return (
    <Main user={user}>
      <Page>
        <Card>
          <Title>Editar Perfil</Title>
          {error && <ErrorText>Erro: {error}</ErrorText>}
          <Form onSubmit={onSubmit}>
            <Grid>
              <Avatar previewSrc={avatarSrc} label="Escolher foto" onFileChange={onAvatarFile} />
              <div>
                <FullName value={form.full_name} onChange={onChange} />
                <Email value={form.email} onChange={onChange} />
                {isAdmin(user) && <Role value={form.role} onChange={onChange} />}
                <Password value={form.password} onChange={onChange} label="Nova senha" placeholder="Digite uma nova senha" />
                <PasswordConfirmation value={form.password_confirmation} onChange={onChange} label="Confirmar senha" placeholder="Repita a nova senha" />
                <Actions>
                  <ButtonPrimary type="submit" disabled={saving}>
                    {saving ? "Salvando..." : "Salvar"}
                  </ButtonPrimary>
                  <Button to={`${PATHS.profile}/${profile?.attributes?.slug || slug || user?.attributes?.slug || ''}`}>Cancelar</Button>
                </Actions>
              </div>
            </Grid>
          </Form>
        </Card>
      </Page>
    </Main>
  );
}