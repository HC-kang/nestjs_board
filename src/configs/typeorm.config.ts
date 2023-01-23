import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'heechan',
  password: 'root',
  database: 'board_app',
  entities: [__dirname + '/../**/*.entity.{js,ts}', Board],
  synchronize: true,
};
