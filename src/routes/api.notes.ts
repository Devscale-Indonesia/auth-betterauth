import { getNotesServerFn } from "#/modules/notes/notes.api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/notes")({
  server: {
    handlers: {
      GET: async () => {
        const notes = await getNotesServerFn();
        return new Response(JSON.stringify(notes), {
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
    },
  },
});
