export class FortniteAPIError extends Error {
  public status: number;
  public data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "FortniteAPIError";
    this.status = status;
    this.data = data;
  }
}
