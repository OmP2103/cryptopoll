import Head from "next/head";
import styled from "styled-components";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from 'react';
import { listContract, omsContract } from '@/CONSTANTS';
import listABI from '@/listABI.json';
import contractABI from '@/contractABI.json';
import { ethers } from 'ethers';
import { useSigner } from '@thirdweb-dev/react';

export default function Home() {
    const [selectedOptions, setSelectedOptions] = useState({ pollIndex: undefined, optionIndex: undefined });
    const [polls, setPolls] = useState([]);
    const [error, setError] = useState('');
    const [voteTokens, setVoteTokens] = useState(0); // State to store user's vote tokens
    const signer = useSigner(); // Access Ethereum signer object

    useEffect(() => {
        async function fetchData() {
            try {
                if (!signer) {
                    console.error("Signer not available");
                    return;
                }
                const contract = new ethers.Contract(listContract, listABI, signer);
                const fetchedPolls = await contract.getPolls();

                // Convert BigNumber to regular numbers
                const formattedPolls = fetchedPolls.map(poll => ({
                    ...poll,
                    options: poll.options.map(option => ({
                        ...option,
                        votes: option.votes.toNumber() // Convert BigNumber to number
                    }))
                }));

                setPolls(formattedPolls);

                // Fetch user's vote tokens
                const oms = new ethers.Contract(omsContract, contractABI, signer);
                const userVoteTokens = await oms.getVoteTokens();
                setVoteTokens(userVoteTokens.toNumber()); // Convert BigNumber to number
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching data. Please try again later.");
            }
        }

        fetchData();
    }, [signer]); // Include signer in the dependency array

    const handleOptionClick = (pollIndex, optionIndex) => {
        setSelectedOptions({ pollIndex, optionIndex });
    };

    const handleVote = async () => {
        try {
            if (!signer) {
                console.error("Signer not available");
                return;
            }

            const contract = new ethers.Contract(listContract, listABI, signer);
            const { pollIndex, optionIndex } = selectedOptions;

            if (pollIndex !== undefined && optionIndex !== undefined) {
                // Get user's vote tokens
                const oms = new ethers.Contract(omsContract, contractABI, signer);
                const voteTokens = await oms.getVoteTokens();

                if (voteTokens > 0) {
                    await contract.voteForOption(pollIndex, optionIndex);
                    // Decrement vote tokens by 1
                    await oms.decrementVoteTokens();
                    // Refresh polls data after voting
                    fetchData();
                } else {
                    setError("You don't have enough vote tokens to vote");
                }
            } else {
                setError("No option selected");
            }
        } catch (error) {
            console.error("Error voting:", error);
        }
    };

    return (
        <>
            <Head>
                <title>Crypto Poll</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Navbar />
                <Container>
                    <OngoingPollsTitle>Ongoing Polls</OngoingPollsTitle>
                    <div>
                        <div style={{ color: 'white' }}>Your Vote Tokens: {voteTokens}</div>
                    </div>
                    <PollsContainer>
                        {polls.map((poll, pollIndex) => (
                            <PollCard key={pollIndex}>
                                <PollQuestion>{poll.question}</PollQuestion>
                                {poll.options.map((option, optionIndex) => (
                                    <PollOption
                                        key={optionIndex}
                                        onClick={() => handleOptionClick(pollIndex, optionIndex)}
                                        selected={selectedOptions.pollIndex === pollIndex && selectedOptions.optionIndex === optionIndex}
                                    >
                                        <PollOptionText>{option.name}</PollOptionText>
                                        <PollOptionText>{option.votes} Votes</PollOptionText>
                                    </PollOption>
                                ))}
                                <VoteButton onClick={handleVote}>Vote</VoteButton>
                            </PollCard>
                        ))}
                    </PollsContainer>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </Container>
            </main>
        </>
    );
}

const Container = styled.div`
    width: 100%;
    height: 84.3vh;
    background: linear-gradient(90deg, rgba(19,19,19,1) 49%, rgba(60,62,62,1) 64%, rgba(62,62,71,1) 100%);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PollsContainer = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Display 3 polls per row */
    grid-gap: 40px;
`;

const PollCard = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PollQuestion = styled.h3`
    margin-bottom: 10px;
`;

const PollOption = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;
    background-color: ${({ selected }) => (selected ? "lightblue" : "inherit")};
`;

const PollOptionText = styled.span``;

const VoteButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
`;

const OngoingPollsTitle = styled.h2`
    color: white;
`;

const ErrorMessage = styled.div`
    color: red;
    margin-top: 10px;
`;