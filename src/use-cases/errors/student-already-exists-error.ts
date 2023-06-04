export class StudentAlreadyExistsError extends Error {
  constructor() {
    super("Email already exists")
  }
}
