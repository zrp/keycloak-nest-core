import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsUUID } from "class-validator";

import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsUUID(4, { message: "O ID fornecido não é um UUID válido" })
  @IsNotEmpty({ message: "O ID é obrigatório" })
  id: string;
}
