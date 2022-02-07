const { assert } = require('chai');

const YTH = artifacts.require("YTH");
const DAI = artifacts.require("DAI");
const Pool = artifacts.require("Pool");

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Pool', ([owner, customer]) => {
let dai, yth, pool

function tokens(number) {
    return web3.utils.toWei(number, 'ether')
}
before(async() => {
    //load contracts
    dai = await DAI.new()
    yth = await YTH.new()
    pool = await Pool.new(yth.address, dai.address)

    //transfer all the tokens to pool(1 millions)
    await yth.transfer(pool.address, tokens('1000000'))

    //transfer 100 tokens to custmober
    await dai.transfer(customer, tokens('100'), {from:owner})
})

    describe('DAI deployment', async() => {
        it('matches name succesfully', async() => {
            const name = await dai.name()
            assert.equal(name, 'dai')
        })
    })

    describe('Reward Token deployment', async() => {
        it('matches name succesfully', async() => {
            const name = await yth.name()
            assert.equal(name, 'yth')
        })
    })

    describe('Pool Deployment', async() => {
        it('matches succesfully', async() => {
            const name = await pool.name()
            assert.equal(name, 'Pool')
        })

        it('balance matches succesfully', async() => {
            let balance = await yth.balanceOf(pool.address)
            assert.equal(balance, tokens('1000000'))
        })
    })

    describe('Yield Farming', async() => {
        it('reward tokens for staking and unstaking', async() => {
            let result
            //checking the investor balance
            result = await dai.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), "customer wallet balance before staking")

            //chcking stake for customer
            await dai.approve(pool.address, tokens('100'), {from: customer})
            await pool.stakeTokens(tokens('100'), {from: customer})

            //updated balances of customer
            result = await dai.balanceOf(customer)
            assert.equal(result.toString(), tokens('0'), "customer wallet balance after 100 tokens staking")

            //updated balances of Pool
            result = await dai.balanceOf(pool.address)
            assert.equal(result.toString(), tokens('100'), "pool balance after 100 tokens staking")

            //is staking balance true
            result = await pool.isStaked(customer)
            assert.equal(result.toString(), 'true', "customer staking status should be true")

            //ensure only owner can distribute tokens
            await pool.rewardDistribution({from: customer}).should.be.rejected;

            //unstrake the funds
            await pool.unStake(tokens('100'), {from: customer})

            //check unstaking balance 
            result = await dai.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), "customer wallet balance after 100 tokens unstaking")

            //updated balances of Pool
            result = await dai.balanceOf(pool.address)
            assert.equal(result.toString(), tokens('0'), "pool balance after 100 tokens unstaking")

            //is staking balance true
            result = await pool.isStaked(customer)
            assert.equal(result.toString(), 'false', "customer staking status should be false")
        })
    })
})

