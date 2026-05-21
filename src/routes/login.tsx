import { createFileRoute, Link } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { loginServerFn, loginWithGoogle } from "#/modules/auth/auth.api";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const loginHandler = useServerFn(loginServerFn);
  const loginGoogleHandler = useServerFn(loginWithGoogle);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

    await loginHandler({
      data: {
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      },
    });
  }

  async function loginWithGoogleHandler() {
    await loginGoogleHandler();
  }

  return (
    <main className="min-h-screen p-8">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-sm flex-col gap-4"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="rounded-lg border p-2"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="rounded-lg border p-2"
          minLength={8}
          maxLength={32}
          required
        />

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button type="submit" className="rounded-lg bg-black p-2 text-white">
          Login
        </button>
        <Link to="/register" className="text-sm underline">
          Need an account? Register
        </Link>
      </form>
      <button onClick={loginWithGoogleHandler}>Login with Google</button>
    </main>
  );
}
