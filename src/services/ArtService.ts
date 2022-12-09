import { Service } from 'typedi';
import { Art } from '../models';

@Service()
export class ArtService {
  public async getAll(): Promise<Art[]> {
    return Art.findAll({ include: 'comments' });
  }

  public async getOne(id: number): Promise<Art> {
    return Art.findByPk(id, { include: ['comments'] });
  }
}
