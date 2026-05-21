import { createMiddleware } from "@tanstack/react-start";

export const logMiddleware = createMiddleware({ type: "function" }).server(
  ({ next }) => {
    console.log("Hello from middleware!");
    return next();
  },
);
