import { Controller, Logger } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  private readonly logger = new Logger(CategoriesController.name);

  @EventPattern('create-category')
  async createCategory(
    @Payload() category: Category,
    // @Ctx() context: RmqContext,
  ) {
    this.logger.log(`category: ${JSON.stringify(category)}`);
    await this.categoriesService.createCategory(category);

    /* Apenas caso noAck = true
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    try {
      await this.appService.createCategory(category);
      await channel.ack(originalMessage);
    } catch (err) {
      this.logger.error(`error: ${JSON.stringify(err.message)}`);
    } */
  }

  @MessagePattern('get-categories')
  getCategories(@Payload() _id: string) {
    this.logger.log(`_id: ${_id}`);
    return this.categoriesService.getCategories(_id);
  }

  @MessagePattern('get-categorie-by-name')
  getCategorieByName(@Payload() name: string): Promise<Category> {
    this.logger.log(`name: ${name}`);
    return this.categoriesService.getCategorieByName(name);
  }

  @MessagePattern('put-categories')
  putCategories(@Payload() data: any): Promise<Category> {
    const name: string = data.name;
    const category: Category = data.category;
    this.logger.log(`name: ${name}`);

    return this.categoriesService.updateCategory(name, category);
  }
}
