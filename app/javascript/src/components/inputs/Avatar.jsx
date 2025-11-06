import React, { useEffect, useRef, useState } from "react";
import { AvatarBig, AvatarActions, UploadLabel, HiddenFileInput } from "../../pages/profile/styled.js";

export default function Avatar({ previewSrc, label = "Escolher foto", onFileChange, inputId = "avatar-file" }) {
	const [localSrc, setLocalSrc] = useState(previewSrc);
	const lastBlobUrl = useRef(null);

	useEffect(() => {
		if (!previewSrc) {
		} else {
			setLocalSrc(previewSrc);
		}
	}, [previewSrc]);

	useEffect(() => () => {
		if (lastBlobUrl.current) {
			URL.revokeObjectURL(lastBlobUrl.current);
			lastBlobUrl.current = null;
		}
	}, []);

	const onChange = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const url = URL.createObjectURL(file);
		if (lastBlobUrl.current) URL.revokeObjectURL(lastBlobUrl.current);
		lastBlobUrl.current = url;
		setLocalSrc(url);
		onFileChange && onFileChange(file);
	};

	return (
		<div>
			<AvatarBig src={localSrc} alt="Avatar" />
			<AvatarActions>
				<UploadLabel htmlFor={inputId}>{label}</UploadLabel>
				<HiddenFileInput id={inputId} onChange={onChange} />
			</AvatarActions>
		</div>
	);
}

