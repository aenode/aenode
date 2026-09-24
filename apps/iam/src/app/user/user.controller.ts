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
  @Prop({ example: new Date() }) createdAt: Date;
  @Prop({ example: new Date() }) updatedAt: Date;
  @Prop({ example: true }) isActive: boolean;
  @Prop({ example: 'user@mail.com' }) username: string;
  @Prop({ example: '!Password123.' }) password: string;
  @Prop({ example: 'avatar.svg' }) avatar: string;
  @Prop({ example: 1 }) id: number;
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
