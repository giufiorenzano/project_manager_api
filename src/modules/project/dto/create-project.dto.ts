import { IsNotEmpty, IsString } from "class-validator";

export class CreateProjectDto {
  @IsNotEmpty({ message: 'O nome do projeto precisa ser definido'})
  @IsString()
  name: string;

  
  description: string;
}
