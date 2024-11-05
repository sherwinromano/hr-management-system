import AuthImage from "@/assets/auth-image.webp";
import { SetStateAction, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

export type Email = {
  email: string;
};

type EmailContext = {
  email: Email;
  setEmail: React.Dispatch<SetStateAction<Email>>;
};

const AuthLayout = () => {
  const [email, setEmail] = useState<EmailContext | undefined>(undefined);

  return (
    <div className="h-full w-full flex gap-4">
      <div className="flex w-full justify-end items-center bg-[#f2f2f2] rounded-[30px]">
        <img
          className="h-4/5 rounded-l-[30px]"
          src={AuthImage}
          alt="App image"
        />
      </div>
      <Outlet context={{ email, setEmail }} />
    </div>
  );
};

export const useEmail = () => {
  return useOutletContext<EmailContext>();
};

export default AuthLayout;
