import React, { Component } from 'react';
import {  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';
import { Link , Redirect ,withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import sygnet from '../../assets/img/brand/favicon.png'
import logo from '../../assets/img/brand/logo@240.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};
class DefaultHeader extends Component {
  constructor() {
      super() ;
      let token = false ;
      if(localStorage.getItem('token')){
         token = localStorage.getItem('token') ;
      }
      this.state = {
        confusionMatrix:"",
        token

      }
    }

logout(){
  let token = this.state.token ;
//  alert(token);
  axios({
      method: 'post',
      url: 'http://172.17.0.2:5000/user/logOut',
      headers: { 'content-type': "application/json",
                 'x-api-key': "eiWee8ep9due4deeshoa8Peichai8Eih",
                  'x-access-token': token }
      }).then(response => {
        localStorage.removeItem("token");
        token="";
        this.setState({token});
        window.location.reload();
      }).catch(error => {
      console.log(error.response)
      });
}
updateProfile(){
  window.location.href = "http://localhost:3000/#/profile";
}

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: ' Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: ' Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
    <Nav className="ml-auto" navbar>
      <UncontrolledDropdown nav direction="down">
        <DropdownToggle nav>
        <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="Profile" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
          <DropdownItem onClick={this.updateProfile.bind(this)}><i className="fa fa-user" ></i> Profile</DropdownItem>
          <DropdownItem onClick={this.logout.bind(this)}><i className="fa fa-lock"></i> Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
