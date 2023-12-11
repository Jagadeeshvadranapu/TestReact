import React from 'react';
import { Button, Card, Form, Row, Col, CardHeader } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'

import { ApiRequest } from '../Service/Service';

class ROITab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProjectedROI: "0 AUD",
            ProjectedFees: "0 AUD",
            Spinner: true
        }
        this.calculate = this.calculate.bind(this)
    }
    calculate() {
        const investedItems = this.props.applicationState.investedItems;
        
        if (investedItems.length > 0) {
            this.setSpinner(false);
            ApiRequest.CalucateProjectedROI(investedItems).then((data) => {
                this.setSpinner(true);
                if (data != null) {
                    if (data.status == null) {
                        this.setState({
                            ProjectedROI: data.projectedROI + ' AUD',
                            ProjectedFees: data.projectedFees + ' USD'
                        })
                    }else{
                        if(data.errors != null){
                            alert(JSON.stringify(data.errors))
                        }
                        this.setState({
                            ProjectedROI: 0 + ' AUD',
                            ProjectedFees: 0 + ' USD'
                        })
                    }
                }
            })
        }else{
            alert("select Investment options")
        }
    }
    setSpinner(value) {
        this.setState({ Spinner: value })
    }
    render() {
        return (

            <>
                <Spinner animation="border" role="status" hidden={this.state.Spinner} style={{ position: 'absolute', right: '10%', top: '30%' }}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <Card style={{ width: '35rem' }}>
                    <Card.Header>
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Projected ROI</span>
                        <Button variant="primary" style={{ position: 'relative', float: 'right' }} onClick={this.calculate}>calculate</Button>
                    </Card.Header>
                    <Card.Body>
                        <Row className="g-2">
                            <Col md>
                                <Form.Label htmlFor="projectedroi" style={{ fontSize: '16px', fontWeight: 'bold' }}>Projected Return In 1 Year</Form.Label>
                                <Form.Control type="text" id="projectedroi" readOnly value={this.state.ProjectedROI} />
                            </Col>
                            <Col md>
                                <Form.Label htmlFor="totalfees" style={{ fontSize: '16px', fontWeight: 'bold' }}>Total Fees</Form.Label>
                                <Form.Control type="text" id="totalfees" readOnly value={this.state.ProjectedFees} />
                            </Col>
                        </Row>
                    </Card.Body>

                </Card>
            </>
        );
    }

}

export default ROITab;