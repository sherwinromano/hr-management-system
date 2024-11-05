import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "@/components/authentication/Input";
import Logo from "../../components/Logo";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type LoginValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<LoginValues>();

  const Login = async (data: LoginValues) => {
    alert(data);
  };

  return (
    <div className="w-[60%] p-4 flex justify-center items-center">
      <div className="flex flex-col gap-4 justify-center w-full">
        <div className="flex items-center gap-2 mb-4">
          <Logo style="size-14" />
          <h1 className="uppercase font-bold text-3xl text-dark-500">Hrms</h1>
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold text-dark-500 text-3xl">Welcome 👋</h2>
          <h3 className="text-base text-gray-500 font-light">
            Please login here
          </h3>
        </div>
        <form onSubmit={handleSubmit(Login)} className="flex flex-col gap-4">
          <Input
            {...register("email")}
            htmlFor="email"
            label="Email address"
            type="email"
          />
          <Input
            {...register("password")}
            htmlFor="password"
            label="Password"
            type="password"
          />
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Checkbox className="text-white font-bold" />
              <label className="text-base text-dark-500" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>
            <Link
              className="text-primary text-[14px] font-light"
              to="/auth/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Button
            className="text-white text-base p-6 font-light mt-4"
            type="submit"
          >
            Login
          </Button>
          <p className="text-[14px] text-dark-500">
            Don't have an account?{" "}
            <span>
              <Link className="text-primary" to="/auth/register">
                Register
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
