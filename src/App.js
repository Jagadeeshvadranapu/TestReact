import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import InverstmentTab from './Components/InvestmentTab';
import ROITab from './Components/ROITab';
import { ApiRequest } from './Service/Service';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      investCurrancy: 'AUD',
      exchangeCurrancy: 'USD',
      investAmount: 100000,
      availableAmount: 0,
      investOptionsList: [],
      investedItems: []
    }
  }
  componentDidMount() {
    this.GetInvestmentOptions();
  }
  GetInvestmentOptions() {
    ApiRequest.GetInvestmentOptions().then((data) => {
      this.setState({
        investOptionsList: data,
        availableAmount: this.state.investAmount
      });
    });
  }
  investedItemTrigger(args){
    this.applicationState.investedItems.push(args);
  }

  render() {
    return (
      <div style={{ padding: '1rem' }}>
        {
          this.state.investOptionsList.length != 0 &&
          <Tabs defaultActiveKey="InvestmentOptions" id="homeTab" className="mb-3">
            <Tab eventKey="InvestmentOptions" title="Investment Options">
              <InverstmentTab applicationState={this.state} investedItemTrigger={this.investedItemTrigger}/>
            </Tab>
            <Tab eventKey="ProjectedROI" title="Projected ROI"> <ROITab applicationState={this.state} /> </Tab>
          </Tabs>

        }
      </div>
    )
  }

}

export default App;
