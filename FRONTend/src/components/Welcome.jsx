import React, {useContext} from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import GlobalStyle from "../components/globalStyles";
import { AiFillPlayCircle, AiFillContacts } from "react-icons/ai";
import { SiEthereum, SiTruenas } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import {useForm} from "react-hook-form";

import { Loader } from './';
import { FundMeContext } from "../context/FundMeContext";

import {shortenAddress} from "../utils/shortenAddress";
import { contractAddress } from '../utils/constants';




const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'
const commonStylesOurValues = 'min-h-[40px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 font-semibold font-light text-white'
const Input = ({placeholder, name, type, value, handleChange }) => (
  <input 
     className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-zinc-400 border-none text-sm gold-glassmorphism"
     placeholder={placeholder}
      type={type} 
      step="0.0001"    
      value = {value}
      onChange = {(e) => handleChange(e, name)}      
  />
)

// const Inputf = ({placeholder, name, type, value, handleChange }) => (
//   <input 
//      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-amber-200 border-none text-sm gold-glassmorphism"
//      placeholder={placeholder}
//       type={type} 
//       step="0.0001"    
//       value = {value}
//       onChange = {(e) => handleChange(e, name)}      
//   />
// )


// Modal_fund styling
const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100vh;    
`

const Button = styled.button`
   min-width: 100px;
   padding; 16px 32px;
   border-radius: 4px;
   border: none;
   background: #141414;
   color: #fff;
   font-size: 24px;
   cursor: pointer;
`



const Welcome = () => {
      const { Modal_fund, Modal_balance, showModal, showModal_balance, setShowModal, setShowModal_balance, connectWallet, currentAccount, formData, getAllCrowFundTransactions, sendCrowFundTransactionToBlockchain, 
             sendTransaction, formDataFund, fund,withdrawContractFunds, getContractBalance,  handleChange, isLoading
            } = useContext( FundMeContext );   // calling these entities from FundMeContext provider
      
      // handle transaction peer2peer
      const handleSubmit  = (e) => {
          // destructure the properties in the form data
          const { addressTo, amount, keyword, message } = formData;        
          // prevent page reload when submitting the form
          e.preventDefault;      
          // check if fields are filled in by user
          if(!addressTo || !amount || !keyword || !message) return ;   // submit nothing through the form          
          sendTransaction();             
      };

      // handle fund contract
      const handleSubmit_FundContract = (e) => {
        // destructure the properties in the fund form data
        const { addressToFund, ethAmount, keywordFund, messageFund } = formDataFund;

        // prevent page reload when submitting the form
        e.preventDefault;          
    
        // check if fields are filled in by user
        if(!ethAmount) {              
            console.log("Input Eth amount missing !");
        }        
          fund();               
          //sendCrowFundTransactionToBlockchain();
          //getAllCrowFundTransactions();   
      };
      
      const handleSubmit_ContractBalance = (e) => {       
         e.preventDefault; 
        getContractBalance(); 
      };

      const handleSubmit_Withdraw = (e) => {     
         e.preventDefault;
        withdrawContractFunds();
      };

    return (        
        <div className="flex w-full justify-center items-center">          
           <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">            
              <div className="mb-3">
                 <Modal_fund showModal={showModal} setShowModal={setShowModal} />
                 <GlobalStyle />   
              </div>
              <div className="mb-3">
                 <Modal_balance showModal={showModal_balance} setShowModal={setShowModal_balance} />
                 <GlobalStyle />   
              </div> 

              <div className="flex flex-1 justify-start flex-col mf:mr-10">           
                <h1 className="text-3xl sm:text-4xl text-yellow-300 text-gradient py-3">
                    Throw a coin as support
                </h1>
                {/* <p className="text-center mt-5 text-white font-light md:w-9/12 w-11/12 text-base">                    
                    Send of funds by cryptocurrency. Easily transfer eth via cryptocurrency instantly
                </p>  */}
                {/* if there is no current metamask account, render the button, en hide this button if there is an account connected */}
                {!currentAccount && (
                    <button type="button" className="flex flex-row justify-center items-center my-5 bg-[#d69e3e] p-3 rounded-full cursor-pointer hover:bg-[#b7791f] hover:text-yellow-100" onClick={connectWallet}>
                      {/* <AiFillContacts className="text-white mr-3" /> */}
                      <p className="text-zinc-800 text-base text-lg font-bold"> Connect your wallet </p>                         
                    </button>  
                  )} 
                  {/* <Modal_fund showModal={showModal_fund} setShowModal={setShowModal_fund} />
                  <GlobalStyle />                     */}
              </div>  
              
              {/* CrowdFunding box */}
               <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 ">             
                 <div className="p-5 sm:w-96 w-full flex flex-col justify start items-center white-glassmorphism">
                      <div className='flex flex-col justify-center items-center'>
                          <p className='text-yellow-100 font-semibold text-lg'>Crowdfunding</p> 
                          <p className='text-white font-light'>( ETH )</p> 
                      </div>
                     
                 
                      {/* Eth card box */}
                      <div className=" p-3 justify-end items-start flex-col rounded-xl h-45 w-full sm:w-72 my-5 gold-glassmorphism">
                          <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div fontSize={18} color="" className={`text-yellow-100`}>
                                  -----------
                                </div>
                                <div className="w-10 h-10 rounded-xl border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={22} color="" className={`text-yellow-100`} />
                                </div>                                 
                            </div>
                            <div className="mt-3">                                                           
                                <p className="text-zinc-400 font-semibold text-sm"> Current Network: </p>
                                <div className=" flex flex-1 text-sm mt-2"> 
                                     <p className="text-zinc-400 font-semibold"> Connected Address:</p>
                                     <p className="text-amber-400 flex font-semibold ml-2">{shortenAddress(currentAccount)}</p>
                                </div>
                            </div>
                          </div>
                      </div>  
                  
                      {/* Field data */}
                      <Input id="addressToFund" name="addressToFund" type="text" value={contractAddress}/> 
                      <Input placeholder="eth Amount (0.1)" id="ethAmount" name="ethAmount" type="number" required="true" handleChange = {handleChange} /> 
                      {/* <Input placeholder="give a keyword" id="keywordFund" name="keywordFund" type="text" handleChange = {handleChange} />  */}
                      <Input placeholder="give a message" id="messageFund" name="messageFund" type="text" handleChange = {handleChange} />                   
                      
                      <div className="h-[1px] w-full bg-yellow-100 mt-2" />
                      {isLoading ? (
                      <Loader />
                      ) : (
                            <button type="button" onClick={handleSubmit_FundContract} className="text-yellow-300 w-full mt-2 border-[1px] p-2 border-[gray] rounded-full cursor-pointer gold-glassmorphism">
                              {/* Transférer */} Fund
                            </button>                            
                      )}

                      <div className="h-[1px] w-full bg-yellow-100 mt-2" />
                      {isLoading ? (
                      <Loader />
                      ) : (
                            <button type="button" onClick={handleSubmit_Withdraw} className="text-yellow-200 font w-full mt-2 border-[1px] p-2 border-[gray] rounded-full cursor-pointer gold-glassmorphism">
                              {/* Retirer */} Withdraw funds (Owner)
                            </button>
                      )}

                      <div className="h-[1px] w-full bg-yellow-100 mt-2" />                     
                            <button type="button" onClick={handleSubmit_ContractBalance} className="text-white  w-full mt-2 border-[1px] p-2 border-[gray] rounded-full cursor-pointer gold-glassmorphism">
                              {/* Solde */} Balance
                            </button>                                         
                      </div>   
              </div>              
             
           </div>           
        </div>    
    );
};

export default Welcome;