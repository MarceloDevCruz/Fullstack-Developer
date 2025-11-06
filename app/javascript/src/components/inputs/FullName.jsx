import React from "react";
import { Field, Label, Input } from "../../pages/profile/styled.js";

export default function FullName({ value, onChange, placeholder = "Seu nome completo" }) {
	return (
		<Field>
			<Label>Nome</Label>
			<Input name="full_name" value={value} onChange={onChange} placeholder={placeholder} />
		</Field>
	);
}

