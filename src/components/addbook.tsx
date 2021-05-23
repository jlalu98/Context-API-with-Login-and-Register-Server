import React, {useState } from "react";
import {useHistory} from "react-router-dom";
let books:any = localStorage.getItem("books");
if(!books){
    books=[];
}
else{
    books=JSON.parse(books);
}
function AddBook() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const history=useHistory();
  // function handleIdChange(event: any) {
  //   setId(event.target.value);
  // }

  function handleTitleChange(event: any) {
    setTitle(event.target.value);
  }
  function handleAuthorChange(event: any) {
    setAuthor(event.target.value);
  }
  function handlePriceChange(event: any) {
    setPrice(event.target.value);
  }
  function handleRatingChange(event: any) {
    setRating(event.target.value);
  }
  function handleDescriptionChange(event: any) {
    setDescription(event.target.value);
  }
  function handleCoverChange(event: any) {
    setCover(event.target.value);
  }

 function handleSubmit(event: any) {
    event.preventDefault();
    const book = {
      //id: id,
      title: title,
      author: author,
      price: price,
      rating: rating,
      description: description,
      cover: cover,
    };
    // books.push(book);
    // localStorage.setItem("books", JSON.stringify(books));
    let token = "Bearer " + localStorage.getItem("login");
    fetch("http://localhost:8060/books",{
    method:"POST",
    body:JSON.stringify(book),
    headers:{"Content-Type":"application/json" ,Authorization:token},
    })
    history.push("/books");
  }

  return (
    <div className="book-form">
      <form className="form-area">
        <h2>Add New Book</h2> <hr />
        {/* <div>
          <label htmlFor="id">ID : </label>
          <input
            type="text"
            name="id"
            placeholder="Book id"
            value={id}
            onChange={handleIdChange}
            required
          />
        </div> */}
        <br />
        <div>
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            name="title"
            placeholder="Book title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="author">Author : </label>
          <input
            type="text"
            name="author"
            placeholder="Book author"
            value={author}
            onChange={handleAuthorChange}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="price">Price : </label>
          <input
            type="text"
            name="price"
            placeholder="Book price"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="rating">Rating : </label>
          <input
            type="text"
            name="rating"
            placeholder="Book rating"
            value={rating}
            onChange={handleRatingChange}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="description">Description : </label>
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <br />
        <div>
          <label htmlFor="cover">Cover : </label>
          <input
            type="text"
            name="cover"
            placeholder="Book cover"
            value={cover}
            onChange={handleCoverChange}
            required
          />
        </div>
        <br />
        <div>
          {/* <HashRouter>
            <button type="submit" id="add-button" onClick={handleSubmit}>
              <Link to="/books" id="add-link">
                Add
              </Link>
            </button>
            <Route path="/books" component={BookList} />
          </HashRouter> */}
            <button type="submit" id="add-button" onClick={handleSubmit}>ADD</button>
        </div>
        <br />
      </form>
    </div>
  );
}
export {AddBook,books};

// class AddBook extends Component<{},any> {
//   constructor(props:any){
//       super(props);
//       this.state={
//           id:"",
//           title:"",
//           author:"",
//           price:"",
//           rating:"",
//           description:"",
//           cover:""
//       }
//       this.handleChange = this.handleChange.bind(this)
//       this.handleSubmit = this.handleSubmit.bind(this)
//   } 
//   handleSubmit(event:any){
//     const {id,title,author,price,rating,description,cover} = this.state;
//     event.preventDefault();
//     const book={
//         id:id,
//         title:title,
//         author:author,
//         price:price,
//         rating:rating,
//         description:description,
//         cover:cover
//     }
//     books.push(book);
//     localStorage.setItem("books",JSON.stringify(books));
    
// }
//   handleChange(event:any){
//     this.setState({
//       [event.target.name]: event.target.value
//     })
//   } 
//   render() {
//     return (
//       <div className="book-form">
        
//   <form className="form-area">
//     <h2>ADD NEW BOOK</h2>
//         <hr/>
//     <div>
//         <label htmlFor='id'>Book Id : </label>
//         <input type="text" name="id" required placeholder="Book id"  value={this.state.name} onChange={this.handleChange}/>
//     </div><br/>
//     <div>
//         <label htmlFor='title'>Title : </label>
//         <input type="text" name="title" required placeholder="Book title" value={this.state.name} onChange={this.handleChange}/>
//     </div><br/>
//    <div>
//         <label htmlFor='author'>Author : </label>
//         <input type="text" name="author" required placeholder="Author" value={this.state.name} onChange={this.handleChange}/>
//    </div><br/>
//    <div>
//         <label htmlFor='price'>Price : </label>
//         <input type="text" name="price" required placeholder="Price" value={this.state.name} onChange={this.handleChange}/>
//    </div><br/>
//     <div>
//         <label htmlFor='rating'>Rating : </label>
//         <input type="text" name="rating" required placeholder="Rating" value={this.state.name} onChange={this.handleChange}/>
//     </div><br/>
//     <div>
//         <label htmlFor='description'>Description : </label>
//         <textarea name="description" required placeholder="Description" value={this.state.name} onChange={this.handleChange}></textarea>
//     </div><br/>
//     <div>
//         <label htmlFor='cover'>Cover : </label>
//         <input type="text" name="cover" required placeholder="cover" value={this.state.name} onChange={this.handleChange}/>
//     </div><br/>
//     <div>
//         <HashRouter>
//         <button type="submit" id="add-button" onClick={this.handleSubmit}>
//           <Link to="/books">
//             ADD
//           </Link>
//           </button>
//           <Route path="/books" component={BookList}/>
//         </HashRouter>
//     </div><br/>
//   </form>
//       </div>
//     );
//   }
// }
 