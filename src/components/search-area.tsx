/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
import  { FunctionComponent, useState } from "react";
  //VIVEKS HELP!!!!!
 export interface SearchProps{
     onSearch:Function,
 } 
const SearchBar:FunctionComponent<SearchProps>=({onSearch})=>{
    const [searchText,setsearchText]=useState("");
    const [selected,setSelected]=useState("");
    function handleSearch(e:any){
        setsearchText(e.target.value);
    }
    const handleChange=(e:any)=> {
        setSelected(e.target.value);

    }
    return(
        <div>
            <select  onChange={handleChange}>
            <option value="id">Search By ID</option>
            <option value="author">Search By Author</option>
            <option value="title">Search By Title</option>
            <option value="rating">Search By Rating</option>
            <option value="price">Search By Price</option>
            <option value="text">Search By Text</option>
          </select>
            <input type="text" name="search" required placeholder="Search..."   onChange={handleSearch}/>
            <button id="search-button" type="submit" onClick={()=>onSearch(searchText,selected)}>Search</button>
    
        </div>
    );
}
export default SearchBar;
// class SearchBar extends Component<SearchProps,any>{
//     constructor(props:any){
//         super(props);
//         this.state={
//             searchText:""
//         }
//        this.handleSearch = this.handleSearch.bind(this)

//     }
//     handleSearch(event:any){
//         this.setState({
//             searchText : event.target.value,
//         })
//     }
//     render(){
//         return(
//             <div>
//                 <input type="text" name="search" required placeholder="Search..."  value={this.state.name} onChange={this.handleSearch}/>
//                 <button id="search-button" type="submit" onClick={()=>this.props.onSearch(this.state.searchText)}>Search</button>
        
//             </div>
//         );
//     }
// }