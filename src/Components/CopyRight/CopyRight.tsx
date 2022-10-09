import React, { ReactElement } from "react";

export const CopyRight = (): ReactElement => {
	return (
		<>
			© {new Date().getFullYear()} - New Day at Work
		</>
	);
};
CopyRight.displayName = "CopyRight";