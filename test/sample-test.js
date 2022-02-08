const { expect } = require("chai");
const { ethers, provider } = require("hardhat");

let dev, alex;
before("provider & account settings", async() => {
  [dev, alex] = await ethers.getSigners();
})

describe("Check Ether Wallet", function () {
  it("Testing function", async function () {
    const etherWalletContract = await ethers.getContractFactory("EtherWallet");
    const etherWallet = await etherWalletContract.connect(dev).deploy();

    const transactionHash = await alex.sendTransaction({
      to: etherWallet.address,
      value: ethers.utils.parseEther("2.0"), // Sends exactly 1.0 ether
    });

    expect(await etherWallet.getBalance()).to.equal(ethers.utils.parseEther("2.0"));

    // withdraw 0.3 ether
    await etherWallet.connect(dev).withdraw(ethers.utils.parseEther("0.3"));
    expect(await etherWallet.getBalance()).to.equal(ethers.utils.parseEther("1.7"));
  });
});
