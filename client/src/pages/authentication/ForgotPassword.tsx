import Chevron from "@/components/authentication/icons/Chevron";
import Input from "@/components/authentication/Input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEmail } from "@/layouts/Authentication";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Email } from "@/layouts/Authentication";

const ForgotPassword = () => {
  const { setEmail } = useEmail();
  const { register, handleSubmit } = useForm<Email>();
  const navigate = useNavigate();

  const handleForm = (data: Email) => {
    setEmail(data);
    navigate("/auth/verify-otp");
  };

  return (
    <div className="w-[60%] p-4 flex justify-center items-center">
      <div className="flex flex-col w-full gap-4 h-auto">
        <Link className="flex items-center gap-2 self-start" to="/auth/login">
          <Chevron style="size-7" />
          <p className="text-base text-dark-500">Back</p>
        </Link>
        <div className="flex flex-col h-full gap-7">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-dark-500 text-3xl">
              Forgot Password
            </h1>
            <p className="text-base font-light text-gray-500">
              Enter your registered email address. we'll send you a code to
              reset your password.
            </p>
          </div>
          <form onSubmit={handleSubmit(handleForm)}>
            <Input
              {...register("email")}
              htmlFor="email"
              label="Email address"
              type="email"
            />
            <Button
              className="text-white text-base p-6 font-light mt-8 w-full"
              type="submit"
            >
              Send OTP
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
