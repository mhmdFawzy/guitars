import React from "react";
import SharedButton from "./../shared/button";
import LoginForm from "./Login";
function Login() {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customer</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
              ab id distinctio, praesentium magnam at aliquid, nesciunt quaerat
              quia voluptatem vitae possimus molestiae ipsam, placeat adipisci
              maxime consectetur autem aut.
            </p>
            <SharedButton
              type="link"
              linkTo="register"
              title="Create an account"
              addStyle={{ margin: "10px 0 0 0" }}
            />
          </div>
          <div className="right">
            <h1>Login</h1>
            <LoginForm />
      
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
