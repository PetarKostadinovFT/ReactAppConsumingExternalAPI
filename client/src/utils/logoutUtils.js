import axios from "axios";

export async function logout(setIsAuthenticated) {
  try {
    await axios.get("/api/users/logout");
    setIsAuthenticated(false);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
