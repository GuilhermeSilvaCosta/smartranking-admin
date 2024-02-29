import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Category } from './interfaces/categories/category.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @EventPattern('create-category')
  async createCategory(
    @Payload() category: Category,
    // @Ctx() context: RmqContext,
  ) {
    this.logger.log(`category: ${JSON.stringify(category)}`);
    await this.appService.createCategory(category);

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
  getCategories(@Payload() _id: string): Promise<Category[]> {
    this.logger.log(`_id: ${_id}`);
    return this.appService.getCategories(_id);
  }

  @MessagePattern('get-categorie-by-name')
  getCategorieByName(@Payload() name: string): Promise<Category> {
    this.logger.log(`name: ${name}`);
    return this.appService.getCategorieByName(name);
  }

  @MessagePattern('put-categories')
  putCategories(@Payload() data: any): Promise<Category> {
    const name: string = data.name;
    const category: Category = data.category;
    this.logger.log(`name: ${name}`);

    return this.appService.updateCategory(name, category);
  }
}
