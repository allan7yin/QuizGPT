export class LoginResponseDto {
  token: String;
  authScheme: String;
  id: number;
  username: String;
  email: String;
  roles: String[];
  statusCode: String;
  statusCodeValue: number;

  constructor(
    token: String,
    authScheme: String,
    id: number,
    username: String,
    email: String,
    roles: String[],
    statusCode: String,
    statusCodeValue: number
  ) {
    this.token = token;
    this.authScheme = authScheme;
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
    this.statusCode = statusCode;
    this.statusCodeValue = statusCodeValue;
  }
}
