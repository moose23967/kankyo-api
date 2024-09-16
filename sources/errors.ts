interface ElysiaErrorOptions {
  code: number;
  message: string;
}

export class ElysiaError extends Error {
  options: ElysiaErrorOptions;

  constructor(options: ElysiaErrorOptions) {
    super(options.message);

    this.options = options;
  }
}

export const AlreadyExists = new ElysiaError({
  code: 400,
  message: 'Already exists',
});
export const InvalidEmailOrPassword = new ElysiaError({
  code: 400,
  message: 'Invalid email or password',
});
export const Unauthorized = new ElysiaError({
  code: 401,
  message: 'Unauthorized',
});
export const NotFound = new ElysiaError({ code: 404, message: 'Not Found' });
