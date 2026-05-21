import { createServerFn } from "@tanstack/react-start";
import { CreateNoteSchema } from "./notes.schema";
import { logMiddleware } from "#/shared/middleware/log.middleware";
import { dbMiddleware } from "#/shared/middleware/db.middleware";

export const getNotesServerFn = createServerFn()
  .middleware([logMiddleware, dbMiddleware])
  .handler(async ({ context }) => {
    const notes = await context.db.note.findMany();
    return notes;
  });

export const createNoteServerFn = createServerFn()
  .inputValidator(CreateNoteSchema)
  .middleware([logMiddleware, dbMiddleware])
  .handler(async ({ data, context }) => {
    const newNote = await context.db.note.create({
      data: {
        content: data.content,
      },
    });
    return newNote;
  });
