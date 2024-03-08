import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/category.interface';
import { Player } from 'src/players/interfaces/player.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(CategoriesService.name);

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

  getCategories(_id: string): Promise<Category[]> {
    try {
      return _id ? this.categoryModel.find({ _id }) : this.categoryModel.find();
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err)}`);
      throw new RpcException(err.message);
    }
  }

  getCategorieByName(name: string): Promise<Category> {
    try {
      return this.categoryModel.findOne({ name });
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err)}`);
      throw new RpcException(err.message);
    }
  }

  async updateCategory(name: string, category: Category): Promise<Category> {
    try {
      const result = await this.categoryModel.findOneAndUpdate(
        { name },
        category,
        { new: true },
      );

      if (!result) throw new NotFoundException(`Category ${name} not found.`);

      return result;
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err)}`);
      throw new RpcException(err.message);
    }
  }
}
