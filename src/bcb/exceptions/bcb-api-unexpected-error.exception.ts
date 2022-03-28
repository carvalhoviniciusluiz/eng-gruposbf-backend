export class BcbApiUnexpectedError extends Error {
  constructor(message = 'BCB_API_UNEXPECTED_ERROR') {
    super(message);
    this.name = BcbApiUnexpectedError.name;
  }
}
