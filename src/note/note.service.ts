import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from 'src/dtos/create-note.dto';
import {v4 as uuidv4} from 'uuid';
import { takeLast } from 'rxjs';
import { getNotesFilterDto } from 'src/dtos/get.notes.filter.dto';
import { NoteStatus } from './note.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';
@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(Note) private noteRepository: Repository<Note>
    ){}

   async getAllNotes(): Promise<Note[]>{
    try {
        const result = await this.noteRepository.find();
        return result;
    } catch (error) {
        //throw error
    }
    // const {status, search} = filterDto;
    // let notes = this.notes;

    // if(status){
    //     notes = notes.filter(x => x.status === status)
    // }
    // if(search){
    //     notes = notes.filter(x => x.note_title.includes(search) || x.description.includes(search))
    // }
    // return notes;
   } 

//    findNoteById(id:uuidv4){
//     return this.notes.find((note) => note.id === id);
//    }

    async getNote(id: number): Promise<Note>{
    try {
        const note = await this.noteRepository.findOneBy({id});
        if(!note){
            throw new NotFoundException("Note not found")
        }
        return note;
        
    } catch (error) {
        //throw error
        }
   }

   async createNote(createNote: CreateNoteDto): Promise<Note>{
    try {
        const newNote = this.noteRepository.create({
            ...createNote,
            status: NoteStatus.OPEN,
            createDate: new Date()
        })
        const result = await this.noteRepository.save(newNote);
        return result;
        
    } catch (error) {
        //throw error   
    }
   }

   async deleteNote(id: number): Promise<void>{
    try {
        const result = this.getNote(id);
        await this.noteRepository.delete({id});
    } catch (error) {
        //throw error
    }
   }

   async updateNote(id: number,status:NoteStatus):  Promise<{}>{
    try {
        const note = this.getNote(id);
        const result = await this.noteRepository.update({id},{status});
        return {
            message:"Successfully updated"
        }
    } catch (error) {
        //throw error
    }
   }
}
