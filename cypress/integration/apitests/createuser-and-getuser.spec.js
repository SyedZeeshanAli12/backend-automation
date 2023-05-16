/// <reference types="cypress" />

const JSONdata = require('../../fixtures/createuser.json')

describe('post user request testing', () => {
  let accessToken = '57f32c94f96833ebf663b9bbbc084741ff3f6ab9913385e9a5d61951ced423e9'
  let randomtext = ""
  let testEmail = ""

  it('Create User Test', () => {
    var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 10; i++) {
      randomtext += pattern.charAt(Math.floor(Math.random() * pattern.length));
    }
    testEmail = randomtext + '@gmail.com';
    let userId;

    cy.request({
      method: 'POST',
      url: 'https://gorest.co.in/public/v2/users',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      body: {
        "id": 3340,
        "name": JSONdata.name,
        "email": testEmail,
        "gender": JSONdata.gender,
        "status": JSONdata.status
      }
    }).then((res) => {
      cy.log(JSON.stringify(res));
      expect(res.status).to.eql(201);
      expect(res.body).to.have.property('email', testEmail);
      expect(res.body).to.have.property('name', JSONdata.name);
      expect(res.body).to.have.property('gender', JSONdata.gender);
      expect(res.body).to.have.property('status', JSONdata.status);
      userId = res.body.id;

      // GET USER //

      cy.request({
        method: 'GET',
        url: `https://gorest.co.in/public/v2/users/${userId}`,
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }).then((res2) => {
        cy.log('user id is:' + userId);
        expect(res2.body).to.have.property('id', userId);
        expect(res2.body).to.have.property('name', JSONdata.name);
      });
    });
  });
});
