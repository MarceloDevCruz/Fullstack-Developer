import Swal from "sweetalert2";
import PATHS from "../../navigation/navigation";
import http from "../../utils/csrfToken.js";

export async function indexUser() {
  try {
    const response = await http.get("/api/v1/users");
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
        window.location.assign(PATHS.profile);
      }, 3000);
    }

    throw error;
  }
}

export async function usersStats() {
  try {
    const response = await http.get("/api/v1/users/stats");
    const data = response?.data;
    return {
      totalUsers: data.total_users,
      totalsByRole: data.total_users_by_role_human || data.total_users_by_role,
    };
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
        window.location.assign(PATHS.profile);
      }, 3000);
    }
    throw error;
  }
}

export async function deleteUser(idOrSlug) {
  try {
    const response = await http.delete(`/api/v1/users/${idOrSlug}`);
    return response.data;
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
        window.location.assign(PATHS.profile);
      }, 3000);
    }
    throw error;
  }
}