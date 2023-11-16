import { sampleNewBlog } from '../../part5/doubles/testSamples.jsx'

describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'David',
      username: 'dvs',
      password: '123asd'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  describe('Login', () => {
    it('form is shown', () => {
      cy.contains('Login')
      cy.contains('username')
      cy.contains('password')
    })

    it('succeeds with correct credentials', () => {
      cy.get('#username').type('dvs')
      cy.get('#password').type('123asd')
      cy.contains('login').click()

      cy.contains('dvs is logged in')
      cy.contains('Logout').click()
    })

    it('fails with wrong credentials', () => {
      cy.get('#username').type('dvs')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.get('#loginErrorMessage')
        .contains('Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'dvs', password: '123asd' })
    })

    it('A blog can be created', () => {
      cy.createBlog(sampleNewBlog)

      cy.contains(`${sampleNewBlog.title} - ${sampleNewBlog.author}`)
    })

    it('a like can be added to the blog', () => {
      cy.createBlog(sampleNewBlog)

      cy.contains('details').click()

      cy.get('#likesCount').contains(0)
      cy.contains('likes').click()
      cy.get('#likesCount').contains(1)
    })

    it('a blog can be deleted by his creator', () => {
      cy.createBlog(sampleNewBlog)
      cy.get('#blogContainer').should('not.contain', 'remove')

      cy.contains('Logout').click()

      cy.login({ username: 'dvs', password: '123asd' })

      cy.contains('details').click()
    })
  })
})
