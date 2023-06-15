export class SubjectAlreadyExistsError extends Error {
  constructor() {
    super("Name already exists")
  }
}
