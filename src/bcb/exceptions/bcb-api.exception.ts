export class BcbApiException extends Error {
  constructor(message = 'BCB_API_EXCEPTION') {
    super(message);
    this.name = BcbApiException.name;
  }
}
