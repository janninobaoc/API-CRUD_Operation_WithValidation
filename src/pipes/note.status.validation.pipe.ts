import { ArgumentMetadata,PipeTransform,BadRequestException} from "@nestjs/common"
import { NoteStatus } from "src/note/note.model"

export class NoteStatusValidationPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata){
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is not a valid status`);
        }
        return value;
    }
    private isStatusValid(status: any){
        return Object.values(NoteStatus).includes(status.toUpperCase() as NoteStatus)
    }
}