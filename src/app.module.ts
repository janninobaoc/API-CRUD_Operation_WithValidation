import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { NoteModule } from './note/note.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    NoteModule
  ]
})
export class AppModule {}
