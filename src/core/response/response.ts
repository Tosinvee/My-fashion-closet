export class SuccessResponse {
  success: boolean;
  message: string;
  data: unknown;

  constructor(message: string, data: unknown) {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}
