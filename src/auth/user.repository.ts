import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

type NewType = User;

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<NewType> {
    const { username, password } = authCredentialDto;
    const newUser = this.create({ username, password });
    await this.save(newUser);
    return newUser;
  }
}
