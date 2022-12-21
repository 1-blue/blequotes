import { useCallback, useRef } from "react";

// type
import type { ReactNode } from "react";
import type {
  FieldValues,
  UseFormRegister,
  Path,
  RegisterOptions,
  FieldError,
} from "react-hook-form";

// label
type LabelProps = {
  name: string;
} & React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;
const Label = ({ name, ...rest }: LabelProps) => {
  return (
    <label htmlFor={name} {...rest}>
      {name}
    </label>
  );
};

// error message
type ErrorMessageProps = {
  text: string;
};
const ErrorMessage = ({ text }: ErrorMessageProps) => {
  return <span className="text-sm text-red-500 font-bold">** {text} **</span>;
};

// 일반 "form"
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
  error?: FieldError;
  options?: RegisterOptions;
} & React.InputHTMLAttributes<HTMLInputElement>;
function Input<T extends FieldValues>({
  register,
  name,
  className,
  error,
  options,
  ...rest
}: InputProps<T>) {
  return (
    <>
      <div className="flex flex-col">
        <Label name={name} hidden />

        <input {...register(name, options)} {...rest} className={className} />

        {error?.message && <ErrorMessage text={error.message} />}
      </div>
    </>
  );
}

// "react-hook-form"의 "textarea"
type TextAreaProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  className?: string;
  error?: FieldError;
  options?: RegisterOptions;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
function TextArea<T extends FieldValues>({
  register,
  name,
  className,
  error,
  options,
  ...rest
}: TextAreaProps<T>) {
  const { ref: refSpeechRegister, ...restSpeechRegister } = register(
    "speech" as Path<T>,
    options
  );
  const speechRef = useRef<null | HTMLTextAreaElement>(null);
  const handleResizeHeight = useCallback(() => {
    if (!speechRef || !speechRef.current) return;

    speechRef.current.style.height = "100px";
    speechRef.current.style.height = speechRef.current.scrollHeight + "px";
  }, []);

  return (
    <div className="flex flex-col">
      <Label name={name} hidden />

      <textarea
        id={name}
        {...restSpeechRegister}
        {...rest}
        className={className}
        ref={(e) => {
          refSpeechRegister(e);
          speechRef.current = e;
        }}
        onInput={handleResizeHeight}
      />

      {error?.message && <ErrorMessage text={error.message} />}
    </div>
  );
}

// "react-hook-form"의 "Select"
type SelectProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  name: Path<T>;
  htmlOptions: { value: string; text: string }[];
  className?: string;
  error?: FieldError;
  options?: RegisterOptions;
} & React.SelectHTMLAttributes<HTMLSelectElement>;
function Select<T extends FieldValues>({
  register,
  name,
  htmlOptions,
  className,
  error,
  options,
  ...rest
}: SelectProps<T>) {
  return (
    <div className="flex flex-col">
      <Label name={name} hidden />

      <select {...register(name, options)} {...rest} className={className}>
        {htmlOptions.map(({ value, text }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>

      {error?.message && <ErrorMessage text={error.message} />}
    </div>
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
  TextArea: typeof TextArea;
  Select: typeof Select;
  Button: typeof Button;
};
const RHF: RHFType = {
  Form,
  Input,
  TextArea,
  Select,
  Button,
};

export default RHF;
