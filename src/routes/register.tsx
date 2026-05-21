import { createFileRoute, Link } from "@tanstack/react-router";
import { type SubmitEvent, useState } from "react";
import { registerServerFn } from "#/modules/auth/auth.api";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/register")({
  component: Register,
});

function Register() {
  const registerHandler = useServerFn(registerServerFn);
  const [error, setError] = useState("");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

    await registerHandler({
      data: {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      },
    });
  }

  return (
    <main className="min-h-screen p-8">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-sm flex-col gap-4"
      >
        <h1 className="text-2xl font-bold">Register</h1>

        <input
          name="name"
          type="text"
          placeholder="Name"
          className="rounded-lg border p-2"
          required
        />
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
          Register
        </button>
        <Link to="/login" className="text-sm underline">
          Already have an account? Login
        </Link>
      </form>
    </main>
  );
}
