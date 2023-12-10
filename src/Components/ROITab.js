import React from 'react';
import { Button,Card,Form,Row,Col } from 'react-bootstrap';
import { ApiRequest } from '../Service/Service';

class ROITab extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            ProjectedROI:"0 AUD",
            ProjectedFees:"0 AUD"
        }
        this.calculate = this.calculate.bind(this)
    }
    calculate(){
        const invests = this.props.applicationState.investedItems;
        console.log(invests);
        let roi = 0,fees= 0;
            this.setState({ProjectedROI : roi + " "+ "AUD",ProjectedFees : (fees + 250)+ " "+ "AUD"})
            ApiRequest.CalucateProjectedROI(this.props.applicationState.investedItems).then((data)=>{
                console.log(data);
                this.setState({ 
                    ProjectedROI:data.projectedROI + ' AUD',
                     ProjectedFees:data.projectedFees + ' USD'
                    })
            })

        }
    render() {
        return (
            <>
             <Button variant="outline-primary" style={{position:'relative',float:'right'}} onClick={this.calculate}>calculate</Button>
            <Card style={{ width: '35rem' }}>
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