import sinon from 'sinon';

import {UserService} from '../src/services/user';
import {UserRepository} from '../src/repositories/user';

require('chai')
  .use(require('chai-as-promised'))
  .should();

describe('UserService', () => {
  before(function () {
    this.userStub = {
      id: 1,
      name: 'Sheraz Arshad',
      email: '<sheraz1392@gmail.com>',
    };
  });

  it('should create user', async function () {
    const userRepository = new UserRepository();
    const stub = sinon.stub(userRepository, 'createUser')
      .returns(this.userStub);

    const userService = new UserService(userRepository);
    const user = await userService
      .createUser(this.userStub).should.be.fulfilled;

    stub.calledOnce
      .should.be.true;

    user.name
      .should.be.equal(this.userStub.name);

    user.email
      .should.be.equal(this.userStub.email);
  });

  it('should find user', async function () {
    const userRepository = new UserRepository();
    const stub = sinon.stub(userRepository, 'getUser')
      .withArgs({
        id: this.userStub.d,
      }).returns(this.userStub);

    const userService = new UserService(userRepository);
    const user = await userService
      .getUser({
        id: this.userStub.d,
      }).should.be.fulfilled;

    stub.calledOnce
      .should.be.true;

    user.name
      .should.be.equal(this.userStub.name);

    user.email
      .should.be.equal(this.userStub.email);
  });
});
