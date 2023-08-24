import { useAuth0 } from "@auth0/auth0-react";
import { FC } from "react";
import "../Styles/AuthButton.css";

interface Props {
  message: string;
}
const LoginButton: FC<Props> = ({ message }) => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>{message}</button>;
};

export default LoginButton;
