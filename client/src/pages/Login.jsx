import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseAuthStore } from "../store/UseAuthStore";

function Login() {
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

  const handleLogin = async () => {
    await login(formData);
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold my-3">Login</h1>
      <div className="h-[300px] md:h-[400px] md:w-[500px] w-fit flex border rounded-lg">
        <div className="border flex flex-1/2 flex-col justify-center items-center space-y-6 px-2 md:px-6">
          <div className="h-fit w-full space-y-2">
            <p className="text-2xl font-medium">Email :</p>
            <input
              type="email"
              className="h-fit w-full py-2.5 pl-2 border outline-0 rounded"
              value={formData.email}
              onChange={handleChange}
              name="email"
              placeholder="example@gmail.com"
            />
          </div>

          <div className="h-fit w-full space-y-2">
            <p className="text-2xl font-medium">Password :</p>
            <div className="flex items-center relative">
              <input
                type={isVisible ? "text" : "password"}
                className="h-fit w-full py-2.5 pl-2 relative border outline-0 rounded"
                onChange={handleChange}
                value={formData.password}
                name="password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-2"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-fit px-5 py-1 bg-blue-500 text-2xl font-medium tracking-wide rounded-md cursor-pointer hover:bg-blue-800"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
        <div className="w-[100px]"></div>
      </div>
    </div>
  );
}

export default Login;
