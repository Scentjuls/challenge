import { State } from "./Components/Buy/BuyModal";

export type UserInfo = {
  id: number;
  login: string;
  balance: number;
};

export type StockItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

let _user: UserInfo = {
  id: 1,
  login: "user1@example.com",
  balance: 120,
};

let _items: StockItem[] = [
  {
    id: 2,
    name: "Bronze sword: low quality, low price",
    price: 8,
    quantity: 10,
    image: "bronze_sword.png",
  },
  {
    id: 7,
    name: "Wooden shield",
    price: 15,
    quantity: 5,
    image: "wooden_shield.png",
  },
  {
    id: 101,
    name: "Battle axe",
    price: 12,
    quantity: 2,
    image: "battle_axe.png",
  },
  {
    id: 3,
    name: "Longsword, carefully crafted to slay your enemies",
    price: 31,
    quantity: 1,
    image: "longsword.png",
  },
];

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function simulateSuccessfulRequest<TResult>(
  result: TResult
): Promise<TResult> {
  await wait(Math.random() * 100);
  return result;
}

export function getUserInfo(): Promise<UserInfo> {
  return simulateSuccessfulRequest(_user);
}

export function listStock(): Promise<readonly StockItem[]> {
  return simulateSuccessfulRequest(_items);
}

export function buyStocks(total: number, items: State) {
  _user.balance = _user.balance - total;
  _items.map((item) => {
    item.quantity = item.quantity - items[item.id as keyof State];
    return item;
  });
}
