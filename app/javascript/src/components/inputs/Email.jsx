import React from "react";
import { Field, Label, Input } from "../../pages/profile/styled.js";

export default function Email({ value, onChange, placeholder = "seuemail@exemplo.com" }) {
	return (
		<Field>
			<Label>E-mail</Label>
			<Input type="email" name="email" value={value} onChange={onChange} placeholder={placeholder} />
		</Field>
	);
}

