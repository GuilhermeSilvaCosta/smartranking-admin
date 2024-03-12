import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/sr-admin?authSource=sr-admin',
    ),
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
