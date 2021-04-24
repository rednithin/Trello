import React from "react";
import "./index.css";

interface IButtonProps {
  value: string;
  type?: "button" | "submit";
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

const Button: React.FC<IButtonProps> = ({
  value,
  type = "button",
  onClick,
}) => <input className="button" type={type} value={value} onClick={onClick} />;

export default Button;
