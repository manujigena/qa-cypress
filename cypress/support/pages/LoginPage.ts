class LoginPage{
    private inputUsername = () => cy.get("#input-1");
    private inputPassword = () => cy.get("#input-2");
    private buttonLogin = () => cy.get(".accept-btn");
    public getTextModal = () => cy.get("#dialogMsg").find("span");
    public clickConfirmModal = () => cy.get("#dialogMsg").find(".buttons");

    public signIn(username: string, password: string){
        this.inputUsername().type(username)
        this.inputPassword().type(password)
        this.buttonLogin().click()
    }
}

export const loginPage = new LoginPage();