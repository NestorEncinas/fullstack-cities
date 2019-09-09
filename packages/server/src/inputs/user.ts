import { InputType, Field } from "type-graphql";
import { IsEmail } from "class-validator";

import { IsEmailAlreadyExist } from "./emailAlreadyExist";

// firstName, address...
@InputType()
class RegisterInput {
  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({
    message: "Email already exists."
  })
  email: string;

  @Field()
  // regex for strong password
  password: string;
}

export default RegisterInput;

@InputType()
class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  // regex for strong password
  password: string;
}
