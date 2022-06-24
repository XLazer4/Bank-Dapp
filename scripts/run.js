const main = async () => {
  Web3 = require("web3");

  // adding wallet adderesses
  const [owner, randomPerson] = await hre.ethers.getSigners();
  // compile contract and generate the necessary files we need to work with our contract under the artifacts directory
  const ContractFactory = await hre.ethers.getContractFactory("Bank");
  // create a local Ethereum network for us, but just for this contract and sending ether to it
  const Contract = await ContractFactory.deploy();
  await Contract.deployed();

  console.log("Contract deployed to: ", Contract.address);
  console.log("Contract deployed by: ", owner.address, "\n");

  let depositx;
  depositx = await Contract.deposit({
    from: owner.address,
    value: Web3.utils.toWei("1", "ether"),
  });
  await depositx.wait();

  depositx = await Contract.connect(randomPerson).deposit({
    value: Web3.utils.toWei("1", "ether"),
  });
  await depositx.wait();  

  let checkbalance;
  checkbalance = await Contract.bankbalance();
  //console.log(checkbalance);
  let withdraw;
  withdraw = await Contract.withdraw(Web3.utils.toWei("1", "ether"));
  await withdraw.wait();  
  checkbalance = await Contract.viewbalance();

  checkbalance = await Contract.bankbalance();

  withdraw = await Contract.withdraw(Web3.utils.toWei("1", "ether"));
  await withdraw.wait();  

  checkbalance = await Contract.bankbalance();  
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
};

runMain();
