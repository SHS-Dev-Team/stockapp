import React from 'react';


class Learn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            posts: [],
            ready: false
        }
    }
    componentDidMount(){
        fetch('api/posts',{
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        })
        .then(res=>{
            return res.json()
        })
        .then(data=>{
            data.map(obj=>{
                this.setState(state=>{
                    state.posts.push({
                        date:obj.date,
                        category: obj.category,
                        title: obj.title,
                        text: obj.text
                    });
                })
            })
            this.setState({ready:true})
        })
    }
    render(){
        if(this.state.ready){
            return(
                <div>
                    { 
                    this.state.posts.map(obj=>{
                        return (
                            <div>
                            <h3>{obj.title}</h3>
                            <h6>{obj.date}</h6>
                            <p>{obj.text}</p> 
                            </div>
                        )
                    })
                    }
                </div>
            )
        }
        else{
            return(
                <h1>Loading...</h1>
            )
        }
    }
}


export default Learn;