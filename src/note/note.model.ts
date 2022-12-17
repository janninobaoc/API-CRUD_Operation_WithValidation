import { title } from "process"
export interface Note{
    id: number,
    note_title: string,
    description: string,
    status: NoteStatus
}
export enum NoteStatus{
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}