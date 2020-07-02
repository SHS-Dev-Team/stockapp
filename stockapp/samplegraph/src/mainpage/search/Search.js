import React from 'react';
import Results from './Results';

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state={
            search:""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({
            search: e.target.value,
        });
    }

    render(){
        return(
            <div className="searchArea">
                <input type="text" placeholder="Enter Stock" value={this.state.search} onChange={this.handleChange} /> 
                {this.state.search.length!==0 ? (<Results search={this.state.search} func={this.props.setStock} />): ""}
            </div>
        );
    }
}

export default Search;