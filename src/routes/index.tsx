import {
  createNoteServerFn,
  getNotesServerFn,
} from "#/modules/notes/notes.api";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  loader: () => getNotesServerFn(),
});

function Home() {
  const notes = Route.useLoaderData();
  const [note, setNote] = useState("");

  async function handleCreateNote() {
    await createNoteServerFn({
      data: {
        content: note,
      },
    });
  }

  return (
    <div className="p-8">
      <section>
        <textarea
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note"
          className="p-2 border rounded-lg"
        ></textarea>
        <button onClick={handleCreateNote}>Create Note</button>
      </section>
      <section>
        {notes.map((note) => {
          return <div key={note.id}>{note.content}</div>;
        })}
      </section>
    </div>
  );
}
