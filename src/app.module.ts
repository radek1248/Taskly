import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TaskModule } from './task/task.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      autoLoadModels: true,
      synchronize: true,
      sync: { alter: true },
      dialect: 'mysql',
      host: process.env.DB_HOST, // Database host
      port: Number(process.env.DB_PORT), // Database port
      username: process.env.DB_USERNAME, // Database username
      password: process.env.DB_PASSWORD, // Database password
      database: process.env.DB_DATABASE_NAME, // Database name
    }),
    TaskModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
