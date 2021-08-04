import React, { Component } from 'react'
import { Card, Grid, Button } from 'semantic-ui-react'
import web3 from '../../ethereum/web3'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import ContributeForm from '../../components/ContributeForm'
import { Link } from '../../routes'

class Show extends Component {
   static async getInitialProps(props) {
      const campaign = Campaign(props.query.address)
      const summary = await campaign.methods.getSummary().call()
      return {
         address: props.query.address,
         minimumContribution: summary[0],
         balance: summary[1],
         requestsCount: summary[2],
         approversCount: summary[3],
         manager: summary[4]
      }
   }

   renderSummary() {
      const { balance, manager, minimumContribution, requestsCount, approversCount } =
         this.props
      const items = [
         {
            header: manager,
            meta: 'Address of Manager',
            description:
               'This campaign was created by this Manager. They can create requests to withdraw money.',
            style: { overflowWrap: 'break-word' }
         },
         {
            header: minimumContribution,
            meta: 'Minimum Contribution (wei)',
            description:
               'You must contribute at least this much wei to become a contributor',
            style: { overflowWrap: 'break-word' }
         },
         {
            header: requestsCount,
            meta: 'Number of Requests',
            description:
               'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
            style: { overflowWrap: 'break-word' }
         },
         {
            header: approversCount,
            meta: 'Number of Approvers',
            description:
               'Number of people who have already contributed to this campaign.',
            style: { overflowWrap: 'break-word' }
         },
         {
            header: web3.utils.fromWei(balance, 'ether'),
            meta: 'Campaign Balance (ether)',
            description: 'How much money this campaign has left to spend.',
            style: { overflowWrap: 'break-word' }
         }
      ]
      return <Card.Group items={items} />
   }

   render() {
      return (
         <Layout>
            <h3>Campaign Summary</h3>
            <Grid>
               <Grid.Row>
                  <Grid.Column width={10}>{this.renderSummary()}</Grid.Column>
                  <Grid.Column width={6}>
                     <ContributeForm address={this.props.address} />
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row>
                  <Grid.Column>
                     <Link route={`/campaigns/${this.props.address}/requests`}>
                        <a>
                           <Button primary>View Requests</Button>
                        </a>
                     </Link>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </Layout>
      )
   }
}

export default Show
