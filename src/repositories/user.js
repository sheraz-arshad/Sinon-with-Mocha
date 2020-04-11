import {UserModel} from '../models/User';

export class UserRepository {
  constructor () {
    this.user = UserModel;
  }

  async createUser ({name, email}) {
    return this.user.create({
      email,
      name,
    });
  }

  async getUser ({id}) {
    return this.user.findOne({id});
  }
}
