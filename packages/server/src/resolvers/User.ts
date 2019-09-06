require("dotenv").config();
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import Photo from "../entity/Photo";
import User from "../entity/User";
import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from "type-graphql";
import RegisterInput from "../inputs/user";

import { MyContext } from "../types/myContext";

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
  @Mutation(() => String)
  async register(@Arg("registerInput")
  {
    email,
    password
  }: RegisterInput) {
    const user = await this.userRepository.save(
      await this.userRepository.create({
        email,
        password: await bcrypt.hash(password, 10)
      })
    );

    // }).save();
    // const user = await this.userRepository.create({
    //   email,
    //   password: await bcrypt.hash(password, 10)
    // }).save();

    return jsonwebtoken.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1y" }
    );
  }
  // @Mutation(() => User)
  // async register(@Arg("registerInput")
  // {
  //   name,
  //   email,
  //   password
  // }: RegisterInput): Promise<User> {
  //   const hashedPassword = await bcrypt.hash(password, 12);

  //   const user = await User.create({
  //     name,
  //     email,
  //     password: hashedPassword
  //   }).save();

  //   return user;
  // }

  // express ioredis cookie session
  @Mutation(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { user }: MyContext
  ): Promise<User> {
    // moment
    const date = new Date();
    const dbUser = await this.userRepository.findOne({
      where: { email }
    });
    const hashedPassword = await bcrypt.compare(password, user!.password);

    if (!user && !hashedPassword) {
      throw new Error("Invalid password.");
    }
    // return encoded jwt

    return user;
  }
}

export default UserResolver;
