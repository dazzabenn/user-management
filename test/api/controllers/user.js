var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('user', function() {

    describe('POST /user', function() {

      it('should correctly create a new user', function(done) {
        var body = {
            forename: 'Test',
            surname: 'User',
            email: 'test@test.com'
        };
        request(server)
          .post('/user')
          .send(body)
          .expect('Content-Type', /json/)
          .expect(201) //Status code
          .end(function(err,res) {
              if (err) {
                  throw err;
              }
              
              res.body.should.have.property('id');
              res.body.forename.should.equal('Test');
              res.body.surname.should.equal('User');                    
              res.body.email.should.equal('test@test.com');                    
              res.body.created.should.not.equal(null);

              done();
          });
      });

      it('should return 409 if user is submitted with an email that already exists', function(done) {
        var body = {
            forename: 'Test',
            surname: 'User',
            email: 'test@test.com'
        };
        request(server)
          .post('/user')
          .send(body)
          .end(function(err,res) {
              if (err) {
                  throw err;
              }
              
              request(server)
                .post('/user')
                .send(body)
                .expect(409) //Status code
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }

                    res.body.message.should.equal('A user with the e-mail test@test.com alreedy exists.');
                    
                    done();
                });
          });
      });

      it('should return a 400 if no email is provided', function(done) {
         var body = {
            forename: 'Test',
            surname: 'User',
        };
        request(server)
          .post('/user')
          .send(body)
          .expect('Content-Type', /json/)
          .expect(400) //Status code
          .end(function(err,res) {
              if (err) {
                  throw err;
              }
              
              done();
          });
      });

      it('should return a 400 if no forename is provided', function(done) {
        var body = {
            surname: 'User',
            email: 'test@test.com'
        };
        request(server)
          .post('/user')
          .send(body)
          .expect('Content-Type', /json/)
          .expect(400) //Status code
          .end(function(err,res) {
              if (err) {
                  throw err;
              }
              
              done();
          });
      });

      it('should return a 400 if no surname is provided', function(done) {
        var body = {
            forename: 'User',
            email: 'test@test.com'
        };
        request(server)
          .post('/user')
          .send(body)
          .expect('Content-Type', /json/)
          .expect(400) //Status code
          .end(function(err,res) {
              if (err) {
                  throw err;
              }
              
              done();
          });
      });

    });

    describe('GET /user', function() {

      it('should return a 204 for an invalid id', function(done) {
        request(server)
          .get('/user/123456789')
          .expect(204) //Status code
          .end(function(err,res) {
              if (err) {
                  throw err;
              }
              
              done();
          });
      });

      it('should correctly return a user for a valid id', function(done) {
        var body = {
          forename: 'Test',
          surname: 'User',
          email: 'test2@test.com'
        };
        var id;

        request(server)
          .post('/user')
          .send(body)
          .end(function(err, res) {
              id = res.body.id;

               request(server)
                .get('/user/' + id)
                .expect(200) //Status code
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }

                    res.body.id.should.equal(id);
                    
                    done();
                });
          });
      });

    });

    describe('DELETE /user', function() {

      it('should correctly delete a user', function(done) {

        var body = {
          forename: 'Test',
          surname: 'User',
          email: 'test3@test.com'
        };
        var id;

        request(server)
          .post('/user')
          .send(body)
          .end(function(err, res) {
              id = res.body.id;

               request(server)
                .delete('/user/' + id)
                .expect(200) //Status code
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }

                    res.body.success.should.equal(1);
                    res.body.description.should.equal('User has been deleted!');
                    
                    done();
                });
          });
      });

      it('should return a 204 for an invalid id', function(done) {
        request(server)
          .delete('/user/123456789')
          .expect(204) //Status code
          .end(function(err,res) {
              if (err) {
                  throw err;
              }
              
              done();
          });
      });

    });

    describe('PUT /user', function() {

        var body = {
            forename: 'Test',
            surname: 'User',
            email: 'test@test.com'
        };

      it('should return a 204 for an invalid id', function(done) {
        request(server)
          .put('/user/123456789')
          .send(body)
          .expect(204) //Status code
          .end(function(err,res) {
              if (err) {
                  throw err;
              }
              
              done();
          });
      });

      it('should correctly update a user', function(done) {

        var body = {
          forename: 'Test',
          surname: 'User',
          email: 'test4@test.com'
        };
        var id;

        request(server)
          .post('/user')
          .send(body)
          .end(function(err, res) {
            id = res.body.id;

            var updatedBody = {
              forename: 'Test',
              surname: 'User',
              email: 'updated-test@test.com'
            };

            request(server)
              .put('/user/' + id)
              .send(updatedBody)
              .expect(200) //Status code
              .end(function(err,res) {
                  if (err) {
                      throw err;
                  }
                  
                  res.body.id.should.equal(id);
                  res.body.forename.should.equal('Test');
                  res.body.surname.should.equal('User');
                  res.body.email.should.equal('updated-test@test.com');
                  res.body.updated.should.not.equal(null);
                  done();
              });
          });
      });

      it('should return 409 if user is submitted with an email that already exists', function(done) {
        var body = {
            forename: 'Test',
            surname: 'User',
            email: 'test5@test.com'
        };
        request(server)
          .post('/user')
          .send(body)
          .end(function(err,res) {
              if (err) {
                  throw err;
              }
              
              request(server)
                .post('/user')
                .send(body)
                .expect(409) //Status code
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }

                    res.body.message.should.equal('A user with the e-mail test5@test.com alreedy exists.');
                    
                    done();
                });
          });
      });

    });

  });

});