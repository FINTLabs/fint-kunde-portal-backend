import Search from './Search'
//import Search from 'react-search'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import React, { Component } from 'react'
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class SearchKontakt extends Component {
	constructor(props) {
	    super(props);
	    this.state = {kontakter: this.props.kontakter};
	}
	
  SelectedItems(items) {

  }
 
  render () {
	    let items = []
		{this.props.kontakter.map((kontakt, i) => 
			items[i] = {id: i, value: kontakt.firstName+" "+kontakt.lastName, nin:kontakt.dn}
		)}	    
    return (
    	<div>	
    	<Table>
        <TableBody>
        	<TableRow displayBorder={false}>
          		  	<TableCell>
	          		  	<Search items={items}
		                    placeholder='..Søk etter navn '
		                    maxSelected={3}
		                    multiple={true}
		                    onItemsChanged={this.SelectedItems.bind(this)} />
                    </TableCell>
	          		  	</TableRow>
	          	        </TableBody>
	          	      </Table>
  		  			<a href="/kontakter/kontakter" style={{textDecoration:'none'}}><Button variant="raised" size="large" color="primary" style={{textTransform: 'none'}}>Avbryt</Button></a>


    	</div>

    )

  }

}
export default (SearchKontakt)
