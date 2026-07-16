import { IsInt, IsString, IsUrl, MaxLength, Min, MinLength } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @MinLength(2)
  @MaxLength(180)
  title: string;

  @IsString()
  @MinLength(10)
  text: string;

  @IsUrl({ require_tld: false })
  @MaxLength(1000)
  image: string;

  @IsInt()
  @Min(0)
  displayOrder: number;
}
