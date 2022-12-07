import{IsNotEmpty,IsString,MinLength}from'class-validator';
export class CreateNoteDto{
    @IsString()
    @IsNotEmpty({message:'note_title should not be empty, Write a title of your notes'})
    note_title: string;

    @MinLength(10, {
        message: 'description is too short. Minimal length is $constraint1 characters'
      })
    @IsString()
    @IsNotEmpty({message:'description should not be empty, Write a description about your notes'})
    description: string;
}