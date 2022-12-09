export type CreateCommentRequest = {
  artId: number;
  userId?: number;
  name?: string;
  content: string;
};
