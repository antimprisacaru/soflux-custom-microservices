export type GraphqlError =
  | Array<{ message: string }>
  | string
  | { message: string };
