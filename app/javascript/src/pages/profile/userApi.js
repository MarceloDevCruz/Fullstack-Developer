import Swal from "sweetalert2";
import PATHS from "../../navigation/navigation";
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