import React from "react";

interface ToggleButtonProps {
  isChecked: boolean;
  setIsChecked: { (isDone: boolean): void };
}

const ToggleButtonElement: React.FC<ToggleButtonProps> = ({
  isChecked,
  setIsChecked,
}) => {
  return (
    <div className="relative inline-block w-12 mr-2 align-middle select-none">
      <input
        type="checkbox"
        id="toggle"
        onChange={() => setIsChecked(!isChecked)}
        className={`absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all ${
          isChecked ? "right-0 border-blue-500" : "left-0"
        }`}
      />
      <label
        htmlFor="toggle"
        className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-all ${
          isChecked ? "bg-blue-500" : "bg-gray-200"
        }`}
      ></label>
    </div>
  );
};

export const ToggleButton = React.memo(ToggleButtonElement);
