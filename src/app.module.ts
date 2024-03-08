import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/sr-admin?authSource=sr-admin',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
