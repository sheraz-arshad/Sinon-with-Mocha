import sinon from 'sinon';

import {UserController} from '../src/controllers/user';
import {UserService} from '../src/services/user';

require('chai')
  .use(require('chai-as-promised'))
  .should();

describe('UserController', () => {
  before(function () {
    this.data = {
      res: {
        json: sinon.spy(),
        status: sinon.stub(),
      },
    };

    this.data.res.status
      .returns(this.data.res);

    this.userStub = {
      id: 1,
      name: 'Sheraz Arshad',
      email: '<sheraz1392@gmail.com>',
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  it('should not create user when name is not provided', async function () {
    const userRepository = sinon.spy();
    const userService = new UserService(userRepository);
    const stub = sinon.stub(userService, 'createUser');

    const userController = new UserController(userService);
    const req = {
      body: {
        email: this.userStub.email,
      },
    };

    const {res} = this.data;
    await userController.createUser(req, res);

    stub.calledOnce
      .should.be.false;

    res.status.args[0][0]
      .should.be.equal(400);

    res.json.args[0][0]
      .should.be.equal('Name is not provided');
  });

  it('should not create user when email is not provided', async function () {
    const userRepository = sinon.spy();
    const userService = new UserService(userRepository);
    const stub = sinon.stub(userService, 'createUser');

    const userController = new UserController(userService);
    const req = {
      body: {
        name: this.userStub.name,
      },
    };
    const {res} = this.data;
    await userController.createUser(req, res);

    stub.calledOnce
      .should.be.false;

    res.status.args[1][0]
      .should.be.equal(400);

    res.json.args[1][0]
      .should.be.equal('Email is not provided');
  });

  it('should create user', async function () {
    const userRepository = sinon.spy();
    const userService = new UserService(userRepository);
    const stub = sinon.stub(userService, 'createUser')
      .withArgs({
        name: this.userStub.name,
        email: this.userStub.email,
      }).returns(this.userStub);

    const userController = new UserController(userService);
    const req = {
      body: {
        name: this.userStub.name,
        email: this.userStub.email,
      },
    };
    const {res} = this.data;
    await userController.createUser(req, res);

    stub.calledOnce
      .should.be.true;

    res.status.args[2][0]
      .should.be.equal(200);

    res.json.args[2][0]
      .should.be.equal(this.userStub);
  });

  it('should get user by id', async function () {
    const userRepository = sinon.spy();
    const userService = new UserService(userRepository);
    const stub = sinon.stub(userService, 'getUser')
      .withArgs({
        id: this.userStub.id,
      }).returns(this.userStub);

    const userController = new UserController(userService);
    const req = {
      body: {
        id: this.userStub.id,
      },
    };
    const {res} = this.data;
    await userController.getUser(req, res);

    stub.calledOnce
      .should.be.true;

    res.status.args[3][0]
      .should.be.equal(200);

    res.json.args[3][0]
      .should.be.equal(this.userStub);
  });
});
