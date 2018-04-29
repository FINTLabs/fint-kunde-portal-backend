import Search from './Search'
//import Search from 'react-search'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import React, { Component } from 'react'

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
	                placeholder='-- skriv kontaktens navn (eller klikk for å velge fra liste)'
	                maxSelected={3}
	                multiple={true}
	                onItemsChanged={this.SelectedItems.bind(this)} />
    	</div>

    )

  }

}
export default (SearchKontakt)
