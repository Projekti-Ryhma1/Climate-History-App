describe('create user, login, delete user', () => {
  it('user can create account', () => {
      cy.visit('localhost:3000/')
      //Signup
      cy.findByRole('link', { name: /signup/i }).click()
      cy.get('[id=userName]').type('1234')
      cy.get('[id=userPassword]').type('1234')
      cy.get('[id=userEmail]').type('1234@1234.com')
      cy.findByRole('button', {  name: /create/i}).should('be.enabled').click()
      cy.url().should('contain', '/login')
      //Login
      cy.get('[id=userName]').type('1234')
      cy.get('[id=userPassword]').type('1234')
      cy.findByRole('button', {  name: /login/i}).click()
      //Delete user
      cy.findByRole('button', {  name: /user \( 1234 \)/i}).click()
      cy.findByRole('link', {  name: /preferences/i}).click()
      cy.findByRole('button', {  name: /delete user/i}).click()
      cy.findByRole('dialog').within(($form) => {
      cy.findByRole('button', {  name: /delete user/i}).click()
      })
  })
})