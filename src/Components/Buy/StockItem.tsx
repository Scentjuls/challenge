import React from "react";
import { StockItem as StockItemType } from "../../service";
import { State } from "./BuyModal";
import "./BuyModal.css";
import MinusImage from "../../icons/minus.png";
import PlusImage from "../../icons/plus.png";

interface StockItemProps {
  stock: StockItemType;
  increment: (id: keyof State) => void;
  decrement: (id: keyof State) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    stock: StockItemType
  ) => void;
  value: number;
}

export const StockItem = ({
  stock,
  increment,
  decrement,
  value,
  handleChange,
}: StockItemProps) => {
  return (
    <div className="modal-body">
      <div className="order-details">
        <img
          className="order-image"
          src={"images/" + stock.image}
          alt="stock"
        />
        <p className="order-name">{stock.name}</p>
      </div>
      <div className="orders">
        <div className="order-count">
          <button
            onClick={() => decrement(stock.id as keyof State)}
            className="sign-container"
          >
            <img className="sign" src={MinusImage} alt="cross" />
          </button>
          <input
            className="input"
            type="number"
            value={value}
            onChange={(e) => handleChange(e, stock)}
          />
          <button
            onClick={() => increment(stock.id as keyof State)}
            className="sign-container"
          >
            <img className="sign" src={PlusImage} alt="cross" />
          </button>
        </div>
        <div className="prices">
          <p>{stock.price} gold</p>
        </div>
      </div>
    </div>
  );
};
