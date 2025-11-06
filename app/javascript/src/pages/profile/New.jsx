import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { createUser, newUser } from "./user.api.js";
import { Page, Card, Title, Grid, ErrorText, Actions, ButtonPrimary, Form } from "./styled.js";
import { FullName, Email, Password, PasswordConfirmation, Role, Avatar } from "../../components/inputs";
import PATHS from "../../navigation/navigation.js";
import { Main } from "../../components/styles/Main.jsx";

export default function New({ user }) {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		full_name: "",
		email: "",
		role: "user",
		password: "",
		password_confirmation: "",
	});
  const [avatarFile, setAvatarFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const onChange = (e) => {
		const { name, value, files } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
      if (!form.full_name || !form.email) {
        setError("Nome e e-mail são obrigatórios.");
        setLoading(false);
        return;
      }
      if (!form.password || !form.password_confirmation) {
        setError("Senha e confirmação são obrigatórias.");
        setLoading(false);
        return;
      }
      if (form.password.length < 6) {
        setError("A senha deve ter pelo menos 6 caracteres.");
        setLoading(false);
        return;
      }
      if (form.password !== form.password_confirmation) {
        setError("A confirmação de senha não confere.");
        setLoading(false);
        return;
      }

      const payload = {
        full_name: form.full_name,
        email: form.email,
        role: form.role,
        password: form.password,
        password_confirmation: form.password_confirmation,
      };
      if (avatarFile) payload.avatar = avatarFile;

      const created = await createUser(payload);
			const slug = created?.attributes?.slug || created?.id;
			Swal.fire({
				icon: "success",
				title: "Usuário criado",
				timer: 1600,
				showConfirmButton: false,
			});
			navigate(`${PATHS.profile}/${slug}`);
		} catch (err) {
			const msg = err?.response?.data?.errors?.join(", ") || err?.response?.data?.error || err.message || "Erro ao criar usuário.";
			setError(msg);
			Swal.fire({ icon: "error", title: "Erro", text: msg });
		} finally {
			setLoading(false);
		}
	};

  useEffect(() => {
    (async () => {
      try {
        await newUser();
      } catch (e) {
      }
    })();
  }, []);

	return (
  <Main user={user}>
      <Page>
        <Card>
          <Title>Novo Usuário</Title>
          {error && <ErrorText>Erro: {error}</ErrorText>}
          <Form onSubmit={onSubmit}>
            <Grid>
              <Avatar label="Escolher foto" onFileChange={setAvatarFile} />
              <div>
                <FullName value={form.full_name} onChange={onChange} />
                <Email value={form.email} onChange={onChange} />
                <Role value={form.role} onChange={onChange} />
                <Password value={form.password} onChange={onChange} label="Nova senha" placeholder="Digite uma senha" />
                <PasswordConfirmation value={form.password_confirmation} onChange={onChange} label="Confirmar senha" placeholder="Repita a senha" />
                <Actions>
                  <ButtonPrimary type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Criar Usuário'}</ButtonPrimary>
                </Actions>
              </div>
            </Grid>
          </Form>
        </Card>
      </Page>
    </Main>
	);
}
