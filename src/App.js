import React, { Component } from 'react';
import {Input,message} from 'antd';
import {LineChart,Line,XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Util from './Util.jsx';
import './App.css';

const Search = Input.Search;
class App extends Component {

  state = {
    value: null,
    data: [],
    name: null
  }
  
  handleChange = (e) => {
    let reg = /^\d*$/;
    reg.test(e.target.value) ? this.setState({
      value: e.target.value
    }) : message.info('请输入数字')
  }

  handleSearch = (val) => {
    this.getData(val)
  }

  getData = (val) => {
   fetch(`http://39.106.109.207/website/rest/v1/stock/code/${val}/info`).then(res=>res.json()).then(response=>{
      response.name && this.setState({name: `${response.name}近一个月的股价`})
      fetch(`http://39.106.109.207/website/rest/v1/stock/data/${val}/page?page=0&size=30`).then(res=>res.json()).then(res=>{
        if(res.length === 0) {
          message.error('请输入正确的代码')
        }else{
          this.setState({data: res})
        }
      })
   }).catch(()=>{message.error('请输入正确的代码')})
  }

  render() {
    return (
      <div className="App">
        <Search style={{width: 300,margin: 20}} onChange={this.handleChange} value={this.state.value} onSearch={this.handleSearch} placeholder='请输入股票代码' enterButton/>
        {this.state.data.length > 0 ?
          <div style={{margin: '0 auto',width: 600}} >
            <h3>{this.state.name}</h3>
            <LineChart width={600} height={300} data={this.state.data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="date" tickFormatter={(time)=>Util.formatTime(time,'MM-dd')} interval={~~ this.state.data.length/5} reversed/>
              <YAxis domain={['auto','auto']} tickFormatter={e=>+e.toFixed(2)}/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip labelFormatter={(time)=>Util.formatTime(time,'yyyy-MM-dd')}/>
              <Legend />
              <Line type="monotone" dataKey="currentPrice" stroke="#8884d8" name='当日价格'/>
            </LineChart>
          </div>
          : null
        }
      </div>
    );
  }
}

export default App;
