import { loginPage } from "../support/pages/LoginPage"

describe('Autenticacion en Dex Manager', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.clearAllSessionStorage()
    cy.visit("https://demo4.dexmanager.com/");
  })

  it('Hacer login con credenciales validas', () => {    
    cy.url().should("include", "/DexFrontEnd");
    cy.get("#logo").should("be.visible");
    cy.intercept('POST', 'https://demo4.dexmanager.com/DexFrontEnd/Login').as("login");
    loginPage.signIn("challengeqa", "Abcd1234");
    cy.wait("@login");

    cy.url().should("include", "/dashboard");
    cy.get(".background-item").should("be.visible");
    cy.get("[title='ARG - CHALLENGE']").should("be.visible");
  })

  it('No hacer login con password incorrecto', () => {
    cy.url().should("include", "/DexFrontEnd");
    cy.get("#logo").should("be.visible");

    cy.intercept('POST', 'https://demo4.dexmanager.com/DexFrontEnd/Login').as("login");
    loginPage.signIn("challengeqa", "Test1234");
    cy.wait("@login");

    loginPage.getTextModal().should("be.visible").and("include.text", "Usuario o contraseña incorrecta.");
    loginPage.clickConfirmModal().click();
  })

  it('No hacer login con usuario inexistente', () => {
    cy.url().should("include", "/DexFrontEnd");
    cy.get("#logo").should("be.visible");
    
    cy.intercept('POST', 'https://demo4.dexmanager.com/DexFrontEnd/Login').as("login");
    loginPage.signIn("usuari1230", "Abcd1234");    
    cy.wait("@login");

    loginPage.getTextModal().should("be.visible").and("include.text", "Usuario o contraseña incorrecta.");
    loginPage.clickConfirmModal().click();
  })
  
  it('No hacer login sin completar ningun campo', () => {
    cy.url().should("include", "/DexFrontEnd");
    cy.get("#logo").should("be.visible");
    
    cy.get(".accept-btn").click();
    cy.get("#paper-input-add-on-1").should("be.visible").and("have.text", "Usuario requerido")
    cy.get("#paper-input-add-on-2").should("be.visible").and("have.text", "Mínimo 10 caracteres, al menos 1 número, 1 mayúscula y 2 carácter(es) especial(es)")
  })
})