/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import React, { Component, useState} from "react";
import { match, RouteComponentProps } from "react-router-dom";
//import {books} from "./addbook";
import {
    Route,
    Link,
    HashRouter
  } from "react-router-dom";
import { useHistory } from "react-router-dom";
import BookList from "./booklist";
function Details(props: any) {
  const [book,setBook]=useState({_id:"",title:"",author:"",price:"",rating:"",description:"",cover:""});
  let history =useHistory();
  const id = props.match.params.id;
  const uri="http://localhost:8060/books/"+id;
  async function handleClick(index: any) {
      // books.splice(index, 1);
      // localStorage.setItem("books", JSON.stringify(books));
      let token="Bearer " + localStorage.getItem("login")
  await fetch(uri,{
      method:"DELETE",
      headers:{Authorization:token}
    }) 

      history.push("/books");
    }
  
  fetch(uri)
  .then(response=>{
    if(response.ok){
      return response.json()
    }
    throw response;
  })
  .then(data=>{
  setBook(data);
    console.log(data);
  })
  .catch(err=>{
    console.log(err);
  })
  //console.log(book);
  
    return (
      <div>
        {/* eslint-disable-next-line */}
        {/* {books.map((book: any, index: any) => {
          if (book.id === id) { */}
            {/* return ( */}
              <div className="card">
                <img id="imgDetails" src={book.cover} alt={book.title} />
                <div className="book-info">
                <p>
                  <strong>Author:{book.author}</strong>
                </p>
                <p>
                  <strong>Rating:{book.rating}</strong>
                </p>
                <p>
                  <strong>Price :₹{book.price}</strong>
                </p>
                </div>
                <h1>{book.title}</h1>
                <br />
                <p>
                  <strong>{book.description}</strong>
                </p>
             
                <button type="button" id="del-button" onClick={handleClick}>DELETE</button>
              </div>
            {/* ); */}
        {/* //   }
        // })} */}
      </div>
    );
  }
  
  export default Details;
  
// class Details extends Component<RouteComponentProps<any>>{
//     constructor(props:any){
//         super(props);
//         this.handleClick = this.handleClick.bind(this)
//     }
//     handleClick(index:any){
//         books.splice(index,1);
//         localStorage.setItem("books",JSON.stringify(books));
//     }
//     render(){
//         const id=this.props.match.params.id;
//         return(
//             <div>
//                {books.map((book:any,index:any) =>{
//                    if(book.id===id){
//                        return(
//                         <div className="card">
//                         <img id="imgDetails" src={book.cover} alt={book.title}/>
//                         <p><strong>Author:{book.author}</strong></p> 
//                         <p><strong>Rating:{book.rating}</strong></p>
//                         <p><strong>Price :₹{book.price}</strong></p>
//                         <h1>{book.title}</h1>
//                         <br/>
//                         <p><strong>{book.description}</strong></p>
//                         <HashRouter>
//                             <Link to="/books" id="del-button" onClick={()=>this.handleClick(index)}>
//                                 DELETE
//                             </Link>
//                             <Route path="/books" component={BookList}/>
//                         </HashRouter>                        
//                         </div>
//                        );
//                    }
//                })}
//             </div>
//         );
//     }
// }
// export default Details;