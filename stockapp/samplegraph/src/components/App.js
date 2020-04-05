import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";

class ChartComponent extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount() {
		getData(this.props.url).then(data => {
			this.setState({data});
		})
	}
	render() {
		if (this.state == null) {
			return (<div>
				<span class="colorgrad loading" display="inline" kind="animated">Loading...</span>
			</div>)
		}
		return (
			<Chart type="svg" data={this.state.data} height = {this.props.height}/>
		)
	}
}

export default ChartComponent;