import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {mobile} from "../responsive";
import { storeToken } from "../services/LocalStorageService";
import { useRegisterUserMutation } from "../services/userAuthApi";
import swal from "sweetalert";


const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80")
      center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
`;
const Wrapper = styled.div`
  margin: 10px 10px;
  padding: 20px;
  width: 500px;
  height: 580px;
  border-radius: 0px 90px 0px 90px;
  background-color: #72f805;
  opacity: 0.8;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  ${mobile({width: "90vw"})}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: black;
`;

const Hr = styled.hr`
  margin: 0 0 10px 0;
  width: 100%;
  border: 1px solid gray;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
  font-size: 0.8rem;
  border: none;

  &:hover {
    border: 2px solid #012727;
  }
`;
const Agreement = styled.p`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5px;
  background-color: white;
  color: white;
  font-weight: 400;
  cursor: pointer;
  border: none;
  background-color: #012727;


  &:hover {
    background-color: teal;
    color: white;
    font-weight: 600;
  }
`;
const Login = styled.span`
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
`;
const ErrAlert = styled.h6`
  padding: 0;
  color: red;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
`;

const Register = () => {
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const [registerUser, ] = useRegisterUserMutation()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      fname: data.get('fname'),
      lname: data.get('lname'),
      email: data.get('email'),
      password: data.get('password'),
      password2: data.get('password2'),
    }
   
    const res = await registerUser(actualData)
  
    if (res.error) {
      // console.log((res.error.data))
      setServerError(res.error.data)
      // document.getElementById('registration-form').reset()
      
      if (server_error.non_field_errors) {
        swal(" ",`${server_error.non_field_errors[0]}`, "error");
        // console.log(server_error.non_field_errors[0])
      }
      else if (server_error.email) {
        swal(" ",`${server_error.email[0]}`, "error");
        // console.log(server_error.email)

        
      } else {
          swal(" ",`${server_error.username[0]}`, "error")
          // console.log(server_error.username[0])

        }

    }
    if (res.data) {
      storeToken(res.data.token)
      navigate('/login')
      swal(`${res.data.msg}`, "Enjoy Shopping", "success");
      document.getElementById('registration-form').reset()
      // console.log(res.data)
    }
  }
  return (
    <>
    {/* <Announcement/> */}
      {/* <Navbar/> */}
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Hr />
          <Form id="registration-form" onSubmit={handleSubmit}>
            {/* {server_error.fname ? <ErrAlert>{server_error.fname[0]}</ErrAlert> : " "} */}
            <Input placeholder="First Name" name="fname" id="fname" required />
            <Input placeholder="Last Name" name="lname" id="lname" required/>
            {/* <Input placeholder="Username" name="username" id="username" required/> */}
            <Input type={"email"} placeholder="Email" name="email" id="email" required/>
            <Input type={"password"} placeholder="Password" name="password" id="password" required/>
            <Input type={"password"} placeholder="Confirm Password" name="password2" id="password2" required/>
            <Agreement>
              By creating an account, I consent to the processing of my personal
              detail in accordance with the <b>PRIVACY POLICY</b>.
            </Agreement>
            <Button type="submit">CREATE ACCOUNT</Button>
            <Login>
              Already Registered? <Link to="/login" style={{color: "#03033f", fontWeight: "bold"}}>Login Here</Link>.
            </Login>
            {server_error.fname ? <ErrAlert>***{server_error.fname[0]}</ErrAlert> : " "}
            {server_error.email ? <ErrAlert>***{server_error.email[0]}</ErrAlert> : " "}
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
