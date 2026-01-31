import { useState } from "react";
import OwnerForm from "./OwnerForm";
import TenantForm from "./TenantForm";
import { Link } from "react-router-dom";
const AuthForm = ({ headerText, submitButtonText, isLogin = true, handleSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lo_authFormData, setAuthFormData] = useState({
    user_name: "",
    user_email: "",
    password: "",
    tenant_phone: "",
    tenant_name: "",
    tenant_address: "",
  });

   const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await handleSubmit(lo_authFormData);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setAuthFormData({
      ...lo_authFormData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center w-full mx-auto p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              {headerText}
            </h1>
            <p className="text-gray-600">Join us today and get started</p>
          </div>

          <form className="w-full space-y-5" onSubmit={onSubmit}>
            <OwnerForm
              lo_authFormData={lo_authFormData}
              handleChange={handleChange}
            />
            {isLogin === false && (
              <TenantForm
                lo_authFormData={lo_authFormData}
                handleChange={handleChange}
              />
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
              >
                Reset
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
                disabled={isLoading}
              >
                {submitButtonText}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {submitButtonText === "Sign Up"
              ? "Already have an account?"
              : "Don't have an account?"}
            &nbsp;
            <Link
              to={isLogin ? "/register" : "/login"}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {submitButtonText == "Login" ? "Register" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
