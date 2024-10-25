import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: "O nome é obrigatório" })
  name: string;

  @IsEmail({}, { message: "O email fornecido é inválido" })
  @IsNotEmpty({ message: "O email é obrigatório" })
  email: string;

  @IsString()
  @IsNotEmpty({ message: "A senha é obrigatória" })
  @MinLength(6, { message: "A senha deve ter pelo menos 6 caracteres" })
  password: string;
}
