import React, { useEffect, useState } from "react";
import { Main } from "../../components/styles/Main.jsx";
import PATHS from "../../navigation/navigation.js";
import { show } from "./userApi";
import Loading from "../../components/Loading";
import {
  Page,
  Card,
  Title,
  Grid,
  AvatarBig,
  Field,
  Label,
  Value,
  RoleBadge,
  ErrorText,
  Actions,
  Button,
} from "./styled";

export default function Profile({ user }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
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
  if (loading) return <Loading />;

  return (
    <Main user={user}>
      <Page>
        <Card>
          <Title>Perfil</Title>
          {error && <ErrorText>Erro: {error}</ErrorText>}
          <Grid>
            <AvatarBig src={profile?.attributes?.avatar?.src} alt={profile?.attributes?.full_name} />
            <div>
              <Field>
                <Label>Nome</Label>
                <Value>{profile?.attributes?.full_name}</Value>
              </Field>
              <Field>
                <Label>E-mail</Label>
                <Value>{profile?.attributes?.email}</Value>
              </Field>
              <Field>
                <Label>Função</Label>
                <Value>
                  <RoleBadge>{profile?.attributes?.role}</RoleBadge>
                </Value>
              </Field>
              <Actions>
                <Button to={PATHS.edit}>Editar Perfil</Button>
              </Actions>
            </div>
          </Grid>
        </Card>
      </Page>
    </Main>
  );
}