export class TodoItem {
  constructor(
    public readonly id: number,
    public name: string,
    public description?: string
  ) {
  }
}
