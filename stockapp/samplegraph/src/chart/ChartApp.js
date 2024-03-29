import React from 'react';
import Chart from './Chart';
import { getData } from "./utils"

class ChartComponent extends React.Component {
	constructor(props){
		super(props);
		this.state={
			ready: false,
			url: this.props.url,
		}
	}

	componentDidMount() {
		getData(this.state.url).then(dt => {
			this.setState({
				data:dt,
				ready:true
			});
			this.props.changeInput();
		});
		
	}
	componentDidUpdate(prevProps){
		if(prevProps.url !== this.props.url){
			this.setState({url:this.props.url});
			getData(this.props.url).then(dt => {
				this.setState({data:dt});
				this.setState({ready:true});
				this.props.changeInput();
			});
		}	
	}
	static getDerivedStateFromError(error) {
		console.log(error);
		return { ready: false };
	}
	render() {
		if (!this.state.ready) {
			return (<div>
				<span className="colorgrad loading" display="inline" kind="animated">Loading...</span>
			</div>)
		}
		return (
			<div>
				<Chart color={this.props.color} type="svg" data={this.state.data} height = {this.props.height}/>
			</div> 
		)
	}
}

export default ChartComponent;