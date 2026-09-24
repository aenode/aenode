import {
  PartialType,
  PickType,
  Prop,
  ResourceDecoratorFactory,
} from '@aenode/nest';
import { InjectPrismaDelegate } from '@aenode/prisma';
import { Body, Param, ParseIntPipe } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';

export class UserDto implements Prisma.UserModel {
  @Prop() id: number;
  @Prop() createdAt: Date;
  @Prop() updatedAt: Date;
  @Prop() isActive: boolean;

  @Prop({ required: true, format: 'email' }) username: string;
  @Prop({ required: true, format: 'password' }) password: string;
  @Prop() avatar: string;
}

export class UserCreateDto extends PickType(UserDto, [
  'username',
  'password',
  'avatar',
]) {}

export class UserUpdateDto extends PartialType(UserCreateDto) {}

const UserDecoratorFactory = new ResourceDecoratorFactory({
  singularPath: 'user',
  pluralPath: 'users',
  responseType: UserDto,
});

@UserDecoratorFactory.Controller()
export class UserController {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.User)
    protected readonly delegate: Prisma.UserDelegate,
  ) {}

  @UserDecoratorFactory.Find()
  findMany() {
    return this.delegate.findMany({ where: { isActive: true } });
  }

  @UserDecoratorFactory.FindOneById()
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.delegate.findUnique({ where: { id } });
  }
  @UserDecoratorFactory.Create()
  createOne(@Body() data: UserCreateDto) {
    return this.delegate.create({ data });
  }

  @UserDecoratorFactory.UpdateOne()
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserUpdateDto,
  ) {
    return this.delegate.update({ where: { id }, data });
  }

  @UserDecoratorFactory.DeleteOne()
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.delegate.update({ where: { id }, data: { isActive: false } });
  }
}
