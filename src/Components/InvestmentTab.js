import React from 'react';
import { Button,Card,InputGroup,Form} from 'react-bootstrap';

import InvestmentTable from './InvestmentTable';


class InverstmentTab extends React.Component {

    constructor(props) {
        super(props);
        const applicationState = this.props.applicationState;
        this.state = {
            investCurrancy: applicationState.investCurrancy,
            investAmount:applicationState.investAmount,
            availableAmount:applicationState.availableAmount
        };
        this.investmentChangedHandler = this.investmentChangedHandler.bind(this);
        this.calculateAvailableAmount = this.calculateAvailableAmount.bind(this);
        this.resetPage = this.resetPage.bind(this);
    }
    componentDidMount(){
        this.updateAvailableAmount(this.state.investAmount);
    }
    updateAvailableAmount(amount){
        this.setState({
            availableAmount:amount
        })
    }
    investmentChangedHandler (event) {
        const updatedValue = event.target.value;
        this.setState({investAmount:updatedValue});
        this.updateAvailableAmount(updatedValue);
    }
    calculateAvailableAmount(args){
        const updateAmount = (this.state.availableAmount - ((this.state.investAmount * args.percentage) / 100));
        this.updateAvailableAmount(updateAmount);
        this.props.investedItemTrigger(args);
    }
    resetPage(){
        window.location.reload(false);
    }
    render() {
        return (
             <Card style={{ width: '45rem' }}>
                <Card.Body>
                    <InputGroup className="mb-1">
                        <InputGroup.Text id="basic-addon1" className='Inv-Intputgrp'>Investment Amount</InputGroup.Text>
                        <Form.Control type='number' id="inv-amount" placeholder='Enter Investment Amount' 
                        value={this.state.investAmount}
                        onChange={this.investmentChangedHandler}/>
                        <InputGroup.Text>{this.state.investCurrancy}</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-2">
                        <InputGroup.Text id="basic-addon2" className='Inv-Intputgrp'>Available Amount</InputGroup.Text>
                        <Form.Control type='number' id="avai-amount" value={this.state.availableAmount} readOnly />
                        <InputGroup.Text>{this.state.investCurrancy}</InputGroup.Text>
                    </InputGroup>
                    <InvestmentTable 
                                investOptionsList={this.props.applicationState.investOptionsList}
                                availableAmount={this.state.investAmount} 
                                calculateAvailableAmount ={this.calculateAvailableAmount}
                               />
                </Card.Body>
                <Card.Footer>
                <Button variant="outline-danger" onClick={this.resetPage} style={{position:'relative',float:'right'}}>Reset</Button>
                </Card.Footer>
            </Card>
        );
    }
}
export default InverstmentTab;