import {
  type ArgumentsHost,
  BadRequestException,
  type ExceptionFilter,
} from '@nestjs/common';

import type Prisma from '@prisma/client/runtime/client.js';

export class PrismaExceptionFilter
  implements ExceptionFilter<Prisma.PrismaClientKnownRequestError>
{
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    const response = host.switchToHttp().getResponse();

    const error = this.getError(exception);

    const badRequestError = new BadRequestException({ errors: [error] });

    response
      .status(badRequestError.getStatus())
      .json(badRequestError.getResponse());
  }

  private getError(exception: Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
      /**
       * Record not found.
       */
      case 'P2025':
        return {
          constraint: 'notFound',
          message: 'Not found',
          property: 'N/A',
        };

      /**
       * Unique constraint violation.
       * \P2002
       */
      case 'P2002': {
        const cause = (exception.meta as any).driverAdapterError.cause;

        const property = Object.values(
          cause.constraint as Record<string, string>,
        )
          .map((e) =>
            e.replace(cause.table, '').replace(/key/gi, '').replace(/_/g, ''),
          )
          .join(',');

        return {
          property: property ?? 'Unknown',
          constraint: 'unique',
          message: `${property} must be unique`,
        };
      }

      /**
       * All other known Prisma errors.
       */
      default: {
        return {
          property: 'N/A',
          constraint: 'prisma',
          message: 'Something went wrong',
        };
      }
    }
  }
}
