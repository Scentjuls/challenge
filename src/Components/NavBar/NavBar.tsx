import React,
{
	PropsWithChildren,
	ReactElement,
	MouseEvent
} from "react";
import "./NavBar.css";

export const NavBar = (props: PropsWithChildren<{}>): ReactElement => {
	const {
		children
	} = props;

	return (
		<ul className="nav-bar">
			{children}
		</ul>
	);
};
NavBar.displayName = "NavBar";

export type NavBarItemProps = {
	text: string;
	url: string;
	onClick: (args: MouseEvent<HTMLAnchorElement>) => void;
};

export const NavBarItem = (props: NavBarItemProps): ReactElement => {
	const {
		text,
		url,
		onClick
	} = props;

	return (
		<li className="nav-bar__item">
			<a
				href={url}
				onClick={onClick}
			>
				{text}
			</a>
		</li>
	);
};
NavBarItem.displayName = "NavBarItem";

NavBar.Item = NavBarItem;