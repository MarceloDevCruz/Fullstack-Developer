import React from "react";
import { Field, Label, Input } from "../../pages/profile/styled.js";

export default function PasswordConfirmation({ value, onChange, label = "Confirmar senha", placeholder = "Repita a nova senha" }) {
	return (
		<Field>
			<Label>{label}</Label>
			<Input type="password" name="password_confirmation" value={value} onChange={onChange} placeholder={placeholder} />
		</Field>
	);
}

