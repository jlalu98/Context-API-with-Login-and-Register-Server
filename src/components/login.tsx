import React, { useState } from "react";
// import {useHistory} from 'react-router-dom'
import { Route, Link, HashRouter } from "react-router-dom";
import { Button, Col, Form } from "react-bootstrap";
import Home from "./home";
/* import "bootstrap/dist/css/bootstrap.min.css"; */

interface Iprops {
    valid:String
  handlelogin: (username:any,password:any) => void;
}
const Login :React.FC<Iprops>= (Iprops: any) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  //   const history = useHistory();

  function inputlusername(e: any) {
    setUserName(e.target.value);
  }
  function inputlpassword(e: any) {
    setPassword(e.target.value);
  }

  return (
    <>
      {/* <div className="login"><h3>Login</h3>
            <p>Enter UserName:<input type="text"></input><br /><br />
        Enter Password:<input type="text"></input><br /><br /></p> */}
      <Form>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>User Name </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={inputlusername}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={inputlpassword}
          />
        </Form.Group>
      </Form>
      <Button
        variant="success"
        type="button"
        onClick={() =>
          Iprops.handlelogin( username, password)
        }
      >
        <HashRouter>
          <Link to="/">Login</Link>
          <Route exact path="/" component={Home}></Route>
        </HashRouter>
      </Button>
      {Iprops.valid === "failed" ? (
        <div style={{ color: "red" }}>Invalid Username or Password</div>
      ) : null}

      {/* </div> */}
    </>
  );
};
export default Login;
