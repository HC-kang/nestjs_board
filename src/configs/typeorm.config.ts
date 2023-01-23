import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from 'src/boards/board.entity';

export const typeOrmConfig: TypeOrmModuleOptions =
  process.env.NODE_ENV === 'test'
    ? {
        type: 'sqlite',
        database: 'test.sqlite',
        entities: [__dirname + '/../**/*.entity.{js,ts}', Board],
        synchronize: true,
      }
    : {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'heechan',
        password: 'root',
        database: 'board_app',
        entities: [__dirname + '/../**/*.entity.{js,ts}', Board],
        synchronize: true,
      };
