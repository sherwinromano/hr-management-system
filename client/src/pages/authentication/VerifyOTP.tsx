import { Link } from "react-router-dom";
import Chevron from "@/components/authentication/icons/Chevron";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEmail } from "@/layouts/Authentication";
import { useForm } from "react-hook-form";

type OTP = {
  otp: string;
};

const VerifyOTP = () => {
  const { email } = useEmail();
  const otpSlot = [0, 1, 2, 3, 4, 5] as const;
  const otpSlotStyle =
    "font-semibold text-3xl w-14 h-full border border-primary rounded-[10px] ring-0";
  const { register, handleSubmit } = useForm<OTP>();

  const submitOTP = (data: OTP) => {
    console.log(data);
  };

  return (
    <div className="w-[60%] p-4 flex justify-center items-center">
      <div className="flex flex-col w-full gap-4 h-auto">
        <Link
          className="flex items-center gap-2 self-start"
          to="/auth/forgot-password"
        >
          <Chevron style="size-7" />
          <p className="text-base text-dark-500">Back</p>
        </Link>
        <div className="flex flex-col h-full gap-7">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-dark-500 text-3xl">Enter OTP</h1>
            <p className="text-base font-light text-gray-500">
              We have share a code of your registered email address{" "}
              {email && email.email}
            </p>
          </div>
          <form onSubmit={handleSubmit(submitOTP)} className="flex flex-col">
            <div className="flex justify-center">
              <InputOTP maxLength={6} {...register("otp")}>
                <InputOTPGroup className="h-16 gap-4">
                  {otpSlot.map((index) => {
                    return (
                      <InputOTPSlot
                        index={index}
                        className={otpSlotStyle}
                        key={index}
                      ></InputOTPSlot>
                    );
                  })}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button
              className="text-white text-base p-6 font-light mt-8 w-full"
              type="submit"
            >
              Verify
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
