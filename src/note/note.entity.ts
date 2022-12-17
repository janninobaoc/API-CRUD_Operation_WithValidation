import{BaseEntity,Entity,PrimaryGeneratedColumn,Column} from "typeorm";
import { NoteStatus } from "./note.model";



@Entity()
export class Note extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    note_title: string;

    @Column()
    description: string;

    @Column()
    status: NoteStatus;

    @Column()
    createDate: Date;
}