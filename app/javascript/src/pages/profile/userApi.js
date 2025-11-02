import axios from "axios";
import Swal from "sweetalert2";

export async function show(id) {
  try {
    const response = await axios.get(`/api/v1/users/${id}`);
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
        window.location.assign("/");
      }, 3000);
    }

    throw error;
  }
}

export async function edit(id) {
  try {
    const response = await axios.get(`/api/v1/users/${id}/edit`);
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
        window.location.assign("/");
      }, 3000);
    }

    throw error;
  }
}