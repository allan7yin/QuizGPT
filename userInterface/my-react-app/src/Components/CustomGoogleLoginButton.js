import React, { useEffect } from "react";

const CustomGoogleLoginButton = () => {
  const handleCallBackRespsone = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      clientId:
        "942515831813-91fk4re76j93njvkhq649orqlv2sl7p7.apps.googleusercontent.com",
      callback: handleCallBackRespsone,
    });

    google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      { theme: "outline", size: "large" }
    );
  }, []);

  function handleGoogleSignIn(response) {
    // Handle the response from Google Sign-In
    console.log("Google Sign-In Response:", response);
  }

  return <div id="google-signin-button"></div>;
};

export default CustomGoogleLoginButton;
