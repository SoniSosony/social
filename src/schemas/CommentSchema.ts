import { z } from "zod";

export const CommentSchema = z.object({
  id: z.string(),
  user: z.string(),
  owner: z.string(),
  text: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  likeCount: z.number(),
  liked: z.boolean(),
  users: z.array(z.string()),
});

export const CommentSchemaArray = z.array(CommentSchema);

export interface Comment extends z.infer<typeof CommentSchema> {}