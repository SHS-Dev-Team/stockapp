import React from 'react';
import UniqueImage from '../../../static/baseUI/img/undraw_posting_photo.svg';
import ChartComponent from '../../chart/ChartApp

class Basics extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        render(){
        console.log(this.props.newsData);
        return (
            <div className="card shadow mb-4">     {/*Price Chart*/ }
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Chart</h6>
                    <div className="dropdown no-arrow">
                        <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                            <div className="dropdown-header">Dropdown Header:</div>
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                {/* Card Body  */ }
                <div className="card-body">
                    <div className="chart-area">
                        <ChartComponent height={320} url={this.props.url}/>
                        {/* <canvas id="myAreaChart"></canvas> */}
                    </div>
                </div>
            </div>     
          );
      }
  }   
  class Basics extends React.Component{
      constructor(props){
          super(props);
          this.state={
            ready: false,
            error: false,
            posts: []
         }
        this.fetchData= this.fetchData.bind(this);
      }
      fetchData(){
        const link = 'https://docs.google.com/document/d/1IQiyn9QYeq3NdDbfix5HF74510LLi2puAmVl1SUcFyM/edit'
        fetch(link)
        .then(response=>{
            if(response.ok){
                const th = response.json();
                return th;
            }
            else{
                throw new Error("Could not fetch")
            }
        })
   }
}
export default Basics;
