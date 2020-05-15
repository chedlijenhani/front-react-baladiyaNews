import React, { Component } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import {  Redirect } from 'react-router-dom';
import $ from 'jquery';
import {
  CardFooter,
  FormGroup,
  FormText,
  FormFeedback,
  InputGroupButtonDropdown,
  Label,
} from 'reactstrap';
import { Button,CardHeader,Badge, Card, CardBody, Col,Modal, ModalBody, ModalFooter, ModalHeader, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';


class Profile extends Component {
  constructor() {
      super() ;
      let token = false ;
      if(localStorage.getItem('token')){
         token = localStorage.getItem('token') ;
      }
      this.state =
      {   file:"",
          password1:"",
          password2:"",
          password3:"",
          clicked:false,
          firstName:"",
          lastName:"",
          email:"",
          gender:"male",
          phoneNumber:"",
          dateOfBirth:"",
          token

      }
    }
    handleChange(e)
    {
        this.setState({
            [e.target.id]: e.target.value
        }) ;
    }
    updatePassword=(e) =>{
      e.preventDefault() ;
    let password1=  this.state.password1;
    let password2=  this.state.password2;
    let password3=  this.state.password3;
    if(password2==password3)
    {
      axios.put('http://172.17.0.2:5000/user/updatePassword',{
        oldPassword:password1,
      newPassword:password2
              },{
              headers: { 'content-type': "application/json",
             'x-api-key': "eiWee8ep9due4deeshoa8Peichai8Eih",
             'x-access-token':this.state.token }}
      ).then(response => {
       console.log(response);
       let check = response.data.isUpdated ;
       if(check){
         alert(response.data.msg);
         $(document).ready(function() {
              $('#page').load('#page');
          });
       }else{
        alert(response.data.msg);
        let clicked = false ;
        this.setState({ clicked });
       }

      })
      .catch(error => {
         console.log(error.response)
      });
}else{
  alert("Confirmer password invalide");
}
    }
    submitUpdate=(e) =>{
    //  alert(this.state.email);
      e.preventDefault() ;
      let clicked = true ;
      this.setState({ clicked });
      axios.post('http://172.17.0.2:5000/user/updateClient',{
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                email:this.state.email,
                gender:this.state.gender,
                phoneNumber:this.state.phoneNumber,
                dateOfBirth:this.state.dateOfBirth,
              },{
              headers: { 'content-type': "application/json",
             'x-api-key': "eiWee8ep9due4deeshoa8Peichai8Eih",
             'x-access-token':this.state.token }}
      ).then(response => {
       console.log(response);
       let check = response.data.isUpdated ;
       if(check){
         alert(response.data.msg);
         $(document).ready(function() {
              $('#page').load('#page');
          });
       }else{
        alert(response.data.msg);
        let clicked = false ;
        this.setState({ clicked });
       }

     })
     .catch(error => {
         console.log(error.response)
     });


    }


componentDidMount(){

  axios.post('http://172.17.0.2:5000/user',{
    email:""
  }, {
         headers: {
           'content-type': "application/json",
                      'x-api-key': "eiWee8ep9due4deeshoa8Peichai8Eih",
                       'x-access-token':this.state.token
         }
  }) .then(resp => {
     const persons = resp.data;
     this.setState({ email:persons.email });
     this.setState({ firstName:persons.firstName });
     this.setState({ lastName:persons.lastName });
     this.setState({ phoneNumber:persons.phoneNumber });
     this.setState({ dateOfBirth:persons.dateOfBirth });
     if(persons.gender)
     this.setState({ gender:"male" });
     else
     this.setState({ gender:"female" });


     //this.setState({ persons });
    console.log(resp.data);
  }).catch(error => {
     console.log(error.response)
  });


}


  render() {
    let isAuthenticated = this.state.token ;
    if(isAuthenticated === false)
    {
      return <Redirect to="/login"/> ;
    }else
    return (

      <div className="content">
          <Row>
            <Col md={8}>

              <Card>
              <div id="page">
                <CardHeader>
                  <strong>Update Account</strong>
                </CardHeader>
                <Form onSubmit={this.submitUpdate}>
                <CardBody >
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>FirstName</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="First Name" id="firstName" autoComplete="FirstName" value={this.state.firstName} onChange={this.handleChange.bind(this)} required />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Last Name</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="LastName" autoComplete="LastName" id="lastName" value={this.state.lastName} onChange={this.handleChange.bind(this)} required />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Email</InputGroupText>
                    </InputGroupAddon>
                    <Input type="email" id="email" value={this.state.email} placeholder="Email" />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Gender</InputGroupText>
                    </InputGroupAddon>
                    <Input type="select" placeholder="Gender" autoComplete="Gender" id="gender" value={this.state.gender} onChange={this.handleChange.bind(this)}  required >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    </Input>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Phone Number</InputGroupText>
                    </InputGroupAddon>
                    <Input type="number" placeholder="Phone Number" autoComplete="Phone Number" id="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange.bind(this)} required />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>dateOfBirth</InputGroupText>
                    </InputGroupAddon>
                      <Input type="text" id="dateOfBirth" name="dateOfBirth" placeholder="date Of Birth" id="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleChange.bind(this)} required />
                  </InputGroup>
                </CardBody>
                <CardFooter>
                <Button color="primary"  disabled={this.state.clicked} >Submit</Button>
                </CardFooter>
                </Form>
                </div>
              </Card>
            </Col>
            <Col md={4} >
              <Form onSubmit={this.updatePassword}>
            <Card>
              <CardHeader>
                Update password
              </CardHeader>
              <CardBody>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Actuel Password</InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="password1" name="password1" value={this.state.password1} onChange={this.handleChange.bind(this)} autoComplete="current-password" required />
                      <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Nouveau Password</InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="password2" name="password2" value={this.state.password2} onChange={this.handleChange.bind(this)} autoComplete="current-password" required />
                      <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Confirmer Password</InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="password3" name="password3" value={this.state.password3} onChange={this.handleChange.bind(this)} autoComplete="current-password" required />
                      <InputGroupAddon addonType="append">
                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="form-actions">
                    <Button color="primary"  disabled={this.state.clicked} >Submit</Button>
                </FormGroup>
              </CardBody>
            </Card>
            </Form>
            </Col>
          </Row>
      </div>


    );
  }
}

export default Profile;
