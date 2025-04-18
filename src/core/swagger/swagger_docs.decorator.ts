import { applyDecorators, Type } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiBody, ApiResponse } from '@nestjs/swagger';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface SwaggerDocsOptions {
  summary: string;
  description?: string;
  method: HttpMethod;
  bodyType?: Type<any>;
  queryParams?: any[];
  response?: any[];
}

export function SwaggerDocs(options: SwaggerDocsOptions) {
  const decorators = [
    ApiOperation({
      summary: options.summary,
      description: options.description,
    })
  ];

  // Configurações específicas por método
  // if (options.method == 'get' && !options.queryParams) {
  //   decorators.push(
  //     ApiQuery({ name: 'page', required: false, type: Number }),
  //   );
  // }


  if (options.queryParams) {

    options.queryParams.forEach(param => {
      decorators.push(
        ApiQuery({ name: param, required: false }),
      );
    });

  }


  if (options.response) {
    options.response.forEach(response => {
      decorators.push(
        ApiResponse(response),
      );
    });

  }




  if (['post', 'put', 'patch'].includes(options.method) && options.bodyType) {
    decorators.push(ApiBody({ type: options.bodyType }));
  }


  return applyDecorators(...decorators);
}
