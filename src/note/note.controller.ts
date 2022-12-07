import { Body, Controller, Delete, Get,Req, Res, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { Note } from './note.model';
import { CreateNoteDto } from 'src/dtos/create-note.dto';
import { NoteService } from './note.service';
import { Request,Response } from 'express';
@Controller('notes')
export class NoteController {

    constructor(private noteService: NoteService){}

  
    @Get(':id')
    getNote(@Param('id')id: string,
    @Req() req:Request,
    @Res() res:Response,
    )
    {
        const note = this.noteService.findNoteById(id);
        if(note){
            res.send(note)
        }else{
            res.status(400).send({ message:'Notes not found!' });
            return note;
        }
    }  
    @Get()
    getNotes(): Note[]{
        return this.noteService.getNotes();
    }

    @Post('create')
    createNote(@Body() body: CreateNoteDto): Note{
        return this.noteService.createNote(body)
    }

    @Delete(':id')
    deleteNote(@Param('id')id: string): void{
        this.noteService.deleteNote(id);
    }

    @Patch(':id')
    updateNote(@Param('id')id: string, @Body('note_title') note_title: string, @Body('description') description: string): Note{
        return this.noteService.updateNote(id, note_title, description)
    }
}
