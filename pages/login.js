/* This is the admin login page. When the user enters the correct email and password it will redirect them to the admin page */
import {React, useRef} from 'react'
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Navbar from "@/components/Navbar";
import { ConnectWallet } from "@thirdweb-dev/react";

const adminLogin = () => {
    return (
        <main>
        <Navbar/>
        <Container>
            <LoginBox>
                <Admin>Connect Wallet:</Admin>
                <ConnectWallet />

            </LoginBox>
        </Container>
        </main>
    )
}

const Container = styled.div`
    width: 100%;
    height: 84.3vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg, rgba(19,19,19,1) 49%, rgba(60,62,62,1) 64%, rgba(62,62,71,1) 100%);
`;

const LoginBox = styled.div`
    margin-bottom: 20vh; 
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    padding: 20px;
    background-color: #ffffff;
`;

const Admin = styled.h1`
    font-size: 20px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #FF7F00;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #87CEEB;
        transform: scale(1.03)
    }
`;

export default adminLogin;
