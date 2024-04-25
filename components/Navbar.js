import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
const Navbar = () => {
    const navigate = useRouter();
    function goHome(){
        navigate.push("/");
    }
    function goToBuy(){
        navigate.push("/buy");
    }
    function goToPoll(){
        navigate.push("/poll");
    }
    function goToLogin(){
        navigate.push("/login");
    }
  return (
    <Container>
        <LogoBox>
            Crypto Poll
        </LogoBox>
        <NavigationButtonHolder>
            <NavigationElement onClick={goHome}>
                Home
            </NavigationElement>
            <NavigationElement onClick={goToPoll}>
                Create Poll
            </NavigationElement>
            <NavigationElement onClick={goToBuy}>
                Buy Vote Tokens
            </NavigationElement>
            <NavigationElement onClick={goToLogin}>
                Connect Wallet
            </NavigationElement>
        </NavigationButtonHolder>
    </Container>
  )
}
const Container = styled.div`
    width: 88vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 2vw;
    padding-bottom: 2vw;
    background-color: gainsboro;
    padding-left: 6vw;
    padding-right: 6vw;
    background: linear-gradient(90deg, rgba(19,19,19,1) 49%, rgba(60,62,62,1) 64%, rgba(62,62,71,1) 100%);

`

const LogoBox = styled.div`
    font-size: 4vw;
    font-weight: bold;
    color: white;
`

const NavigationButtonHolder = styled.div`
    display: flex;
    align-items: center;
    gap: 3vw;   
`

const NavigationElement = styled.button`
    padding: .8vw;
    background-color: gainsboro;
    border: none;
    font-size: 1.5vw;
    cursor: pointer;
    transition: 0.3s ease all;
    border-radius: 0.5vw;

    &:hover{
        background-color: cyan;
    }
`
export default Navbar
