import { Link } from "react-router-dom";
import Chevron from "@/components/authentication/icons/Chevron";
import { Button } from "@/components/ui/button";
import Input from "@/components/authentication/Input";

const Register = () => {
  return (
    <div className="w-[60%] p-4 flex justify-center items-center">
      <div className="flex flex-col w-full gap-4 h-auto">
        <Link className="flex items-center gap-2 self-start" to="/auth/login">
          <Chevron style="size-7" />
          <p className="text-base text-dark-500">Back</p>
        </Link>
        <div className="flex flex-col h-full gap-7">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-dark-500 text-3xl">Register</h1>
            <p className="text-base font-light text-gray-500">
              Enter all required fields.
            </p>
          </div>
          <form className="flex flex-col gap-2">
            <Input htmlFor="email" label="Email address" type="email" />
            <Input htmlFor="password" label="Password" type="password" />
            <Input
              htmlFor="password"
              label="Confirm password"
              type="password"
            />

            <Button
              className="text-white text-base p-6 font-light mt-4 w-full"
              type="submit"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
