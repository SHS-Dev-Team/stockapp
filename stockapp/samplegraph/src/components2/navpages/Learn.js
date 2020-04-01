import React from 'react';


class Learn extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    componentDidMount(){
        document.title="Learn";
    }
    render(){
        return(
            <div>
                <h1>Learn Page</h1>
            </div>
        );
    }
}

export default Learn;