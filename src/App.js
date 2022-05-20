import React, { Component } from 'react';
import {Table, Button} from  'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown , faThumbsUp , faImage , faMoneyCheckAlt, faSearchDollar } from '@fortawesome/free-solid-svg-icons'

class App extends Component {

    state = { 
        isLoading :false,
        invoices :  []
     }

    remove(id){
        console.log(id);
        let updateedInvoices = [...this.state.invoices].filter (i => i.Id !== id)

        this.setState({invoices : updateedInvoices});
    }


    async componentDidMount() {
        const response = await fetch(
          "https://bpvm2g9ut4.execute-api.us-east-1.amazonaws.com/DEV/", 
	  {
           headers: new Headers({'Authorization': 'allow'})    
        }    
        );
        const body = await response.json();
        this.setState({ invoices: body, isLoading: false });
    }
    
      

    render() { 

        const isLoading = this.state.isLoading;
        const allinvoices = this.state.invoices;



        if (isLoading)
            return(<div>Loading...</div>);


        let invoices = 
        allinvoices.map( invoice => 
            <tr key={invoice.Id}>
                <td>{invoice.Vendor}</td>
                <td>{invoice.Invoice}</td>
                <td>{invoice.Date}</td>
                <td><Button className="btn btn-lg btn-success" onClick={ () => this.remove(invoice.Id)} > <FontAwesomeIcon icon={faThumbsUp} /> Edit </Button></td>
                <td><Button className="btn btn-lg btn-danger" onClick={ () => this.remove(invoice.Id)} > <FontAwesomeIcon icon={faThumbsDown} /> Delete </Button></td>
                <td><Button className="btn btn-lg btn-info" onClick={ () => this.remove(invoice.Id)} > <FontAwesomeIcon icon={faImage} /> Image </Button></td>
            </tr>
        )

        return (
            
            <div className="container border border-secondary rouded center">

                <div className="row">
                        <div className="col-12">
                            <h4>Employee List</h4>
                        </div>
                </div>

                <div className="row">
                        <div className=".col-xs-12 center text-center">
                            <Table dark responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th >Employee Name</th>
                                        <th>Employee#</th>
                                        <th>Hiring Date</th>
                                        <th colSpan="2">Actions</th>
                                        <th>Employee Pic</th>
                                    </tr>
                                </thead>
                            
                            <tbody>                                
                                {this.state.invoices.length === 0 ? <td colSpan="9">All caught up!</td> : invoices}
                            </tbody>
                            </Table>

                        </div>

                </div>
                <div className="row">
                        <div className="col-2">
                        <Button className="btn btn-lg btn-info">Call Lambda 1</Button>
                        </div>
                        <div className="col-2">
                        <Button className="btn btn-lg btn-info">Call Lambda 2</Button>                     
                        </div>
                </div>


            </div>

        );
    }
}
 
export default App;