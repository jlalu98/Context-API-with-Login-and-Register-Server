/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable no-useless-constructor */
import  { Component } from "react"

class Search extends Component<{},any>{
    constructor(props:any){
        super(props);
    }
    render(){
        console.log(this.props);
        
        return(
            <>
                <h1>HELLO SEARCH</h1>
            </>
        );
    }
}
export default Search;