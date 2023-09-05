import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

`
const RegisterBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: blue;
    border: none;
    height: 200px;
    width: 300px;
    font-size: 1.5rem;
    border-radius: 1rem;
    cursor: pointer;
    text-decoration: none;

`
const LoginBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: green;
    border: none;
    height: 200px;
    width: 300px;
    font-size: 1.5rem;
    border-radius: 1rem;
    cursor: pointer;
   

`
const Home = () => {
  return (
    <>
      <Container>
        <Link to="/register" style={{textDecoration: "none"}}><RegisterBtn>Register User</RegisterBtn></Link>
        <Link to="/login" style={{textDecoration: "none"}}><LoginBtn>Login User</LoginBtn></Link>
      </Container>
    </>
  );
};

export default Home;
