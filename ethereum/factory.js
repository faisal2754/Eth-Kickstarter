import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
   JSON.parse(CampaignFactory.interface),
   '0x824706010f7BbCa365a5E7b511364BE596216256'
)

export default instance
