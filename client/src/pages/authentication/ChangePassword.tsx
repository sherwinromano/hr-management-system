import { Link } from "react-router-dom";
import Chevron from "@/components/authentication/icons/Chevron";
import Input from "@/components/authentication/Input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import popper from "@/assets/popper.png";

const ChangePassword = () => {
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
              Change Password
            </h1>
            <p className="text-base font-light text-gray-500">
              Enter a new password for your account.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2"
          >
            <Input htmlFor="password" label="Password" type="password" />
            <Dialog>
              <DialogTrigger>
                <Button
                  className="text-white text-base p-6 font-light mt-4 w-full"
                  type="submit"
                >
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent className="h-auto">
                <DialogHeader>
                  <DialogTitle className="flex justify-center mb-8">
                    <img src={popper} alt="Popper image" />
                  </DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-col items-center gap-2">
                      <h1 className="font-semibold text-3xl text-center w-3/4 text-dark-500">
                        Password Update Successfuly
                      </h1>
                      <p className="text-base text-center text-gray-500">
                        Your password has been updated successfully
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Link className="w-full" to="/auth/login">
                    <Button
                      className="text-white bg-primary text-base p-7 font-light mt-4 w-full"
                      type="submit"
                    >
                      Back to Login
                    </Button>
                  </Link>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
