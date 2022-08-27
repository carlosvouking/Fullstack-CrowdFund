import React, { useContext, useRef, useEffect, useCallback } from "react";
import {useSpring, animated} from "react-spring";
import styled from "styled-components";
import {MdClose, MdCancel } from "react-icons/md";
import {AiOutlineClose, AiOutlineCloseSquare} from "react-icons/ai";

import { shortenAddress } from "../../utils/shortenAddress";
import { FundMeContext } from "../../context/FundMeContext";
import { ethers } from "ethers";
import { contractAddress } from "../../utils/constants";






const Background = styled.div`
     width: 100%;
     height: 100%;
     background: grey;
     position: fixed;
     display: flex;
     justify-content: center;
     align-items: center;  
`

const ModalWrapper = styled.div`
    width: 300px;
    height: 100px;
    box-shadow: 0 5px 16 px rgba(0,0,0, 0.2);
    background: #fef3c7;    --tilwindcss
    color: black;
    display: grid;   
    position: relative;
    z-index;
    border-radius: 15px;
`


const ModalImg = styled.img`
   width: 100px;
   height: 32px;
   border-radius: 10px 0 0 10px;
   background: #000;   
`

const ModalContent = styled.div`
   display: flex; 
   flex-direction: column;
   justify-content: center;
   align-items: center;
   line-height: 1.6;
   font-size: 19px;
   
   p {
     margin-bottom: 1rem;
   }

   button {
     padding: 2px 15px;
     background: #78350f;
     color: #d4d4d4;
     border: none;
     border-radius: 20px;
   }
`;


const CloseModalButton = styled(MdCancel)`
   cursor: pointer;
   position: absolute;
   top: 3px;
   right: 3px;
   width: 28px;
   height: 28px;
   padding: 0;
   z-index: 10;
   color: #7c2d12;
`


const Modal_balance = ({showModal, setShowModal}) => {
    const {currentAccount, timestamp, formDataFund, getContractBalance} = useContext(FundMeContext);   // calling these entities from FundMeContext provider   
    const {addressToFund, ethAmount, keywordFund, messageFund} = formDataFund;   
       
    
          // const provider = new ethers.providers.Web3Provider(ethereum);
          // const contractBalance =  provider.getBalance(contractAddress);                
          // const parseContractBalance = ethers.utils.formatEther(contractBalance);  //easy read ethers formatted numbers          
                        
 
    const modalRef = useRef();   

    const animation = useSpring({
        config: {
            duration: 250
        },
        //opacity: showModal ? 1 : 0,
        //transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    });


    return (
        <>
          {showModal ? (
            //  <Background>
              <animated.div style={animation}> 
                <ModalWrapper showModal={showModal}>  
                                  
                    {/* <ModalImg src="../../images/logo_fryckio.png" alt="logo fryckio" /> */}                    
                    <ModalContent>
                        <p> Balance: </p>
                        {/* <p> Current account: {shortenAddress(currentAccount)} </p> */}
                        <button className="" onClick={() => setShowModal(prev => !prev)}>OK</button>
                    </ModalContent>
                    <CloseModalButton className="text-yellow-800" aria-label="Close modal" onClick={() => setShowModal(prev => !prev)}  />
                    {/* <AiOutlineClose className="text-yellow-800 mt-10 mr-20 absolute w-32" onClick={() => setShowModal(prev => !prev)} /> */}                  
                </ModalWrapper>
              </animated.div> 
          
            //  </Background>
          ) : null}           
        </>
    )
}


export default Modal_balance;