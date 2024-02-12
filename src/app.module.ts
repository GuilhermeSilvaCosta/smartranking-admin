import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from './interfaces/players/player.schema';
import { CategorySchema } from './interfaces/categories/category.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/sr-admin?authSource=sr-admin',
    ),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
