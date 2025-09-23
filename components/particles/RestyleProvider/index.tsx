import { ThemeProvider } from "@shopify/restyle";
import React, { FC } from "react";
import Theme from "styles/restyleTheme";

type Props = {
  children: React.ReactNode;
};

const RestyleProvider: FC<Props> = ({ children }) => (
  <ThemeProvider theme={Theme}>{children}</ThemeProvider>
);

export default RestyleProvider;
