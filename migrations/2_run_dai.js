const DAI = artifacts.require("DAI");
const YTH = artifacts.require("YTH");
const Pool = artifacts.require("Pool");
//const Pool = artifacts.require("Transfer");

module.exports = async function (deployer, network, accounts) {
   //deploy the DAI contract
   await deployer.deploy(DAI)
   const dai = await DAI.deployed()
   
   //deploy the YTH(rewards) contract
   await deployer.deploy(YTH)
   const yth = await YTH.deployed()

   //deploy the Pool contract
   await deployer.deploy(Pool, yth.address, dai.address)
   const pool = await Pool.deployed()

    // //deploy the transfer contract
    // await deployer.deploy(Transfer)
    // const transfer = await Transfer.deployed()

   //transfer all the yth tokens to the pool
   await yth.transfer(Pool.address, '1000000000000000000000000')   //million

  //distribute the 100 dai to the investor
  await dai.transfer(accounts[1], '100000000000000000000') //1 token
}
