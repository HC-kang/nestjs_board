import { ConflictException, InternalServerErrorException } from '@nestjs/common';
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
    try {
      await this.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return newUser;
  }
}
