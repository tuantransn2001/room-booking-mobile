import { Dispatch } from "react";

export type SetState<T> = Dispatch<T>;

export type NavigationRouteProps<T> = {
  route: {
    params: T;
  };
};
