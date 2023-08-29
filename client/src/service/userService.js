import axios from "axios";

async function register(email, password) {
  try {
    const response = await axios.post("/api/users/register", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw new Error("An error occurred during registration.");
  }
}

export default register;
