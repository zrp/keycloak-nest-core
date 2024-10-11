import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';

import { HelloDevInterceptor } from '../interceptors/hello-dev.interceptor';

export const HelloDev = (
  message: string = 'Hello from Dev By Library Decorator!',
) =>
  applyDecorators(
    SetMetadata('helloDev', message),
    UseInterceptors(HelloDevInterceptor),
  );
