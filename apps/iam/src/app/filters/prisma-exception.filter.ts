import { Prisma } from '@aenode/iam-db';
import {
  type ArgumentsHost,
  BadRequestException,
  Catch,
  type ExceptionFilter,
  InputValiationErrorDto,
} from '@aenode/nest';

@Catch(Prisma.PrismaClientKnownRequestError)
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

  private getError(
    exception: Prisma.PrismaClientKnownRequestError,
  ): InputValiationErrorDto {
    switch (exception.code) {
      /**
       * Record not found.
       */
      case 'P2025':
        return new InputValiationErrorDto({
          constraint: 'notFound',
          message: 'Not found',
          property: 'N/A',
        });

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

        return new InputValiationErrorDto({
          property: property ?? 'Unknown',
          constraint: 'unique',
          message: `${property} must be unique`,
        });
      }

      /**
       * All other known Prisma errors.
       */
      default: {
        return new InputValiationErrorDto({
          property: 'N/A',
          constraint: 'prisma',
          message: 'Something went wrong',
        });
      }
    }
  }
}
