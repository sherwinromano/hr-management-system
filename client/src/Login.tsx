import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthImage from "./assets/auth-image.webp";
import Input from "./components/authentication/Input";
import Logo from "./components/Logo";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const Login = async (data: Inputs) => {
    console.log(data);
  };

  return (
    <div className="h-full w-full flex gap-4">
      <div className="flex w-full justify-end items-center bg-[#f2f2f2] rounded-[30px]">
        <img
          className="h-4/5 rounded-l-[30px]"
          src={AuthImage}
          alt="App image"
        />
      </div>
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
              <div className="flex gap-2">
                <input className="cursor-pointer caret-black" type="checkbox" />
                <label className="text-base text-dark-500" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
              <Link className="text-primary text-[14px] font-light" to="/login">
                Forgot Password?
              </Link>
            </div>
            <input
              className="bg-primary text-white text-base font-light rounded-[10px] p-4 mt-4 cursor-pointer"
              type="submit"
              value="Login"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
