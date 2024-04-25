import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/Navbar';
import { useStorage, useSigner } from '@thirdweb-dev/react';
import { ethers } from 'ethers'; // Import ethers library
import { omsContract } from '@/CONSTANTS';
import contractABI from '@/contractABI.json';

const BuyPage = () => {
  const [amount, setAmount] = useState('');
  const signer = useSigner();

  const handleBuyClick = async () => {
    try {
      // Check if signer is available
      if (!signer) {
        console.error('Signer not available');
        return;
      }

      // Get contract instance
      const contract = new ethers.Contract(omsContract, contractABI, signer);

      
      // Execute buyTokens function
      const tx = await contract.buyTokens(amount,{value: amount*3000000});
      await tx.wait();

      // Reset amount after successful purchase
      setAmount('');
    } catch (error) {
      console.error('Error buying tokens:', error);
    }
  };

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <main>
      <Navbar/>
      <Container>
        <ContentBox>
          <Title>Buy Coins</Title>
          <InputBox>
            <InputLabel>Amount:</InputLabel>
            <InputField type="number" value={amount} onChange={handleInputChange} />
          </InputBox>
          <BuyButton onClick={handleBuyClick}>Buy</BuyButton>
        </ContentBox>
      </Container>
    </main>
  );
};

// Styled components remain unchanged

const Container = styled.div`
  width: 100%;
  height: 84.3vh;
  display: flex;
  justify-content: center;
  align-items: flex-start; 
  background: linear-gradient(90deg, rgba(19,19,19,1) 49%, rgba(60,62,62,1) 64%, rgba(62,62,71,1) 100%);
  color: white;
`;

const ContentBox = styled.div`
  width: 300px;
  padding: 20px;
  margin-top: 20vh; 
  border-radius: 8px;
  background-color: #000000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-size: 18px;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const BuyButton = styled.button`
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
    transform: scale(1.03);
  }
`;
export default BuyPage;
