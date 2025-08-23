import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuthStore } from "../store/UseAuthStore";

function Login() {
  const navigate = useNavigate();
  const { isLoading, login } = UseAuthStore();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(formData, navigate);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-10">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Login</h1>
          <form onSubmit={handleLogin} className="w-full text-black max-w-md space-y-5">
            <div className="w-full">
              <label className="block text-gray-700 mb-2 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                value={formData.email}
                onChange={handleChange}
                name="email"
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div className="w-full">
              <label className="block text-gray-700 mb-2 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={isVisible ? "text" : "password"}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                  onChange={handleChange}
                  value={formData.password}
                  name="password"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-2 -translate-y-1/2 text-gray-600"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-blue-500 text-white font-semibold text-lg rounded-lg shadow hover:bg-blue-600 transition disabled:opacity-70"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>

        <div className="hidden md:flex md:w-1/2 bg-blue-50 items-center justify-center p-6">
          <img
            src="/loginPng.png"
            alt="login illustration"
            className="w-3/4 max-h-[300px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
