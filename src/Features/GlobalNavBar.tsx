import React,
{
	PropsWithChildren,
	ReactElement,
	MouseEvent
} from "react";
import { UserInfo } from "../service";
import { NavBar } from "../Components/NavBar/NavBar";

export type GlobalNavBarProps = {
	user: UserInfo | null;
	onChangeView(view: string): void;
};

export const GlobalNavBar = (props: PropsWithChildren<GlobalNavBarProps>): ReactElement => {
	const {
		user,
		onChangeView
	} = props;

	const clickHandler = (args: MouseEvent<HTMLAnchorElement>): void => {
		args.preventDefault();
		const href: string | null = args.currentTarget
			.getAttribute("href");

		if (!href) {
			return;
		}

		onChangeView(href.substring(1));
	};

	return (
		<NavBar>
			<NavBar.Item
				text="Home"
				url="#home"
				onClick={clickHandler}
			/>

			{user && (
				<>
					<NavBar.Item
						text="Stock"
						url="#stock"
						onClick={clickHandler}
					/>

					<NavBar.Item
						text="Buy"
						url="#buy"
						onClick={clickHandler}
					/>
				</>
			)}

		</NavBar>
	);
};
GlobalNavBar.displayName = "GlobalNavBar";
