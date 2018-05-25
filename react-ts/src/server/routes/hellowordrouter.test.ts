import * as mocha from 'mocha'
import * as chai from 'chai'
const chaiHttp = require('chai-http')

import App from '../express'

chai.use(chaiHttp)
const expect = chai.expect

describe('baseRoute', () => {
  it('should be json', () => {
    return chai.request(App).get('/')
      .then(res => {
        expect(res.type).to.equal('application/json')
      })
  })

  it('should have a message prop', () => {
    return chai.request(App).get('/')
      .then(res => {
        expect(res.body.message).to.equal('Hello World!')
      })
  })
})
