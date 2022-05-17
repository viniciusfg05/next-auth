export class AuthTokenError extends Error {
  constructor() {
    super('Error with authentication token')
  }
}

//quando eu crio um class de erro, eu consigo diferenciar um erro do outro