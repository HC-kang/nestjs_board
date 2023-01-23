import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });

    const boards = await query.getMany();

    return boards;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async getBoardById(id: number): Promise<Board> {
    const aBoard = await this.boardRepository.findOne({ where: { id } });
    if (!aBoard) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
    return aBoard;
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    // const result = await this.boardRepository.delete({ id, user });
    console.log(user);
    const result = await this.boardRepository
      .createQueryBuilder('board')
      .delete()
      .from(Board)
      .where('id = :id', { id: id })
      .andWhere('userId = :userId', { userId: user.id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const aBoard = await this.getBoardById(id);
    aBoard.status = status;
    await this.boardRepository.save(aBoard);
    return aBoard;
  }
}
