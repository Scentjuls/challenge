import React, { useState, useEffect } from "react";
import { StockItem, listStock, buyStocks, UserInfo } from "../../service";
import { StockItem as Stock } from "./StockItem";
import "./BuyModal.css";
import CrossImage from "../../icons/cross.png";

export type State = {
  2: number;
  3: number;
  7: number;
  101: number;
};

type modalProps = {
  showModal: boolean;
  user: UserInfo;
  closeModal: () => void;
};

const initialState = { 2: 0, 3: 0, 7: 0, 101: 0 };

export const BuyModal: React.FunctionComponent<modalProps> = (props) => {
  const { showModal, closeModal, user } = props;
  const [total, setTotal] = useState<State>(initialState);
  const [stockItems, setStockItems] = useState<readonly StockItem[]>([]);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const load = async (): Promise<void> => {
      const stock: readonly StockItem[] = await listStock();
      setStockItems(stock);
    };
    load();
  }, []);

  const totalAmount = stockItems.reduce(
    (prevValue, currentValue) =>
      prevValue + currentValue.price * total[currentValue.id as keyof State],
    0
  );

  useEffect(() => {
    if (totalAmount > user?.balance) {
      alert("You cannot perform this action");
    }
  }, [totalAmount, user?.balance]);

  const increment = (id: keyof State) => {
    const stock = stockItems.find((stock) => stock.id === id);
    if (stock) {
      const newTotal = total[id] + 1;
      if (stock.quantity >= newTotal) {
        setTotal({ ...total, [id]: newTotal });
      } else {
        alert("exceeded quantity");
      }
    }
  };

  const decrement = (id: keyof State) => {
    const stock = stockItems.find((stock) => stock.id === id);
    if (stock) {
      const newTotal = total[id] - 1;
      if (newTotal >= 0) {
        setTotal({ ...total, [id]: newTotal });
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stock: StockItem
  ) => {
    const value = parseInt(e.target.value);
    if (value <= stock.quantity || value >= 0) {
      setTotal({ ...total, [stock.id]: value });
    }
  };

  const buyStock = () => {
    if (totalAmount > user.balance) {
      alert("You cannot perform this action");
      return;
    }
    setCounter((counter) => counter + 1);
    if (counter > 3) {
      alert("Error from service, try again");
      setCounter(0);
    } else {
      buyStocks(totalAmount, total);
      setTotal(initialState);
      closeModal();
    }
  };

  return (
    <>
      {showModal ? (
        <div>
          <div className="modal--overlay"></div>
          <div className="container">
            <div className="modal--container">
              <div className="modal-head">
                <p>Order</p>
                <button onClick={() => closeModal()}>
                  <img src={CrossImage} alt="cross" />
                </button>
              </div>
              <div>
                {stockItems.map((stock) => (
                  <Stock
                    key={stock.id}
                    increment={increment}
                    decrement={decrement}
                    handleChange={handleChange}
                    value={total[stock.id as keyof State]}
                    stock={stock}
                  />
                ))}
              </div>
              <div className="modal-total">
                <p className="total-text">Total:</p>
                <p className="total-gold">{totalAmount} Gold</p>
              </div>
              <div className="modal-footer">
                <div className="buttons">
                  <button
                    onClick={() => buyStock()}
                    className="button"
                    disabled={totalAmount > user.balance}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => closeModal()}
                    className="button cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
