import axios from "axios";
import { toast } from "react-hot-toast";

export async function handleRegister(data, setIsAuthenticated, navigate) {
  const { email, password, repass } = data;

  if (password !== repass) {
    toast.error("Passwords don't match!");
    return;
  }

  try {
    const { data } = await axios.post("/api/users/register", {
      email,
      password,
    });

    if (data.error) {
      toast.error(data.error);
    } else {
      setIsAuthenticated(true);
      toast.success("Register Successful. Welcome!");
      navigate("/home");
    }
  } catch (err) {
    console.log(err);
  }
}
