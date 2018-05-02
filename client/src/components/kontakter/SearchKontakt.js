import Search from './Search'
//import Search from 'react-search'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import React, { Component } from 'react'
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import {Grid} from "material-ui";
import {green} from 'material-ui/colors';

const buttonstyle = {
        margin: 1,
        color: '#fff',
        backgroundColor: green[500],
        textDecoration: 'none',
        textTransform: 'none',

};
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
    		  	<Search items={items}
                    placeholder='..Søk etter navn '
                    maxSelected={3}
                    multiple={true}
                    onItemsChanged={this.SelectedItems.bind(this)} />
				<Grid container style={{ lineHeight: '5px' }} spacing={24}>
					<Grid item xs={12} sm={5}>
					</Grid>
					<Grid item xs={12} sm={7}>
						<a href="/kontakter/kontakter" style={{textDecoration:'none'}}><Button style={buttonstyle}>Avbryt</Button></a>
					</Grid>
				</Grid>
	        </div>
    )

  }

}
export default (SearchKontakt)
