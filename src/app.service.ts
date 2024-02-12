import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/categories/category.interface';
import { Model } from 'mongoose';
import { Player } from './interfaces/players/player.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(AppService.name);

  async createCategory(category: Category): Promise<Category> {
    try {
      const { name } = category;

      const found = await this.categoryModel.findOne({ name }).exec();
      if (found) throw new RpcException(`Category ${name} already exist.`);

      return this.categoryModel.create(category);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err)}`);
      throw new RpcException(err.message);
    }
  }
}
