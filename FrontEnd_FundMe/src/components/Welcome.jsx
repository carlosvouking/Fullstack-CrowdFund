import React, {useContext} from 'react';
import { AiFillPlayCircle, AiFillContacts } from "react-icons/ai";
import { SiEthereum, SiTruenas } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import { Loader } from './';
import { FundMeContext } from "../context/FundMeContext";

import {shortenAddress} from "../utils/shortenAddress";
import { contractAddress } from '../utils/constants';



const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'
const commonStylesOurValues = 'min-h-[40px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 font-semibold font-light text-white'
const Input = ({placeholder, name, type, value, handleChange }) => (
  <input 
     className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-amber-200 border-none text-sm gold-glassmorphism"
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

const Welcome = () => {
      const { connectWallet, currentAccount, formData, getAllCrowFundTransactions, sendCrowFundTransactionToBlockchain, sendTransaction, formDataFund, fund,withdrawContractFunds, getContractBalance,  handleChange, isLoading} = useContext( FundMeContext );   // calling these entities from FundMeContext provider
      
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

              <div className="flex flex-1 justify-start flex-col mf:mr-10">           
                <h1 className="text-3xl sm:text-5xl text-yellow-300 text-gradient py-">
                    Send Eth <br /> all over the world
                </h1>
                <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">                    
                    Send of funds by cryptocurrency. Easily transfer eth via cryptocurrency instantly - 24/7.
                </p> 
                {/* if there is no current metamask account, render the button, en hide this button if there is an account connected */}
                {!currentAccount && (
                    <button type="button" className="flex flex-row justify-center items-center my-5 bg-[#d69e3e] p-3 rounded-full cursor-pointer hover:bg-[#b7791f] hover:text-yellow-100" onClick={connectWallet}>
                      {/* <AiFillContacts className="text-white mr-3" /> */}
                      <p className="text-white text-base text-lg font-bold">{/*Connecter le Porte-monnaie*/} Connect your wallet</p> 
                    </button>
                  )}
                <div className="grid sm:grid-cols-1 grid-cols-1 w-full mt-10">
                    <div className={`rounded-xl ${commonStylesOurValues}`}>
                        Speed -- Security -- Almost no costs
                    </div>
                </div>
                <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-5 ">
                    <div className={`rounded-tl-2xl ${commonStyles}`}>Fryc / USD: ? </div>
                    <div className={commonStyles}>Fryc / Euro: ?</div>
                    <div className={`rounded-tr-2xl ${commonStyles}`}>Eth / USD: ? </div>
                    <div className={`rounded-bl-2xl ${commonStyles}`}>Euro / Fcfa: ? </div>
                    <div className={commonStyles}>USD / Fcfa: ?</div>
                    <div className={`rounded-br-2xl ${commonStyles}`}>Eth / Euro: ? </div>
                </div>
              </div>  


              {/* CrowdFunding box */}
               <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 ">             
                 <div className="p-5 sm:w-96 w-full flex flex-col justify start items-center white-glassmorphism">
                      <div className='flex flex-col justify-center items-center'>
                          <p className='text-yellow-400 font-semibold text-lg'>Crowdfunding</p> 
                          <p className='text-white font-light'>Project funding  ( min $50 USD in ETH )</p> 
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
                                <p className="text-white font-semibold text-sm"> Current Network: </p>
                                <p className="text-white font-semibold text-sm"> Connected Address: {shortenAddress(currentAccount)} </p>
                                {/* <p className="text-white font-semibold text-lg mt-1">ETH</p> */}
                            </div>
                          </div>
                      </div>  
                  
                      {/* Field data */}
                      <Input id="addressToFund" name="addressToFund" type="text" value={contractAddress}/> 
                      <Input placeholder="eth Amount (0.1)" id="ethAmount" name="ethAmount" type="number" handleChange = {handleChange} /> 
                      <Input placeholder="Keyword" id="keywordFund" name="keywordFund" type="text" handleChange = {handleChange} /> 
                      <Input placeholder="message" id="messageFund" name="messageFund" type="text" handleChange = {handleChange} />                   
                      
                      <div className="h-[1px] w-full bg-yellow-100 mt-2" />
                      {isLoading ? (
                      <Loader />
                      ) : (
                            <button type="button" onClick={handleSubmit_FundContract} className="text-white  w-full mt-2 border-[1px] p-2 border-[gray] rounded-full cursor-pointer gold-glassmorphism">
                              {/* Transférer */} Fund
                            </button>                            
                      )}

                      <div className="h-[1px] w-full bg-yellow-100 mt-2" />
                      {isLoading ? (
                      <Loader />
                      ) : (
                            <button type="button" onClick={handleSubmit_Withdraw} className="text-white font w-full mt-2 border-[1px] p-2 border-[gray] rounded-full cursor-pointer gold-glassmorphism">
                              {/* Retirer */} Withdraw funds (Owner)
                            </button>
                      )}

                      <div className="h-[1px] w-full bg-yellow-100 mt-2" />
                      {isLoading ? (
                      <Loader />
                      ) : (
                            <button type="button" onClick={handleSubmit_ContractBalance} className="text-white  w-full mt-2 border-[1px] p-2 border-[gray] rounded-full cursor-pointer gold-glassmorphism">
                              {/* Solde */} Balance
                            </button>
                      )}     
                 </div>    
              </div> 

               
              {/* Peer-2-Peer box */} 
              <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10 mr-10 ">             
                 <div className="p-5 sm:w-96 w-full flex flex-col justify start items-center white-glassmorphism">
                      <div className='flex flex-col justify-center items-center'>
                          <p className='text-yellow-100 font-semibold text-lg'>Peer-2-Peer transfer</p> 
                          <p className='text-white font-light'>Send some eth to a buddy</p> 
                      </div>

                      {/* Eth card box */}
                      <div className=" p-3 justify-end items-start flex-col rounded-xl h-45 w-full sm:w-72 my-5 eth-card gold-glassmorphism">
                          <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-xl border-2 border-white flex justify-center items-center">
                                    <SiTruenas fontSize={22} color="" className={`text-yellow-100`} />
                                </div>
                                <div fontSize={18} color="" className={`text-yellow-100`}>
                                  <BsInfoCircle />
                                </div> 
                            </div>
                            <div className="mt-3">
                                <p className="text-white font-semibold text-sm"></p>
                                <p className="text-white font-semibold text-sm"> Connected Address: {shortenAddress(currentAccount)} </p>
                                <p className="text-white font-semibold text-lg mt-1">ETH</p>
                            </div>
                          </div>
                      </div>  
                      
                  
                      {/* Field data */}
                      <Input placeholder="Recipient address" name="addressTo" type="text" handleChange = {handleChange} /> 
                      <Input placeholder="Amount (Eth)" name="amount" type="number"  handleChange = {handleChange} /> 
                      <Input placeholder="Keyword (Gif)" name="keyword" type="text"  handleChange = {handleChange} /> 
                      <Input placeholder="Add message" name="message" type="text"  handleChange = {handleChange} />                   
                      
                      <div className="h-[1px] w-full bg-yellow-100" />

                      {isLoading ? (
                      <Loader />
                      ) : (
                            <button type="button" onClick={handleSubmit} className="text-white w-full mt-2 border-[1px] p-2 border-[gray] rounded-full cursor-pointer">
                              {/* Transférer */} Send some Eth
                            </button>
                      )}
                 </div>    
              </div>   
              
           </div>           
        </div>    
    );
};

export default Welcome;