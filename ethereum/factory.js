import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
   JSON.parse(CampaignFactory.interface),
   '0x072013CB48f7f6b11f6E0e1D0dD43C7724750fDE'
)

export default instance
