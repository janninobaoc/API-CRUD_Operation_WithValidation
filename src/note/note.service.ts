import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from 'src/dtos/create-note.dto';
import { Note, NoteStatus } from './note.model';
import {v4 as uuidv4} from 'uuid';
import { takeLast } from 'rxjs';
import { getNotesFilterDto } from 'src/dtos/get.notes.filter.dto';
@Injectable()
export class NoteService {
    private notes: Note[] = [
        
        // {
        //     "id": "347d2eae-1acb-46b5-96f3-84c26583a281",
        //     "note_title": "Web dev note",
        //     "description": "This is Web dev notes",
        //     "status":
        // },
        // {
        //         "id": "ab1c9aab-ae36-4db3-ada4-14ddf3b50fa7",
        //         "note_title": "Group 3-C note",
        //         "description": "This is Group 3-C Web dev notes",
        //         "status"
        // }
        
    ];

   getNotes(filterDto: getNotesFilterDto): Note[]{
    const {status, search} = filterDto;
    let notes = this.notes;

    if(status){
        notes = notes.filter(x => x.status === status)
    }
    if(search){
        notes = notes.filter(x => x.note_title.includes(search) || x.description.includes(search))
    }
    return notes;
   } 

   findNoteById(id:uuidv4){
    return this.notes.find((note) => note.id === id);
   }

   getNote(id: string): Note{
    const note = this.notes.find(note => note.id == id);
    if(!note){
        throw new NotFoundException(`Notes with id ${id} not found`);
    }
    return note;
   }

   createNote(note: CreateNoteDto): Note{
    const {note_title, description} = note;

    const newNote: Note ={
        id: uuidv4(),
        note_title,
        description,
        status: NoteStatus.OPEN,
    }
    this.notes.push(newNote);
    return newNote;
   }

   deleteNote(id: string): void{
    const result = this.getNote(id);
    this.notes = this.notes.filter(note => note.id !== result.id);
   }

   updateNote(id: string,status:NoteStatus): Note{
    const note = this.getNote(id);
    // note.note_title= note_title;
    // note.description = description;
    note.status = status;
    return note;
   }
}
