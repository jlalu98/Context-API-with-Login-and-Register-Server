/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import Details from "./details"
//import {books} from "./addbook";
import {
    Route,
    Link,
  } from "react-router-dom";
  import SearchBar from "./search-area"
import {StarComponent} from "./star-component"
function BookList(){
    const [books,setbookArray]=useState([]);
    const [searchArray,setsearchArray]=useState([]);

    useEffect(()=>{

        fetch("http://localhost:8060/books")
        .then(response=>{
          if(response.ok){
            return response.json()
          }
          throw response;
        })
        .then(data=>{
        setbookArray(data);
        setsearchArray(data)
          console.log(data);
        })
        .catch(err=>{
          console.log(err);
        })
        },[])
         //setsearchArray(books)
    
    //console.log(searchArray);
    
    const handleSearchSubmit=(searchText:any,selected:any)=>{
        let searchList:any=[];
    
    // books.map((book:any) =>{
    //         //console.log(book);
            
    //         if(book.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1){
    //             searchList.push(book)
    //         }
    //         else if(book.author.toLowerCase().indexOf(searchText.toLowerCase()) !== -1){
    //             searchList.push(book)
    //         }
    //         else if(book.description.toLowerCase().indexOf(searchText.toLowerCase()) !== -1){
    //             searchList.push(book)
    //         }
    //     })
    //     setsearchArray(searchList);
    //     //typeof(searchList)
    //     console.log(searchList);
    //     //return searchList;
    if(selected==="id"){
       /*  books.map((book:any)=>{
            if(book._id===searchText){
                searchList.push(book)
            }
        }) */
        const id=searchText
        fetch("http://localhost:8060/books"+id)
        .then((result: any)=>{
            books.map((book:any)=>{searchList.push(book)})
        })
        .catch((error: Error)=>console.log(error))
        
       

    }
    else if(selected==="author"){
        books.map((book:any)=>{
            if(book.author.toLowerCase().indexOf(searchText.toLowerCase()) !== -1){
                searchList.push(book)
            }
        })
    }
    else if(selected==="title"){
        books.map((book:any)=>{
            if(book.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1){
                searchList.push(book)
            }
        })
    }
    else if(selected==="rating"){
        books.map((book:any)=>{
            if(book.rating==searchText){
                searchList.push(book)
            }
        })
    }
    else if(selected==="price"){
        books.map((book:any)=>{
            if(book.price==searchText){
                searchList.push(book)
            }
        })
    }
    else if(selected==="text"){
        books.map((book:any)=>{
            if(book.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1){
                searchList.push(book)
            }
            else if(book.author.toLowerCase().indexOf(searchText.toLowerCase()) !== -1){
                searchList.push(book)
            }
            else if(book.description.toLowerCase().indexOf(searchText.toLowerCase()) !== -1){
                searchList.push(book)
            }
        })
    }
    setsearchArray(searchList); 
    }
    //setsearchArray(books);
     return (
              <>
                 {/* VIVEKS HELP */}
                    <SearchBar onSearch={handleSearchSubmit}></SearchBar>
                <br/><br/>
                {searchArray.map(function(book:any,index:any){
                    return(
                        <div className="grid">
                            <Link to={"/details/"+book._id}>
        
                        <div className="book-card" id={book._id}>
                        <br/>
                        <img id="img" src={book.cover} alt={book.title}/>
                        <h3>{book.title}</h3>
                        {/* <p>Rating:<StarComponent min={book.rating} max={5}></StarComponent></p> */}
                        Rating:<div className="stars"><span><StarComponent rating={book.rating} outof={5} minof={1}></StarComponent></span></div>
                        <p className="price"><strong>₹{book.price}</strong></p>
                        </div>
                       
                        </Link>
                            <Route path={"/details/"+book._id} component={Details}/>
                        </div>
                    );
                })}
              </>

            );

}


 
export default BookList;