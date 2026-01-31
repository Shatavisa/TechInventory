import AuthForm from "@/components/AuthForm";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    const API_URL = `${import.meta.env.VITE_BASE_URL}/api/auth/register`;
    return
    try {
      const res = await axios.post(API_URL, formData, {
        withCredentials: true,
      });
      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <AuthForm
        headerText="Create Account"
        submitButtonText="Sign Up"
        isLogin={false}
      />
    </>
  );
}
