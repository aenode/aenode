import { Prisma } from '@aenode/iam-db';
import { Catch } from '@aenode/nest';
import { PrismaExceptionFilter as _PrismaExceptionFilter } from '@aenode/prisma';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends _PrismaExceptionFilter {}
