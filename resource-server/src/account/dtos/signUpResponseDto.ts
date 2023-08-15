export class SignUpResponseDto {
  accessToken: String;
  email: String;
  id: number;
  roles: String[];
  tokenType: String;
  username: String;
  password: String;
  statusCode: String;
  statusCodeValue: number;

  constructor(
    accessToken: string,
    email: string,
    id: number,
    roles: string[],
    tokenType: string,
    username: string,
    password: string,
    statusCode: string,
    statusCodeValue: number
  ) {
    this.accessToken = accessToken;
    this.email = email;
    this.id = id;
    this.roles = roles;
    this.tokenType = tokenType;
    this.username = username;
    this.password = password;
    this.statusCode = statusCode;
    this.statusCodeValue = statusCodeValue;
  }
}
