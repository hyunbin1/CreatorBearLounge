import React, { useState } from "react";
import { ethers } from "ethers";
// import "./WalletCard.css";

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");

  /* Method:
      1. ConnectWalletHandler
      2. account ChangedHandler
      3. getAccountBalance
      4. chainChangedHandler 
  */

  // Method 1.
  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("Make MetaMask New Account is Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" }) // 새 계정 만들도록 요청
        .then((newAccount) => {
          accountChangedHandler(newAccount[0]); // 새로운 계정으로 변경하여 가져오기
          setConnectButtonText("Wallet Connected");
          getAccountBalance(newAccount[0]); // 새로 만든 계정의 Balance 가져오기
        });
    } else {
      // 메타마스크 설치가 안되어 있을 경우 에러메세지
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask Browser extension to interact");
    }
  };

  // Method 2. 계정 업데이트 메서드, re-render 할 때 발생함
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  };

  // Method 3. 계정 Balance 가져오기
  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  // Method 4. reload the page to avoid any errors with chain change mid use of application
  const chainChangedHandler = () => {
    window.location.reload();
  };
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  // 화면에 보이는 모습
  return (
    <div className="walletCard">
      <h4> {"window.ethereum methods를 이용하여 메타마스트와 연결"} </h4>
      <button onClick={connectWalletHandler}>{connectButtonText}</button>
      <div className="accountDisplay">
        <h3> Address: {defaultAccount}</h3>
      </div>
      <div className="balanceDisplay">
        <h3> balance: {userBalance}</h3>
      </div>
      {errorMessage}
    </div>
  );
};

export default WalletCard;
