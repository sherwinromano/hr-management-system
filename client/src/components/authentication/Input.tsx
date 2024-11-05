import {
  HTMLInputTypeAttribute,
  useState,
  forwardRef,
  InputHTMLAttributes,
  Ref,
} from "react";
import Hidden from "@/components/authentication/icons/Hidden";
import Visible from "@/components/authentication/icons/Visible";

type InputProps = {
  htmlFor: string;
  label: string;
  type: HTMLInputTypeAttribute;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ htmlFor, label, type, ...props }, ref: Ref<HTMLInputElement>) => {
    return (
      <div className="flex flex-col border border-primary py-[5px] px-[14px] rounded-[10px]">
        <label
          className="text-[14px] text-primary font-light"
          htmlFor={htmlFor}
        >
          {label}
        </label>
        {htmlFor === "password" ? (
          <PasswordInput ref={ref} {...props} />
        ) : (
          <input
            ref={ref}
            className="outline-none text-base w-full"
            type={type}
            id={htmlFor}
            {...props}
          />
        )}
      </div>
    );
  }
);

const PasswordInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div className="flex justify-between gap-4">
      <input
        ref={ref}
        {...props}
        className="outline-none text-base w-full bg-transparent"
        type={isVisible ? "text" : "password"}
      />
      <span
        onClick={() => setIsVisible((prev) => !prev)}
        className="cursor-pointer"
      >
        {isVisible ? <Visible style="size-5" /> : <Hidden style="size-5" />}
      </span>
    </div>
  );
});

export default Input;
