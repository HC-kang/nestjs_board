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
    {
      id: '2f31ba50-9a51-11ed-a736-51e701ff0a58',
      title: 'board1',
      description: 'description1',
      status: BoardStatus.PUBLIC,
    },
    {
      id: '8edd4e10-9a51-11ed-8ea9-d708fe486df7',
      title: 'board2',
      description: 'description2',
      status: BoardStatus.PRIVATE,
    },
  ];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto): Board {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
