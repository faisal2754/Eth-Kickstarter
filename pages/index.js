import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react'
import factory from '../ethereum/factory'
import Layout from '../components/Layout'

class CampaignIndex extends Component {
   static async getInitialProps() {
      const campaigns = await factory.methods.getDeployedCampaigns().call()
      return { campaigns }
   }

   renderCampaigns() {
      const items = this.props.campaigns.map((address) => {
         return {
            header: address,
            description: <a>bruh</a>,
            fluid: true
         }
      })

      return <Card.Group items={items}></Card.Group>
   }

   render() {
      return (
         <Layout>
            <div>
               <h3>Open Campaigns</h3>
               <Button floated="right" content="Create Campaign" icon="add" primary />
               <div>{this.renderCampaigns()}</div>
            </div>
         </Layout>
      )
   }
}

export default CampaignIndex
