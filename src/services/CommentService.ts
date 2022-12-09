import { Inject, Service } from 'typedi';
import { Art, Comment } from '../models';
import { CreateCommentRequest } from '../types';
import { UserService } from '../services';
import { ValidationError } from '../errors';

@Service()
export class CommentService {
  @Inject(() => UserService)
  userService: UserService;
  public async create(params: CreateCommentRequest) {
    if (!params.userId && !params.name) {
      throw new ValidationError('Name required if no userId supplied');
    }

    if (params.userId) {
      const user = await this.userService.getOne(params.userId);
      if (!user) {
        throw new ValidationError('User not found');
      }
      params.name = user.name;
    }

    if (!params.userId) {
      const existingComment = await Comment.findOne({
        where: {
          userId: null,
          artId: params.artId,
          name: params.name,
        },
      });

      if (existingComment) {
        throw new ValidationError('Only 1 comment for that name can be added to this art');
      }
    }

    return Comment.create({
      artId: params.artId,
      userId: params.userId || null,
      name: params.name,
      content: params.content,
    });
  }

  public async getAll(): Promise<Art[]> {
    return Art.findAll({ include: 'comments' });
  }

  public async getOne(id: number): Promise<Art> {
    return Art.findByPk(id, { include: ['comments'] });
  }
}
