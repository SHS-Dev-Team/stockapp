import React from 'react';

class About extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    componentDidMount(){
        document.title="About";
    }
    render(){
        return(
            <div>
                <h1>About Page</h1>
                <p>
                    Uhhh WOAHHHH
                </p>
            </div>
        );
    }
}

export default About;