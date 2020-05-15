import React, { Component } from 'react';
import {  Redirect } from 'react-router-dom';
import { Button,CardHeader,Badge, Card, CardBody, Col,Modal, ModalBody, ModalFooter, ModalHeader, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import axios from 'axios';
import $ from 'jquery';


class CrudAdmin extends Component {
  constructor() {
      super() ;
      let token = false ;
      if(localStorage.getItem('token')){
         token = localStorage.getItem('token') ;
      }
      this.state = {
        currentPage:1,
        Page:[],
        size:0,
          info:false,
          primary: false,
          modal: false,
          success: false,
          redirect:false,
          clicked:false,
          emailAdmin:"",
          firstName:"",
          lastName:"",
          email:"",
          password:"",
          gender:"male",
          phoneNumber:"",
          dateOfBirth:"",
          governorate:"",
          delegation:"",
          city:"",
          zipCode :"",
          citys : [],
          Govs: [],
          delegs: [],
          persons: [],
          admin:"",
          token
      }
      this.toggle = this.toggle.bind(this);
      this.toggleSuccess = this.toggleSuccess.bind(this);
      this.toggleSignup = this.toggleSignup.bind(this);
      this.toggleInfo = this.toggleInfo.bind(this);
    }

    toggle() {
    this.setState({
      modal: !this.state.modal,
    });
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
         this.toggleInfo();
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

    submitForm = (e) =>
    {

      e.preventDefault() ;
      let clicked = true ;
      this.setState({ clicked });
      axios.post('http://172.17.0.2:5000/user/signUpWeb', {
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        email:this.state.email,
        password:this.state.password,
        gender:this.state.gender,
        phoneNumber:this.state.phoneNumber,
        dateOfBirth:this.state.dateOfBirth,
        role:"admin" }, {
             headers: {
               'content-type': "application/json",
              'x-api-key': "eiWee8ep9due4deeshoa8Peichai8Eih"
             }
     })
     .then(response => {
       console.log(response);
       let check = response.data.check ;
       if(check){
         alert(response.data.msg);
         this.toggleSuccess();
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

    handleChange(e)
    {
        this.setState({
            [e.target.id]: e.target.value
        }) ;
    }



deleteAdmin(value)  {
 axios({
         method: 'put',
         url: 'http://172.17.0.2:5000/user/delete',
         data:{
           email:value
         },
         headers: { 'content-type': "application/json",
                    'x-api-key': "eiWee8ep9due4deeshoa8Peichai8Eih",
                     'x-access-token':this.state.token } })
.then(response => {
 //console.log(response);
 $(document).ready(function() {
      $('#page').load('#page');
  });
})
.catch(error => {
    console.log(error.response)
});
}
onChangepage(currentPage){
  let page = this.state.persons[currentPage];
  if(page!=null){
  this.setState({Page:page});
}

}
onChangepreviouspage= (e) =>{
  let page = this.state.currentPage;
  let previous = page -1 ;
  let array = previous -1;
  if(previous > 0){
    this.setState({currentPage:previous})
    this.onChangepage(array);
  }
}
onChangeNextpage= (e) =>{
  let page = this.state.currentPage;
  let next = page +1 ;
  let array = next -1;
  if(next<= this.state.size){
    this.setState({currentPage:next})
    this.onChangepage(array);
  }
}
componentDidMount(){
 axios({
        method: 'get',
        url: 'http://172.17.0.2:5000/admin',
        headers: { 'content-type': "application/json",
                   'x-api-key': "eiWee8ep9due4deeshoa8Peichai8Eih",
                    'x-access-token':this.state.token} })
  .then(resp => {
    let  persons=[];
    let  point=[];
     let x=resp.data.length;
     let size=(x/10)|0;
     let y=x%10;
     if(y!=0){
       size=size+1;
     }
     this.setState({size:size});
     for (let i = 1; i <= size; i++) {
       let d=(i-1)*10;
       let f=i*10;
       if (f>x){
         f=x;
       }
       for (let j =d; j <f;  j++) {
         //  console.log(j);
             point.push(resp.data[j]);

     }
     persons.push(point);
    point=[];
    }
    this.setState({persons:persons});
    this.onChangepage(0);
}).catch(error => {
    console.log(error.response)
});
}

toggleSuccess() {
  this.setState({
    success: !this.state.success,
  });
}
toggleSignup() {
  this.setState({ email:""});
  this.setState({ firstName:""});
  this.setState({ lastName:"" });
  this.setState({ phoneNumber:"" });
  this.setState({ dateOfBirth:"" });
  this.setState({ success: !this.state.success});

}
editAdmin(value) {
  axios.post('http://172.17.0.2:5000/user', {
  email:value }, {
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
     this.setState({ city:persons.street });
     if(persons.gender)
     this.setState({ gender:"male" });
     else
     this.setState({ gender:"female" });


     //this.setState({ persons });
    //console.log(resp.data.delegation);
 }).catch(error => {
     console.log(error.response)
 });
  this.setState({
    info: !this.state.info ,
  });
}

toggleInfo() {
  this.setState({
    info: !this.state.info  ,
  });
}



  render() {
    let isAuthenticated = this.state.token ;
    if(isAuthenticated === false)
    {
      return <Redirect to="/login"/> ;
    }else
    return (
        <div id="page"  className="animated fadeIn">

      <Col xs="12" >
  <Card>
  <CardHeader>
            <i className="fa fa-align-justify"></i><strong> List Admin </strong>
            <div className="card-header-actions">
            <Button color="success" onClick={this.toggleSignup} className="mr-1">Add Admin</Button>
            </div>
    </CardHeader>
    <CardBody>
      <Table responsive striped >
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name </th>
          <th>Email </th>
          <th>Phone Number</th>
          <th>Date Of Birth</th>
          <th>Gender</th>
          <th>Role</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        { this.state.Page.map(person =>
         <tr>
         <td>{person.firstName}</td>
         <td>{person.lastName}</td>
         <td>{person.email}</td>
         <td>{person.phoneNumber}</td>
         <td>{person.dateOfBirth}</td>
         <td>{person.gender ? <i class="icon-user icons font-2xl d-block "></i> : <i class="icon-user-female icons font-2xl d-block"></i>}</td>
         <td>{person.role}</td>
         <td>{person.isLogged ? <Badge color="success">Active</Badge> : <Badge color="secondary">Inactive</Badge>}</td>
         <td>
         <Button color="info" id="btnedit" value={person.idUser} onClick={this.editAdmin.bind(this,person.email)} ><i className="fa fa-pencil fa-lg "></i></Button>
         </td>
         <td>
         <Button color="danger" id="btndelete" value={person.idUser} onClick={this.deleteAdmin.bind(this,person.email)}><i className="fa fa-remove fa-lg "></i></Button>
         </td>
         </tr>)}

        </tbody>
      </Table>
      <Pagination>
        <PaginationItem ><PaginationLink previous tag="button" onClick={this.onChangepreviouspage.bind()} >Prev</PaginationLink></PaginationItem>
        <PaginationItem active>
          <PaginationLink tag="button">{this.state.currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem >
        <PaginationLink next tag="button" onClick={this.onChangeNextpage.bind()}>Next</PaginationLink></PaginationItem>
      </Pagination>
    </CardBody>
  </Card>
</Col>
                <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                       className={'modal-success ' + this.props.className}>
                  <ModalHeader toggle={this.toggleSuccess}>Sign Up</ModalHeader>
                  <Form onSubmit={this.submitForm}>
                  <ModalBody>
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
                      <Input type="email" placeholder="Email" autoComplete="email" id="email" value={this.state.email} onChange={this.handleChange.bind(this)} required />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Password</InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" id="password" value={this.state.password} onChange={this.handleChange.bind(this)} required />
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
                        <Input type="date" id="dateOfBirth" name="dateOfBirth" placeholder="date Of Birth" id="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleChange.bind(this)} required />
                        </InputGroup>
                  </ModalBody>

                  <ModalFooter>
                    <Button type="submit" color="success" block disabled={this.state.clicked} >Create Account</Button>
                    <Button color="secondary" onClick={this.toggleSuccess}>Cancel</Button>
                  </ModalFooter>
                  </Form>
                </Modal>

              <Modal isOpen={this.state.info} toggle={this.toggleInfo} className='modal-info' >
                <ModalHeader toggle={this.toggleInfo}>Edit Admin</ModalHeader>
              <Form onSubmit={this.submitUpdate}>
                <ModalBody>
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
                    <Input type="email" id="email" value={this.state.email}  />
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

                </ModalBody>
                <ModalFooter>
                  <Button color="primary"  disabled={this.state.clicked} >Update</Button>
                  <Button color="secondary" onClick={this.toggleInfo}>Cancel</Button>
                </ModalFooter>
                </Form>
              </Modal>
</div>
    );
  }
}

export default CrudAdmin;
