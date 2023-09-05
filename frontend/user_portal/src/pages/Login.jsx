import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setUserToken } from "../features/authSlice";
import {mobile} from "../responsive";
import { getToken, storeToken } from "../services/LocalStorageService";
import { useLoginUserMutation } from "../services/userAuthApi";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  margin: 0 10px;
  padding: 20px;
  width: 450px;
  height: 500px;
  border-radius: 0px 80px 0px 80px;
  background-color: #f8e405;
  opacity: 0.8;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 4px;
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
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  width: 100%;
  margin: 20px 10px 0 0;
  padding: 10px;
  font-size: 0.8rem;
  border: none;

  &:hover {
    border: 2px solid #fc4103;
  }
`;
const Button = styled.button`
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 5px;
  background-color: white;
  color: white;
  font-weight: 400;
  cursor: pointer;
  border: none;
  background-color: #b5350b;

  &:hover {
    background-color: #fc4103;
    color: white;
    font-weight: 600;
  }
`;
const ForgotPassword = styled.span`
  display: flex;
  margin: 5px 0 0 0;
`;
const Register = styled.span`
  margin-top: 5px;
`;
const ErrAlert = styled.span`
  margin: 0;
  padding: 0;
  color: red;
  font-size: 14px;
  font-weight: bold;

`;

const Login = () => {
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password')
    }
    const res = await loginUser(actualData);
    if (res.error) {
      setServerError(res.error.data.errors)
      console.log(server_error.non_field_errors[0])
      swal(" ",`${server_error.non_field_errors[0]}`, "error");
    }
    if (res.data) {
      storeToken(res.data.token);
      let { access_token } = getToken();
      dispatch(setUserToken({ access_token: access_token }))
      navigate('/profile')
      swal(`${res.data.msg}`, "You Logged In Successfully", "success");
      // console.log(res.data)
    }
  }
  
  let { access_token } = getToken()
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }))

  }, [access_token, dispatch])

  return (
    <>
      <Container>
        <Wrapper>
          <Title>LOGIN</Title>
          <Hr />
          <Form onSubmit={handleSubmit}>
            {server_error.non_field_errors ? <ErrAlert>***{server_error.non_field_errors[0]}</ErrAlert> : " "}
            <Input type={"email"} placeholder="Email" name="email" required />
            <Input type={"password"} placeholder="Password" name="password" required />
            <ForgotPassword><Link to="/forgotPassword" style={{color: "#03033f"}}>Forgot Password?</Link></ForgotPassword>.
            <Button type="submit">LOGIN</Button>
            <Register>
              New User? <Link to="/register" style={{color: "#03033f", fontWeight: "bold"}}>Register Here</Link>.
            </Register>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
