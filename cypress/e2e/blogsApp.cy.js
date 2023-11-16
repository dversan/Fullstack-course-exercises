describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'David',
      username: 'dvs',
      password: '123asd'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const loggedUser = {
      username: 'dvs',
      password: '123asd'
    }
    cy.request('POST', 'http://localhost:3003/api/login/', loggedUser)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('dvs')
      cy.get('#password').type('123asd')
      cy.contains('login').click()

      cy.contains('dvs is logged in')
      cy.contains('Logout').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('dvs')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.get('#loginErrorMessage')
        .contains('Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})
