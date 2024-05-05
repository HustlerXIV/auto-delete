import React from "react";
import "./CustomBtn.style.css";

interface CustomBtnProps {
  text?: string;
  onClick?: () => void;
}

const CustomBtn: React.FC<CustomBtnProps> = ({ text, onClick }) => {
  return (
    <button className="custom-btn" onClick={onClick}>
      {text}
    </button>
  );
};

export default CustomBtn;
