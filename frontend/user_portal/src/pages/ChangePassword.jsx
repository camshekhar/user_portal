import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import Announcement from "../components/home/Announcement";
// import Footer from "../components/home/Footer";
// import Navbar from "../components/home/Navbar";
import {mobile} from "../responsive";
import swal from 'sweetalert';
import { getToken } from '../services/LocalStorageService';
import { useChangeUserPasswordMutation } from '../services/userAuthApi';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWVuJTIwZmFzaGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60")
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
  height: 400px;
  border-radius: 0px 80px 0px 80px;
  background-color: #4ef5c3;
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
  width: 100%;
  padding: 5px;
  margin-top: 10px;
  color: white;
  font-weight: 400;
  cursor: pointer;
  border: none;
  background-color: #042cf5;

  &:hover {
    background-color: #03198a;
  }
`;

const ChangePassword = () => {

    const { access_token } = getToken();
    const [changeUserPassword] = useChangeUserPasswordMutation();
    const navigate = useNavigate();

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
          password: data.get('password'),
          password2: data.get('password2')
        }
        const res = await changeUserPassword({actualData, access_token})
        if (res.error) { 
            // console.log(res.error.data.non_field_errors[0])

            swal("", `${res.error.data.non_field_errors[0]}`, "error");
          }
        if (res.data) {
            document.getElementById("password-change-form").reset();
            navigate('/')
            swal(`${res.data.msg}`, "Your Password has been Changed Successfully.", "success");
            // console.log(res.data)
         }   
    }
  return (
    <>
    {/* <Announcement/> */}
    {/* <Navbar/> */}
      <Container>
        <Wrapper>
          <Title>Change Password</Title>
          <Hr />
          <Form onSubmit={handleUpdate} id="password-change-form">
            <Input type={"password"} placeholder="New Password" name="password" required />
            <Input type={"password"} placeholder="Confirm Password" name="password2" required />
            <Button type="submit">Update Password</Button>
          </Form>
        </Wrapper>
      </Container>
      {/* <Footer/> */}
    </>
  )
}

export default ChangePassword