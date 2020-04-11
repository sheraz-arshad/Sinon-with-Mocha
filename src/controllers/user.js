export class UserController {
  constructor (userService) {
    this.userService = userService;
  }

  // eslint-disable-next-line no-unused-vars
  async createUser (req, res, next) {
    const {name, email} = req.body;

    if (!name) {
      return res.status(400)
        .json('Name is not provided');
    }

    if (!email) {
      return res.status(400)
        .json('Email is not provided');
    }

    const user = await this.userService.createUser({
      ...req.body,
    });

    return res.status(200)
      .json(user);
  }

  // eslint-disable-next-line no-unused-vars
  async getUser (req, res, next) {
    const user = await this.userService.getUser({
      ...req.body,
    });
    return res.status(200)
      .json(user);
  }
}
