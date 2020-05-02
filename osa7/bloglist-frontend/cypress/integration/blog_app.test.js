describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({
      name: 'Paavo Rantala',
      username: 'ppavee',
      password: 'salainen'
    })
    cy.createUser({
      name: 'Max Power',
      username: 'mpow',
      password: 'secret'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('login', function () {
    it('succeeds with correct credential', function () {
      cy.get('#login-username').type('ppavee')
      cy.get('#login-password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Paavo Rantala logged in')
      cy.get('html').should('not.contain', 'log in to application')
    })

    it('fails with wrong credentials', function () {
      cy.get('#login-username').type('ppavee')
      cy.get('#login-password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Paavo Rantala logged in')
    })
  })

  describe('when logged in', function () {


    describe('permitted user actions', function () {
      beforeEach(function () {
        cy.login({ username: 'ppavee', password: 'salainen' })
      })

      it('A blog can be created', function () {
        cy.contains('create new blog').click()
        cy.get('#blog-title').type('Microservices and the First Law of Distributed Objects')
        cy.get('#blog-author').type('Martin Fowler')
        cy.get('#blog-url').type('https://martinfowler.com/articles/distributed-objects-microservices.html')
        cy.get('#blog-submit').click()

        cy.contains('Microservices and the First Law of Distributed Objects Martin Fowler')
      })

      describe('atleast one blog exists', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Microservices and the First Law of Distributed Objects',
            author: 'Martin Fowler',
            url: 'https://martinfowler.com/articles/distributed-objects-microservices.html'
          })
        })

        it('a blog can be liked', function () {
          cy.contains('Microservices and the First Law of Distributed Objects Martin Fowler').as('blog')

          cy.get('@blog')
            .contains('view')
            .click()
          cy.get('@blog')
            .contains('likes 0')

          cy.get('@blog')
            .contains('like')
            .click()

          // likes have increased
          cy.get('@blog')
            .contains('likes 1')
        })

        it('the user who added a blog can remove it', function () {
          cy.contains('Microservices and the First Law of Distributed Objects Martin Fowler').as('blog')
          cy.get('@blog')
            .contains('view')
            .click()

          cy.get('@blog')
            .contains('remove')
            .click()

          cy.get('html').should('not.contain', 'Microservices and the First Law of Distributed Objects Martin Fowler')
        })
      })
    })

    describe('restricted user acions', function() {
      beforeEach(function() {
        cy.login({
          username: 'ppavee',
          password: 'salainen'
        })
        cy.createBlog({
          title: 'Microservices and the First Law of Distributed Objects',
          author: 'Martin Fowler',
          url: 'https://martinfowler.com/articles/distributed-objects-microservices.html'
        })
        cy.contains('log out').click()
      })

      it('user can\'t remove a blog that he hasn\'t added', function() {
        cy.login({
          username: 'mpow',
          password: 'secret'
        })

        cy.contains('Microservices and the First Law of Distributed Objects Martin Fowler').as('blog')
          cy.get('@blog')
            .contains('view')
            .click()

          cy.get('@blog').should('not.contain', 'remove')
      })
    })

    describe('several blogs exists', function() {
      beforeEach(function() {
        cy.login({
          username: 'ppavee', password: 'salainen'
        })
        cy.createBlog({
          title: 'Microservices and the First Law of Distributed Objects',
          author: 'Martin Fowler',
          url: 'https://martinfowler.com/articles/distributed-objects-microservices.html',
          likes: 7
        })
        cy.createBlog({
          title: 'Things I don\'t know as of 2018',
          author: 'Dan Abramov',
          url: 'https://overreacted.io/things-i-dont-know-as-of-2018/',
          likes: 2
        })
        cy.createBlog({
          title: 'Web, design, & web design.',
          author: 'Stephen Hay',
          url: 'https://www.the-haystack.com/',
          likes: 0
        })
        cy.createBlog({
          title: '40 Hoodies to Strengthen Your Geeky Existence',
          author: 'Alvaris Falcon',
          url: 'https://www.hongkiat.com/blog/geek-hoodies/',
          likes: 23
        })
        cy.createBlog({
          title: 'What To Do With All Those Spare Creative Ideas',
          author: 'Addison Duvall',
          url: 'https://speckyboy.com/spare-creative-ideas/',
          likes: 14
        })
      })

      it('blogs are ordered descending by likes', function() {
        cy.get('.blogStyle').then((blogs) => {
          for(let blog of blogs) {
            cy.contains(blog.innerText)
              .contains('view')
              .click()
          }
        })
        const array = []
        cy.get('.blogLikes').each((like, i) => {
          let $like = Cypress.$(like).text()
          array.push(Number($like))
        }).then(() => {
          for(let i = 1; i < array.length; i++) {
            expect(array[i-1]).to.be.greaterThan(array[i])
          }
        })
      })
    })
  })

})