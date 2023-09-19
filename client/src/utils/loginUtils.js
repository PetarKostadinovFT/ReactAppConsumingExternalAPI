import axios from "axios";
import { toast } from "react-hot-toast";

export async function handleLogin(data, setIsAuthenticated, navigate) {
  const { email, password } = data;

  try {
    const { data } = await axios.post("/api/users/login", {
      email,
      password,
    });

    if (data.error) {
      toast.error(data.error);
    } else {
      setIsAuthenticated(true);
      toast.success("Login Successful. Welcome!");
      navigate("/home");
    }
  } catch (error) {
    console.log(error);
  }
}
