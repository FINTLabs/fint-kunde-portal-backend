import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import ReactTooltip from 'react-tooltip';
import Adapters from '../containers/Adapters';

class App extends Component {
    render() {
        return ( 
            <div>
                <div className="header"> 
                    <header className = "app-header-footer" >
                        <div><img src = { logo } className = "app-logo" alt = "logo" /></div>
                    </header >
                </div>
                 <div className="wrapper">
                    <div className="content">
                        <a data-tip data-for='global'><Adapters/></a>
                        <ReactTooltip id='global' aria-haspopup='true' role='example'>
                            <p>Login for more details</p> 
                        </ReactTooltip>
                    </div>
                </div>
                <div className="footer"><footer className = "app-header-footer" > </footer></div>
            </div>
        );
    }
}

export default App; 