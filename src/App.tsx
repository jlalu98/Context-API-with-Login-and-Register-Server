/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect, useState } from "react";
import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Details from "./components/details"
import BookList from "./components/booklist";
import {AddBook} from "./components/addbook";
import Login from "./components/login";
import Home from "./components/home"
import Register from './components/register';

function App(){
  const [user,setUser]=useState(false)
  const [loginFailed, setLoginFailed] = useState("");
  useEffect(()=>{
    if(localStorage.getItem("login")){
      setUser(true);
    }
  })
  const logout = async () => {
    setUser(false);
    localStorage.clear();
  };
  const authentication=async(username:any,password:any)=>{
    const body=JSON.stringify({username:username,password:password})
    let authen=await fetch("http://localhost:8060/books/login",{
      method:"POST",
      body:body,
      headers:{"Content-Type":"application/json"}
    })
     let valid=await authen.json();
     if(valid==="invalid"){
      setUser(false);
      setLoginFailed("failed");
     }else{
       localStorage.setItem("login",valid)
       setUser(true);
       setLoginFailed("success");
     }
  }
  const handleNewUser = async (newUser: any) => {
    console.log("reg");
    await fetch("http://localhost:8060/books/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    });
    console.log("reg2");
  };
  return (
    <Router>
      <div>
        <h1>Book Management Store</h1>
        <ul className="header">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/books">Book List</Link></li>
          <li>{user?<Link to="/add">Add Book</Link>:null}</li>
          <li>{user?null:<Link to="/login">Login</Link>}</li>
          <li>{user?null:<Link to="/register">Register</Link>}</li>
          <li>
            {user ? (
              <Link onClick={() => logout()} to="/">
                LogOut
              </Link>
            ) : null}
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/books" component={BookList}/>
          <Route path="/add" component={AddBook}/>
          <Route path="/details/:id" component={Details}/>
          <Route exact path="/register">
          <Register
            handleregistration={(newUser: any) => {
              handleNewUser(newUser);
            }}
          ></Register>
        </Route>
          <Route exact path="/login">
          <Login
            handlelogin={(username: any,password: any) => authentication(username,password)}
           valid={loginFailed}
          ></Login>
        </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
