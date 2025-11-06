import React from "react";
import { Field, Label } from "../../pages/profile/styled.js";

export default function Role({ value, onChange }) {
	return (
		<Field>
			<Label>Função</Label>
			<select
				name="role"
				value={value}
				onChange={onChange}
				style={{
					width: '100%',
					color: '#e5e7eb',
					background: 'rgba(17, 12, 28, 0.9)',
					border: '1px solid rgba(167,139,250,0.25)',
					borderRadius: 10,
					padding: '10px 12px',
					outline: 'none'
				}}
			>
				<option value="user">Usuário</option>
				<option value="admin">Administrador</option>
			</select>
		</Field>
	);
}

