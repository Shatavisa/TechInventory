import axios from "axios";
import AuthForm from "../../components/AuthForm.jsx";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const handleLogin = async (formData) => {
    const API_URL = `${import.meta.env.VITE_BASE_URL}/api/auth/login`;
    return
    try {
      const res = await axios.post(API_URL, formData, {
        withCredentials: true,
      });
      login(res.data.user);
      toast.success("Login successful");
    } catch (err) {
      console.log("Login error:", err);

      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <AuthForm
        headerText="Login to Your Account"
        submitButtonText="Login"
        isLogin={true}
        handleSubmit={handleLogin}
      />
    </>
  );
}
