// type
import type { ReactNode } from "react";
import type { FieldValues, UseFormRegister, Path } from "react-hook-form";

// "react-hook-form"의 "form"
type FormProps = {
  children: ReactNode;
  onSubmit: () => void;
  className?: string;
} & React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;
const Form = ({ children, onSubmit, className, ...rest }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className={className} {...rest}>
      {children}
    </form>
  );
};

// "react-hook-form"의 "input"
type InputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
function Input<T extends FieldValues>({
  register,
  name,
  className,
  ...rest
}: InputProps<T>) {
  return <input {...register(name)} {...rest} className={className} />;
}

// "react-hook-form"의 "Select"
type SelectProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  options: { value: string; text: string }[];
  className?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;
function Select<T extends FieldValues>({
  register,
  name,
  options,
  className,
  ...rest
}: SelectProps<T>) {
  return (
    <select {...register(name)} {...rest} className={className}>
      {options.map(({ value, text }) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
}

// 일반 버튼
type ButtonProps = {
  children: ReactNode;
  className?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
};

type RHFType = {
  Form: typeof Form;
  Input: typeof Input;
  Select: typeof Select;
  Button: typeof Button;
};
const RHF: RHFType = {
  Form,
  Input,
  Select,
  Button,
};

export default RHF;
