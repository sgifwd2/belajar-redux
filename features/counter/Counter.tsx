import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
  selectCount,
  decrement,
  increment,
  incrementByAmount,
} from "./counterSlice";

export const Counter: React.FC = () => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const inputAmountRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-center items-center space-x-5">
        <button
          onClick={() => dispatch(decrement())}
          className="py-2 px-4 bg-gray-300 rounded-md shadow text-gray-700 font-semibold"
        >
          -
        </button>
        <span className="text-2xl text-gray-500 font-bold">{count}</span>
        <button
          onClick={() => dispatch(increment())}
          className="py-2 px-4 bg-gray-300 rounded-md shadow text-gray-700 font-semibold"
        >
          +
        </button>
      </div>
      <div className="flex justify-center items-center space-x-5">
        <input
          ref={inputAmountRef}
          type="text"
          className="bg-gray-100 rounded-md py-2 px-4 focus:ring-0 focus:outline-none shadow text-gray-500"
        />
        <button
          onClick={() => {
            dispatch(
              incrementByAmount(Number(inputAmountRef.current!.value) || 0)
            );

            inputAmountRef.current!.value = "";
          }}
          className="py-2 px-4 bg-gray-300 rounded-md shadow text-gray-700 font-semibold"
        >
          increment by amount
        </button>
      </div>
    </div>
  );
};
