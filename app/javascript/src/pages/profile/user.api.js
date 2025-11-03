import Swal from "sweetalert2";
import PATHS from "../../navigation/navigation.js";
import http from "../../utils/csrfToken.js";

export async function show(id) {
  try {
    const response = await http.get(`/api/v1/users/${id}`);
    return response.data.data;
  } catch (error) {
    const status = error?.response?.status;

    if (status === 403 || status === 401 || status === 500) {
      const serverMsg = error?.response?.data?.error
      Swal.fire({
        icon: "warning",
        title: "Sem permissão!",
        text: serverMsg,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.assign(PATHS.login);
      }, 3000);
    }

    throw error;
  }
}

export async function edit(id) {
  try {
    const response = await http.get(`/api/v1/users/${id}/edit`);
    return response.data.data;
  } catch (error) {
    const status = error?.response?.status;

    if (status === 403 || status === 401 || status === 500) {
      const serverMsg = error?.response?.data?.error
      Swal.fire({
        icon: "warning",
        title: "Sem permissão!",
        text: serverMsg,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.assign(PATHS.login);
      }, 3000);
    }

    throw error;
  }
}

export async function update(id, attrs) {
  try {
    if (attrs.avatar instanceof File) {
      const form = new FormData();
      Object.entries(attrs).forEach(([k, v]) => {
        if (k === "avatar") {
          form.append("user[avatar]", v);
        } else {
          form.append(`user[${k}]`, v ?? "");
        }
      });
      const response = await http.put(`/api/v1/users/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data;
    }
    const response = await http.put(`/api/v1/users/${id}`, { user: attrs });
    return response.data.data;
  } catch (error) {
    const status = error?.response?.status;
    if (status === 403 || status === 401 || status === 500) {
      const serverMsg = error?.response?.data?.error;
      Swal.fire({
        icon: "warning",
        title: "Sem permissão!",
        text: serverMsg,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.assign(PATHS.login);
      }, 3000);
    }
    throw error;
  }
}