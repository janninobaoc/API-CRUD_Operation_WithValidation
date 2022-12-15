import { Body, Controller, Delete, Get, Param, Patch, Post, } from '@nestjs/common';
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

  
    @Get(':id')
    getNote(@Param('id')id: string,)
    {
        return this.noteService.getNote(id);
    }  
    @Get()
    getNotes(@Query(ValidationPipe) filterDto: getNotesFilterDto){
        return this.noteService.getNotes(filterDto);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createNote(@Body() body: CreateNoteDto): Note{
        return this.noteService.createNote(body)
    }

    @Delete(':id')
    deleteNote(@Param('id')id: string): void{
        this.noteService.deleteNote(id);
    }

    @Patch(':id')
    updateNote(@Param('id')id: string,@Body('status', NoteStatusValidationPipe) status: NoteStatus): Note{
        return this.noteService.updateNote(id,status)
        // @Body('note_title') note_title: string,
        // @Body('description') description: string,
    }
}