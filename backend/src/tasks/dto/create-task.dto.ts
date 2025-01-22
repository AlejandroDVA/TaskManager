import { IsString, IsNotEmpty, IsBoolean, IsArray, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  completed: boolean;

  @IsArray()
  @IsNotEmpty({ each: true })
  tags: string[];

  @IsDate()
  @IsNotEmpty()
  dueDate: Date;
}
