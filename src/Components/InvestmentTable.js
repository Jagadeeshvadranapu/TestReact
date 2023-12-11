import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';

import Button from 'react-bootstrap/Button';
import InvestmentRow from './InvestmentRow';
import { Card } from 'react-bootstrap';


class InvestmentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "Investment Options",
      error: null,
      isLoaded: false,
      investRows: Array.from({ length: 5 }, (value, index) => index),
      investedList: []
    };
    this.addInvestRow = this.addInvestRow.bind(this)
    this.removeInvestmentRow = this.removeInvestmentRow.bind(this)
    this.updateAvailableAmount = this.updateAvailableAmount.bind(this)
     
  }
  addInvestRow(event) {
    const updatelist = this.state.investRows;
    if (updatelist.length < 10) {
      updatelist.push(updatelist[updatelist.length - 1] + 1);
      this.updateRows(updatelist);
    } else {
      alert('Max 10 investment options are allowed')
    }
  }
  removeInvestmentRow(row) {
    const updatelist = this.state.investRows;
    const index = updatelist.indexOf(row);
    if (index > -1 && updatelist.length > 1) {
      updatelist.splice(index, 1);
      this.updateRows(updatelist);
    } else {
      alert('required one row')
    }
  }
  updateRows(rows) {
    this.setState({ investRows: rows })
  }
  updateAvailableAmount(args) {
    const investedRow = this.state.investedList;
    // if (investedRow.length > 0) {
    // //   const existingRow = investedRow.filter((row) => row?.option == args.option);
    // //   if (existingRow.length == 0) {
    // //     investedRow.push(args);
    // //     this.calculateAvailAmount(args)
    // //   }
    // // } else {
    // //   investedRow.push(args);
    // //   this.calculateAvailAmount(args);
    // //}
    //  }
    investedRow.push(args);
    this.calculateAvailAmount(args);
    this.setState({ investedList: investedRow });
    
  }
  calculateAvailAmount(args){
    this.props.calculateAvailableAmount(args);
  }

  render() {
    return (
      <Card style={{ fontSize: '14px', fontWeight: 'bold' }}>
        <Card.Header>{this.state.header}</Card.Header>
        <ListGroup>
          {
            this.state.investRows.map((item) => (
              <ListGroup.Item key={item} style={{ padding: '4px' }}>
                <InvestmentRow 
                 rowItem={item} 
                 investOptionsList={this.props.investOptionsList}
                 availableAmount={this.props.availableAmount}
                 removeInvestmentRow={this.removeInvestmentRow}
                 updateAvailableAmount={this.updateAvailableAmount} /></ListGroup.Item>
            ))}
        </ListGroup>
        <Button variant="outline-primary" style={{ position: 'absolute', right: '0px' }} onClick={this.addInvestRow}>Add</Button>
      </Card>
    );

  }
}

export default InvestmentTable;