require("dotenv").config();
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import moment from "moment";

import Photo from "../entity/Photo";
import User from "../entity/User";
import {
  ObjectType,
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  Authorized,
  Field
} from "type-graphql";
import RegisterInput from "../inputs/user";

import { MyContext } from "../types/myContext";
import { sendEmail } from "../utils/sendEmail";
import createConfirmEmail from "../utils/createConfirmEmailLink";

@ObjectType()
class Tokens {
  @Field(() => String)
  idToken: string;

  @Field(() => String)
  expirationDate: string;

  @Field(() => String)
  refreshToken: string;
}

@Resolver(User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>
  ) {}

  @Query(() => String)
  async hello() {
    return "Hello world!";
  }

  @Authorized()
  @Query(() => User)
  async me(@Ctx() { user }: MyContext): Promise<User | undefined> {
    console.log("AM I HERE?", user);

    return this.userRepository.findOne(user.id);
  }

  @Query(() => User)
  async findUser(@Arg("id") id: number) {
    // Container typedi - check me
    const user = await this.userRepository.findOne(id);
    console.log("User", user);
    if (!user) {
      throw new Error(`User with ID ${id} not found.`);
    }

    return user;
  }

  /**
   * Mutation for register new user.
   * As arguments will ask for email and password
   * Hash de password and add user.id and user.email to jsonwebtoken
   * That will be used on FE to keep session and block certain
   * parts of the application when the user is not logged in
   */
  @Mutation(() => Boolean)
  async register(@Arg("registerInput")
  {
    email,
    password
  }: RegisterInput) {
    const userAlreadyExists = await this.userRepository.findOne({
      where: { email }
    });

    if (userAlreadyExists) {
      throw new Error("User already registered.");
    }

    // create emailLinkSecret will use to compare on confirmationLink that is the same
    const emailLinkSecret = Math.random()
      .toString(36)
      .substring(2);

    const user = await this.userRepository.save(
      await this.userRepository.create({
        email,
        emailLinkSecret,
        password: await bcrypt.hash(password, 10)
      })
    );

    // TODO: create hash for confirmation link and look how @Get mutation works
    await sendEmail(
      email,
      await createConfirmEmail("http://localhost:4000", user)
    );

    return true;
  }

  @Mutation(() => Tokens)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<Tokens | undefined> {
    const dbUser = await this.userRepository.findOne({
      where: { email }
    });

    if (!dbUser) {
      throw new Error("Invalid login.");
    }

    const hashedPassword = await bcrypt.compare(password, dbUser!.password);

    if (!dbUser && !hashedPassword) {
      throw new Error("Invalid password.");
    }

    // access-token
    const idToken = jsonwebtoken.sign(
      { id: dbUser.id },
      process.env.JWT_SECRET!,
      { expiresIn: "2m" }
    );

    // access-token expiration date
    const expirationDate = moment(new Date())
      .add("2", "m")
      .format("YYYY-MM-DD HH:mm:ss");

    const refreshToken = jsonwebtoken.sign(
      { id: dbUser.id, email: dbUser.email },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "1d" }
    );

    await this.userRepository.save(
      Object.assign(dbUser, { expirationDate, refreshToken })
    );
    // refresh-token

    return {
      idToken,
      expirationDate,
      refreshToken
    };
  }
}

export default UserResolver;
