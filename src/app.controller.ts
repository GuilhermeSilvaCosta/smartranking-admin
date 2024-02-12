import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Category } from './interfaces/categories/category.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @EventPattern('create-category')
  async createCategory(@Payload() category: Category) {
    this.logger.log(`category: ${JSON.stringify(category)}`);
    this.appService.createCategory(category);
  }

  @MessagePattern('get-categories')
  getCategories(@Payload() _id: string): Promise<Category[]> {
    this.logger.log(`_id: ${_id}`);
    return this.appService.getCategories(_id);
  }
}
