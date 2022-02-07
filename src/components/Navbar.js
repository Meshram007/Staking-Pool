import React, {Component} from 'react'
import logo from '../logo.png'
class Navbar extends Component {
    render() {
        return (
            <nav className= 'navbar navbar-dark fixed-top shadow p-0' style={{backgroundColor:'black', height:'60px'}}>
                <a className= 'navbar-band col-sm-3 col-md-2 mr-0' href="#/" 
                style={{color: 'white'}}>
                <img src={logo} width='50' height='30' className='d-inline-block align-top'  alt='logo img'/>
                 &nbsp; Staking Application
                </a>
                <ul className='navbar-nav px-3'> 
                    <li className='text-nowrap d-none nav-item d-sm-none d-sm-block'> 
                        <small style={{color:'white'}} > ACCOUNT NUMBER: {this.props.account}
                        </small>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar 