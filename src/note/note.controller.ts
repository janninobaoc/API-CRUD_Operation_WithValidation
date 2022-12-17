import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, } from '@nestjs/common';
import { Note, NoteStatus, } from './note.model';
import { CreateNoteDto } from 'src/dtos/create-note.dto';
import { NoteService } from './note.service';
import { getNotesFilterDto } from 'src/dtos/get.notes.filter.dto';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator';
import { ValidationPipe } from '@nestjs/common';
import { NoteStatusValidationPipe } from 'src/pipes/note.status.validation.pipe';
@Controller('notes')
export class NoteController {

    constructor(private noteService: NoteService){}

  
    @Get()
    getNotes(){
        return this.noteService.getAllNotes();
    }
    @Get(':id')
    getNote(@Param('id',ParseIntPipe)id: number)
    {
        return this.noteService.getNote(id);
    }  
    // @Get()
    // getNotes(@Query(ValidationPipe) filterDto: getNotesFilterDto){
    //     return this.noteService.getNotes(filterDto);
    // }

    @Post('create')
    @UsePipes(ValidationPipe)
    createNote(@Body() body: CreateNoteDto){
        return this.noteService.createNote(body)
    }

    @Delete(':id')
    deleteNote(@Param('id',ParseIntPipe)id: number): void{
        this.noteService.deleteNote(id);
    }

    @Patch(':id')
    updateNote(@Param('id',ParseIntPipe)id: number,@Body('status', NoteStatusValidationPipe) status: NoteStatus){
        return this.noteService.updateNote(id,status)
        // @Body('note_title') note_title: string,
        // @Body('description') description: string,
    }
}