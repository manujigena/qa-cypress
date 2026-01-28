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
    
    cy.get("#input-1").type("challengeqa");
    cy.get("#input-2").type("Abcd1234");
    cy.get(".accept-btn").click();
    cy.wait("@login");    
    cy.url().should("include", "/dashboard");
    cy.get(".background-item").should("be.visible");
    cy.pause();
  })

  it('No hacer login con password incorrecto', () => {
    cy.url().should("include", "/DexFrontEnd");
    cy.get("#logo").should("be.visible");

    cy.get("#input-1").type("challengeqa");
    cy.get("#input-2").type("Test1234");
    cy.get(".accept-btn").click();
        
    cy.get("#dialogMsg").find("span").should("include.text", "Usuario o contraseña incorrecta.");
    cy.get("#dialogMsg").find(".buttons").click();    
  })

  it('No hacer login con usuario inexistente', () => {
    cy.url().should("include", "/DexFrontEnd");
    cy.get("#logo").should("be.visible");
    
    cy.intercept('POST', 'https://demo4.dexmanager.com/DexFrontEnd/Login').as("login");
    cy.get("#input-1").type("usuari1230");
    cy.get("#input-2").type("Abcd1234");    
    cy.get(".accept-btn").click();
    cy.wait("@login");

    cy.get("#dialogMsg").find("span").should("include.text", "Usuario o contraseña incorrecta.")
    cy.get("#dialogMsg").find(".buttons").click()
  })
  
  it('No hacer login sin completar ningun campo', () => {
    cy.url().should("include", "/DexFrontEnd");
    cy.get("#logo").should("be.visible");
    
    cy.get(".accept-btn").click();
    cy.get("#paper-input-add-on-1").should("be.visible").and("have.text", "Usuario requerido")
    cy.get("#paper-input-add-on-2").should("be.visible").and("have.text", "Mínimo 10 caracteres, al menos 1 número, 1 mayúscula y 2 carácter(es) especial(es)")
  })
})