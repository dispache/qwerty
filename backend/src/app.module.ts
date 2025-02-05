import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesRepository } from './categories/categories.repository';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('DATABASE_TYPE'), 
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        database: configService.get('DATABASE_NAME'), 
        username: configService.get('DATABASE_USER'), 
        password: configService.get('DATABASE_PASSWORD') 
      } as TypeOrmModuleOptions),
      inject: [ConfigService]
    }),
    CategoriesModule
  ],
  controllers: [AppController, CategoriesController],
  providers: [AppService, CategoriesService, CategoriesRepository],
})
export class AppModule {}
