import React, { Component } from 'react';
import {  Redirect } from 'react-router-dom';
import { Button,CardHeader,Badge, Card, CardBody, Col,Modal, ModalBody, ModalFooter, ModalHeader, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {Container, Form, Input,Label,FormGroup, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import axios from 'axios';
import $ from 'jquery';


class Dashboard extends Component {
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
          nameArticle:"",
          description:"",
          idArticle:"",
          dateEnd:"",
          file:"",
          chedli:{},
          persons: [],
          Article:"",
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

  submitimage = (e) =>
  {
    // alert(this.state.imageArticle);

      e.preventDefault() ;
      let clicked = true ;
      this.setState({ clicked });
      let data = new FormData();
        data.append('image',this.state.file);
      axios({
    method: 'post',
    url: 'http://172.17.0.2:5000/Article/image',
    data: data,
    headers: {'Content-Type': 'multipart/form-data',
               'x-api-key': "eiWee8ep9due4deeshoa8Peichai8Eih",
               'nameArticle': this.state.nameArticle,
               'description': this.state.description,
               'dateEnd': this.state.dateEnd}
    })
    .then(function (response) {
        //handle success
        let check = response.data.check ;
        if(check){
          alert(response.data.msg);
          //this.toggleSuccess();
          $(document).ready(function() {
               $('#page').load('#page');
           });
        }else{
         alert("not Add Article error !!");
         let clicked = false ;
         this.setState({ clicked });
        }

    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
  }


    handleChange(e)
    {
        this.setState({
            [e.target.id]: e.target.value
        }) ;
    }


deleteArticle(value)  {
 axios({
         method: 'delete',
         url: 'http://172.17.0.2:5000/Article/delete',
         data:{
           idArticle:value
         },
         headers: { 'content-type': "application/json",
                    'x-api-key': "eiWee8ep9due4deeshoa8Peichai8Eih",
                     'x-access-token':this.state.token } })
.then(response => {
 //console.log(response);
 alert(response.data.msg);
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
        url: 'http://172.17.0.2:5000/Article',
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
  this.setState({ success: !this.state.success});

}


toggleInfo() {
  this.setState({
    info: !this.state.info  ,
  });
}
onChange(e){
  let files = e.target.files;
  let reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onload=(e)=>{
  this.setState({file:files[0]})
  //console.warn("img",e.target.result);
  }

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
            <i className="fa fa-align-justify"></i><strong> List Article </strong>
            <div className="card-header-actions">
            <Button color="success" onClick={this.toggleSignup} className="mr-1">Add Article</Button>
            </div>
    </CardHeader>
    <CardBody>
      <Table responsive striped >
        <thead>
        <tr>
          <th> Titre Article</th>
          <th>Description</th>
          <th>Name Image </th>
          <th>Date Created</th>
          <th>Date End Article</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        { this.state.Page.map(person =>
         <tr>
         <td>{person.nameArticle}</td>
         <td>{person.description}</td>
         <td>{person.imageArticle}</td>
         <td>{person.dateCreated}</td>
         <td>{person.dateEnd}</td>
         <td>
         <Button color="danger" id="btndelete" value={person.idArticle} onClick={this.deleteArticle.bind(this,person.idArticle)}><i className="fa fa-remove fa-lg "></i></Button>
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
                  <Form onSubmit={this.submitimage}>
                  <ModalBody>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Titre Article</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Titre Article" id="nameArticle" autoComplete="Titre Article" value={this.state.nameArticle} onChange={this.handleChange.bind(this)} required />
                  </InputGroup>
                  <FormGroup row>
                    <Col md="3">
                      <InputGroupText>Description</InputGroupText>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" id="description" value={this.state.description} onChange={this.handleChange.bind(this)} autoComplete="Description"  required rows="9"
                             placeholder="Description..." />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                    <InputGroupText>Image</InputGroupText>
                    </Col>
                    <Col xs="12" md="9">
                        <Input type="file" id="file" name="file" onChange={(e)=>this.onChange(e)} />
                    </Col>
                  </FormGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>date End Article</InputGroupText>
                    </InputGroupAddon>
                      <Input type="date" id="dateEnd" name="dateEnd" placeholder="date Of Birth" id="dateEnd" value={this.state.dateEnd} onChange={this.handleChange.bind(this)} required />
                  </InputGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button type="submit" color="success" block disabled={this.state.clicked} >Create Article</Button>
                    <Button color="secondary" onClick={this.toggleSuccess}>Cancel</Button>
                  </ModalFooter>
                  </Form>
                </Modal>


</div>
    );
  }
}


export default Dashboard;
