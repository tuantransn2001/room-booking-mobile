/* eslint-disable import/no-extraneous-dependencies */
import React, { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export default RootLayout;
