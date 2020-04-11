import sinon from 'sinon';

import {UserRepository} from '../src/repositories/user';
import {UserModel} from '../src/models/User';

require('chai')
  .use(require('chai-as-promised'))
  .should();


describe('UserRepository', () => {
  before(function () {
    this.userStub = {
      id: 1,
      name: 'Sheraz Arshad',
      email: '<sheraz1392@gmail.com>',
    };
  });

  it('should create user', async function () {
    const stub = sinon.stub(UserModel, 'create')
      .returns(this.userStub);
    const userRepository = new UserRepository();

    const newUser = await userRepository.createUser({
      ...this.userSub,
    }).should.be.fulfilled;

    stub.calledOnce
      .should.be.true;

    newUser.name
      .should.be.equal(this.userStub.name);

    newUser.email
      .should.be.equal(this.userStub.email);
  });

  it('should find user', async function () {
    const stub = sinon.stub(UserModel, 'findOne')
      .withArgs({
        id: this.userStub.id,
      }).returns(this.userStub);

    const userRepository = new UserRepository();
    const user = await userRepository.getUser({
      id: this.userStub.id,
    }).should.be.fulfilled;

    stub.calledOnce
      .should.be.true;

    user.name
      .should.be.equal(this.userStub.name);

    user.email
      .should.be.equal(this.userStub.email);
  });
});
