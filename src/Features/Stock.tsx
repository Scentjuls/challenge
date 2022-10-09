import React,
{
	Fragment,
	ReactElement,
	useEffect,
	useState
} from "react";
import { listStock, StockItem } from "../service";

export const Stock = (): ReactElement => {
	const [items, setItems] = useState<readonly StockItem[]>([]);

	useEffect(
		() => {
			const load = async (): Promise<void> => {
				const stock: readonly StockItem[] = await listStock();
				setItems(stock);
			};
			load();
		},
		[]
	);

	return (
		<>
			<h2>Current stock</h2>
			<div>
				{items.map(x => (
					<Fragment key={x.id}>
						{x.name} : {x.quantity}
						<br />
					</Fragment>
				))}
			</div>
		</>
	);
};
Stock.displayName = "Stock";