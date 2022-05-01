import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import NFTContainer from "./NFTContainer";

const WalletCard = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");

  /* Method:
      1. connectWallet
      2. getNftData
      3. account ChangedHandler
      4. getAccountBalance
      5. chainChangedHandler 
  */

  // Method 1.
  const connectWallet = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("Make MetaMask New Account is Here!");

      // 계정 연결 OR 새 계정 만들도록 요청
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } else {
      // 메타마스크 설치가 안되어 있을 경우 에러메세지
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask Browser extension to interact");
    }
  };

  // Method 2. user가 가지고있는 nft 정보 가져오기
  const getNftData = async () => {
    if (!walletAddress) return;

    // 참조 API: https://api.rarible.org/v0.1/doc#operation/getItemByIds
    const response = await fetch(
      // `https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:0x60f80121c31a0d46b5279700f9df786054aa5ee5`
      `https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:0x82611E6A5d96801b57D62902b0191BC1e4f8ceDe`
      // `https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${walletAddress}`
    );

    const data = await response.json();

    setNfts(data.items);
    debugger;
  };

  useEffect(() => {
    getNftData();
  }, [walletAddress]);

  // Method 3. 계정 업데이트 메서드, re-render 할 때 발생함
  const accountChangedHandler = (newAccount) => {
    setWalletAddress(newAccount);
    getAccountBalance(newAccount.toString());
  };

  // Method 4. 계정 Balance 가져오기
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

  // Method 5. reload the page to avoid any errors with chain change mid use of application
  const chainChangedHandler = () => {
    window.location.reload();
  };
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  // 화면에 보이는 모습
  return (
    <div className="walletCard">
      <h4> {"window.ethereum 메타마스트와 연결"} </h4>
      <button onClick={connectWallet}>{connectButtonText}</button>
      <div className="accountDisplay">
        <h3> Address: {walletAddress}</h3>
      </div>

      <NFTContainer nfts={nfts} />
      <div className="balanceDisplay">
        <h3> balance: {userBalance}</h3>
      </div>
      {errorMessage}
    </div>
  );
};

export default WalletCard;
