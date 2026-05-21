import z from "zod";

export const CreateNoteSchema = z.object({
  content: z.string().min(1),
});
