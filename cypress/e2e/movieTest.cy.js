const selectors = require('../fixtures/selectors.json')
const login = require('../fixtures/login.json')

describe('check main page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have 7 days', () => {
    cy.get(selectors.header).should('contain', 'Идём').and('be.visible')
    cy.get(selectors.daysOfWeek).should('have.length', 7)
  })
})

describe('Autorization into admin', () => {
  beforeEach(() => {
    cy.visit('/admin')
  })

  it('should autorization with valid login and password', () => {
    cy.login(login.validLogin, login.validPassword)
    cy.get(selectors.header).should('contain', 'Идём')
    cy.get(selectors.subTitle).should('have.text', 'Администраторррская')
    cy.contains(selectors.keyWord).should('be.visible')
  })

  it('should not autirization with invalid login and valid password', () => {
    cy.login(login.invalidLogin, login.validPassword)
    cy.get('body').should('have.text', 'Ошибка авторизации!')
  })

  it('should not autirization with valid login and invalid password', () => {
    cy.login(login.validLogin, login.invalidPassword)
    cy.get('body').should('have.text', 'Ошибка авторизации!')
  })

  it('should not autirization with valid login and empty password', () => {
    cy.login(login.validLogin)
    cy.get(selectors.password).then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.")
    })
  })
})



describe('book a ticket', () => {
  it('book a ticket', () => {
    cy.visit('/admin')
    cy.login(login.validLogin, login.validPassword)
             
    cy.get(selectors.movieTitle).first().invoke('text').then((text => {
      cy.visit('/')
      cy.get(selectors.lastDaySchedule).click()
      cy.get(selectors.movie).contains(text).get(selectors.seances).first().click()
      cy.get(selectors.seat).first().click()
      cy.get(selectors.acceptButton).click()
      cy.wait(1000)
      cy.contains(text)
    }))         
  })
       
        
})
    
  


