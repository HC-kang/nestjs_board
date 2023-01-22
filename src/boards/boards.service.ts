import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './\bdto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [
    {
      id: '1',
      title: 'Board title 1',
      description: 'Board description 1',
      status: BoardStatus.PUBLIC,
    },
  ];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const board: Board = {
      id: uuid(),
      title: createBoardDto.title,
      description: createBoardDto.description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }
}
