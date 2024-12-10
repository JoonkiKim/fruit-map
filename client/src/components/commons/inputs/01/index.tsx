import { UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  type: "text" | "password";
  register: UseFormRegisterReturn;
}

export default function Input01(props: IInputProps) {
  return <input type={props.type} {...props.register} />;
}
