import React from "react";
import { Field, Label, Input } from "../../pages/profile/styled.js";

export default function Password({ value, onChange, label = "Nova senha", placeholder = "Digite uma nova senha" }) {
	return (
		<Field>
			<Label>{label}</Label>
			<Input type="password" name="password" value={value} onChange={onChange} placeholder={placeholder} />
		</Field>
	);
}

