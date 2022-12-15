import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { NoteStatus } from "src/note/note.model";

export class getNotesFilterDto{

    @IsOptional()
    @IsIn(Object.values(NoteStatus))
    status: NoteStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}