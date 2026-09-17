export interface CrudController {
  createOne(data: unknown): unknown;
  findMany(data: unknown, ...args: unknown[]): unknown;
  findOneById(id: unknown, ...args: unknown[]): unknown;
  updateOneById(id: number, data: unknown, ...args: unknown[]): unknown;
  deleteOneById(id: number, ...args: unknown[]): unknown;
}
