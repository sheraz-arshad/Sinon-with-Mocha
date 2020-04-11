export class UserService {
  constructor (userRepository) {
    this.userRepository = userRepository;
  }

  async createUser (data) {
    return await this.userRepository
      .createUser(data);
  }

  async getUser (data) {
    return await this.userRepository
      .getUser(data);
  }
}
