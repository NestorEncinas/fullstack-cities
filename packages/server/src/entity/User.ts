import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { IsEmail } from "class-validator";

type Lazy<T extends object> = Promise<T> | T;

@ObjectType()
@Entity()
class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("varchar", { unique: true, length: 255 })
  @IsEmail()
  email: string;

  @Column("text")
  password: string;

  // field to check if user has confirmed the register email
  @Field()
  @Column({ default: false })
  confirmed: boolean;

  // hash to validate confirmationEmailLink
  @Field()
  @Column({ nullable: false })
  emailLinkSecret: string;

  // idToken expiration date, will be null until user login to the app
  @Field()
  @Column("datetime", {
    nullable: true
  })
  expirationDate: Date;
}

export default User;
