import React,{ Component } from 'react';
import { Link , Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';


class Login extends Component {

  constructor() {
      super() ;
      let token = localStorage.getItem('token') ;
      let loggin = true ;
      if (token == null)
      {
          loggin = false ;
      }
      console.log(loggin) ;

      this.state = {
          email : "" ,
          password : "" ,
          loggin
      }
  }

  handleChange(e)
  {
      this.setState({
          [e.target.id]: e.target.value
      }) ;
  }

  submitForm = (e) =>
  {
      e.preventDefault() ;
      axios({
          method: 'post',
          url: 'http://172.17.0.2:5000/user/login',
          headers: { 'content-type': "application/json",
                     'x-api-key': "eiWee8ep9due4deeshoa8Peichai8Eih" } ,
          data: {
          email:this.state.email,
          password:this.state.password,
          app : 'web'
          }}).then(response => {
          console.log(response);
          let isLogged = response.data.isLogged ;
          console.log(isLogged) ;
          if(isLogged)
          {
             localStorage.setItem('token' , response.data.token) ;
              this.setState({ loggin:true })
          }
          }).catch(error => {
          console.log(error.response)
          });
  }


  render() {
    let isAuthenticated = this.state.loggin ;
    if(isAuthenticated)
    {
      return <Redirect to="/"/> ;
    }else
    return (
      <div class="text-center">
        <Container >
            <Col md="6" >
              <CardGroup>
                <Card>
                  <CardBody>
                    <Form   onSubmit={this.submitForm}>
                      <h2>Sign In</h2>
                      <p className="text-muted">to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" id = "email" value={this.state.email} onChange={this.handleChange.bind(this)} autoComplete="username"  />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" id = "password" value={this.state.password} onChange={this.handleChange.bind(this)} autoComplete="current-password"  />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4" >Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
        </Container>
      </div>
    );
  }
}

export default Login;
