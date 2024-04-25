import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import styled from 'styled-components';
import { useSigner } from '@thirdweb-dev/react';
import { listContract } from '@/CONSTANTS';
import listABI from '@/listABI.json';
import { ethers } from 'ethers';
const Menu = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const signer = useSigner();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const createPoll = async () => {
    try {
      if (!signer) {
        console.error('Signer not available');
        return;
      }
      const contract = new ethers.Contract(listContract, listABI, signer);
      const filteredOptions = options.filter(option => option.trim() !== '');
      const tx = await contract.createPoll(question, filteredOptions);
      await tx.wait();

      console.log("Poll created successfully!");
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container>
        <TextBoxWrapper>
          <Label>What is your question?</Label>
          <TextBox
            value={question}
            onChange={handleQuestionChange}
            placeholder="Enter your question here"
            rows="4"
          />
        </TextBoxWrapper>
        {options.map((option, index) => (
          <TextBoxWrapper key={index}>
            <Label>Option {index + 1}</Label>
            <TextBox
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </TextBoxWrapper>
        ))}
        <Button onClick={createPoll}>Create Poll</Button>
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  height: 84.3vh;
  background: linear-gradient(90deg, rgba(19,19,19,1) 49%, rgba(60,62,62,1) 64%, rgba(62,62,71,1) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextBoxWrapper = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.div`
  color: white;
  font-size: 1.5vw;
  margin-bottom: 5px;
`;

const TextBox = styled.textarea`
  width: 100%;
  padding: 5px;
  font-size: 1.5vw;
  border: 1px solid gainsboro;
  border-radius: 5px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: cyan;
  border: none;
  color: white;
  font-size: 1.5vw;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 5px;

  &:hover {
    background-color: lightcyan;
  }
`;

export default Menu;
