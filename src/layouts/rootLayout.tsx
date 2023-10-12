/* eslint-disable import/no-extraneous-dependencies */
import React, { PropsWithChildren } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <React.Fragment>
      <ApplicationProvider {...eva} theme={eva.light}>
        {children}
      </ApplicationProvider>
    </React.Fragment>
  );
};

export default RootLayout;
