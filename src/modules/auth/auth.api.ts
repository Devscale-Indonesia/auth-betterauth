import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { dbMiddleware } from "#/shared/middleware/db.middleware";
import { LoginInputSchema, RegisterInputSchema } from "./auth.schema";
import { auth } from "./auth.utils";

export const registerServerFn = createServerFn({ method: "POST" })
  .middleware([dbMiddleware])
  .inputValidator(RegisterInputSchema)
  .handler(async ({ data }) => {
    await auth.api.signUpEmail({
      body: {
        email: data.email,
        name: data.name,
        password: data.password,
      },
    });

    throw redirect({
      to: "/login",
    });
  });

export const loginServerFn = createServerFn({ method: "POST" })
  .middleware([dbMiddleware])
  .inputValidator(LoginInputSchema)
  .handler(async ({ data }) => {
    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });

    throw redirect({
      to: "/dashboard",
    });
  });

export const getSessionServerFn = createServerFn().handler(async () => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });

  if (!session) throw redirect({ to: "/login" });

  return session;
});

export const loginWithGoogle = createServerFn().handler(async () => {
  const signIn = await auth.api.signInSocial({
    body: {
      provider: "google",
      scopes: ["profile"],
      callbackURL: "/dashboard",
    },
  });

  throw redirect({
    href: signIn.url,
  });
});
