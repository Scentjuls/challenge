import React,
{
	PropsWithChildren,
	ReactElement
} from "react";
import { CopyRight } from "../Components/CopyRight/CopyRight";
import "./Layout.css";

export const Layout = (props: PropsWithChildren<{}>): ReactElement => {
	const {
		children
	} = props;

	return (
		<div className="layout">
			{children}
		</div>
	);
};
Layout.displayName = "Layout";


const Header = (props: PropsWithChildren<{}>): ReactElement => {
	const {
		children
	} = props;

	return (
		<div className="layout__header">
			{children}
		</div>
	);
};
Header.displayName = "Header";

const Content = (props: PropsWithChildren<{}>): ReactElement => {
	const {
		children
	} = props;

	return (
		<div className="layout__content">
			{children}
		</div>
	);
};
Content.displayName = "MainContent";

const Footer = (): ReactElement => {
	return (
		<div className="layout__footer">
			<CopyRight />
		</div>
	);
};
Footer.displayName = "Footer";

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;
