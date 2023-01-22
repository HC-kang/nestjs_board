import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.model';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}
