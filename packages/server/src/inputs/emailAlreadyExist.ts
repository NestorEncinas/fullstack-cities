import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  useContainer
} from "class-validator";
import { Repository } from "typeorm";

import User from "../entity/User";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Container } from "typedi";

// need to injected here couldnt found it otherwise
useContainer(Container);
@ValidatorConstraint({ async: true })
class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User> // private userRepository: Repository<User>
  ) {}

  async validate(email: string) {
    const emailExist = await this.userRepository.findOne({
      where: { email }
    });

    return emailExist ? false : true;
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint
    });
  };
}

export default IsEmailAlreadyExistConstraint;
