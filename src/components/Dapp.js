import React, {Component} from 'react'
import './Dapp.css'
// eslint-disable-next-line
import Navbar from './Navbar';
import Web3 from 'web3';
import DAI from '../truffle_abis/DAI.json'

class Dapp extends Component {

    async UNSAFE_componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3(){
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if(window.web3){
            window.web3 = new Web3(window.web3.currentProvider) 
        } else {
            window.alert('Unable to Detect MetaMask')
        }
    }
   
    async loadBlockchainData() {
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({account: account[0]})
        const networkId = await web3.eth.net.getId()

        //load the dai contract
        const daiData = DAI.networks[networkId]
        if(daiData){
            const dai = new web3.eth.Contract(DAI.abi, daiData.address)
            this.setState({dai})
            let daiBalance = await dai.methods.balanceOf(this.state.account).call()
            this.setState({daiBalance: daiBalance.toString() })
            console.log({balance: daiBalance})
        } else {
            window.alert("Error: dai contract not deployed- no detected network")
        }
    }
    constructor(props){
        super(props)
        this.state ={
            account: '0x0',
            dai: {},
            yth: {},
            pool: {},
            daiBalance: '0',
            ythBalance: '0',
            StakingBalance: '0',
            loading: true
        }
    }

    render() {
        return (
            <dev>
                <Navbar account={this.state.account}/>
                   <div className = 'text-center'>
                   </div>
            </dev>
        )
    }
}

export default Dapp 