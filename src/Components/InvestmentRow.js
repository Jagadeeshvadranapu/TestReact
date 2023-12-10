import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


class InvestmentRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             investAmount: 0
            }
        this.selectRef = React.createRef();
        this.inputChange = this.inputChange.bind(this);
    }
    
    inputChange(e) {
        const percentageValue = e.target.value;
        const selectedValue = this.selectRef.current.value;
        if (selectedValue.toLowerCase() != 'select') {
            if (percentageValue.length > 0 && percentageValue > 0) {
                const investedAmount= (this.props.availableAmount * parseFloat(e.target.value)) / 100;
                this.setState({investAmount: investedAmount })
                this.props.updateAvailableAmount({
                    option: this.selectRef.current.value,
                    percentage: parseFloat(e.target.value),
                    amount:investedAmount
                })
            } else {
                alert('enter proper value')
            }
         }
        else {
            alert('select Investment option')
        }
    }
    render() {
        return (
            <>
                <Row className="g-3">
                    <Col md={"5"}>
                        <Form.Select aria-label="Investment Options" ref={this.selectRef}>
                            <option>Select</option>
                            {
                                this.props.investOptionsList.map((item) => (
                                     <option value={item.option} key={item.option}>{item.option}</option>  
                                ))
                             }
                        </Form.Select>
                    </Col>
                    <Col md={"3"}>
                        <InputGroup className="mb-1">
                            <Form.Control type='number' onBlur={this.inputChange} placeholder={0} />
                            <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col md={"3"}>
                        <InputGroup className="mb-1">
                            <Form.Control type='number' value={this.state.investAmount} readOnly />
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup>
                    </Col>
                    <Col md={"1"}>
                        <Button variant="outline-danger" style={{ float: 'right' }} onClick={() => this.props.removeInvestmentRow(this.props.rowItem)}><i className="bi bi-trash"></i></Button>
                    </Col>
                </Row>
            </>
        );
    }

}

export default InvestmentRow;