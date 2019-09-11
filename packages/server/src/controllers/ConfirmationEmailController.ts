import {
  Controller,
  Get,
  Params,
  useContainer,
  Redirect
} from "routing-controllers";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Repository } from "typeorm";

import User from "../entity/User";
import { Container } from "typedi";

useContainer(Container);
@Controller()
export class ConfirmationEmailController {
  @InjectRepository(User) private userRepository: Repository<User>;

  @Get("/confirm/:id/:token")
  @Redirect(`http://localhost:3000/login`)
  // type me
  async confirmEmail(@Params() { id, token }: any) {
    const userExist = await this.userRepository.findOne({
      id,
      emailLinkSecret: token,
      confirmed: false
    });

    if (!userExist) {
      // 404
      return "http://localhost:3000/notFound";
      // return `${process.env.FE_LINK}/notFound`
    }

    // confirm on login to check if the user has confirmed email
    await this.userRepository.update(id, {
      confirmed: true
    });

    return true;
  }
}
