import axios from "axios";

export async function fetchUsers() {
  try {
    const response = await axios.get("/api/v1/users");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}

export async function fetchUserById(id) {
  try {
    const response = await axios.get(`/api/v1/users/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
}
