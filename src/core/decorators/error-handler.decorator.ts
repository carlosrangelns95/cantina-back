import { HttpException, HttpStatus, Logger } from '@nestjs/common';
// import { ValidationError } from 'yup';
  const logger = new Logger('HandleErrors', { timestamp: true });

export function HandleErrors(context: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {

        // Tratamento de erros do Yup
        // if (error instanceof ValidationError) {
        //   throw new HttpException(
        //     { message: 'Validation failed', errors: error.errors, status: HttpStatus.BAD_REQUEST },
        //     HttpStatus.BAD_REQUEST
        //   );
        // }

        // Tratamento de erros "Not Found"
        if (error instanceof Error && error.message.includes('not found')) {
          logger.error(`Error in ${context}: ${error.message}`);
          throw new HttpException(
            { message: error.message, errors: [error.message], status: HttpStatus.NOT_FOUND },
            HttpStatus.NOT_FOUND
          );
        }

        // Erros genéricos
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        logger.error(`Error in ${context}: ${errorMessage}`);
        throw new HttpException(
          { message: `Error in ${context}`, errors: [errorMessage], status: HttpStatus.BAD_REQUEST },
          HttpStatus.BAD_REQUEST
        );
      }
    };

    return descriptor;
  };
}