import React from 'react';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:this.props.name
        };
    }
    componentDidMount(){
        document.title="Profile";
    }
    render(){
        return(
            <div>
                <h1>Profile page</h1>
            </div>
        );
    }
}

export default Profile;