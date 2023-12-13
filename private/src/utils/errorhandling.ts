  export class UserNotExistError extends Error {
    constructor(msg?: string) {
      super(msg);
      Object.setPrototypeOf(this, UserNotExistError.prototype);
    }
  }

  export class UserPasswordMissMatchError extends Error {
    constructor(msg?: string) {
      super(msg); 
      Object.setPrototypeOf(this, UserPasswordMissMatchError.prototype);
    }
  }

  export class UserStudentError extends Error {
    constructor(msg?: string) {
      super(msg); 
      Object.setPrototypeOf(this, UserStudentError.prototype);
    }
  }

  export class UserForgetPWError extends Error {
    constructor(msg?: string) {
      super(msg); 
      Object.setPrototypeOf(this, UserForgetPWError.prototype);
    }
  }