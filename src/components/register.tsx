import React, { useState } from "react";
import { Route, Link, HashRouter } from "react-router-dom";
import Home from "./home";
import { Button, Form, Col } from "react-bootstrap";

const Register = (props: any) => {
    const [name,setName]=useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
 
 
  function inputname(e: any) {
    setName(e.target.value);
  }
  function inputusername(e: any) {
    setUserName(e.target.value);
  }
  function inputpassword(e: any) {
    setPassword(e.target.value);
  }

  return (
    <>
      <Form>
      <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label> Name</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter name"
            onChange={inputname}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={inputusername}
          />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={inputpassword}
            />
          </Form.Group>
        </Form.Row>
      </Form>
      <Button
        className="style"
        variant="success"
        type="button"
        onClick={() =>
          props.handleregistration({
              name:name,
            username: username,
            password: password,
          })
        }
      >
        <HashRouter>
          <Link to="/">Register</Link>
          <Route exact path="/" component={Home}></Route>
        </HashRouter>
      </Button>
    </>
  );
};
export default Register;
