import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class HelloDevInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<string> {
    const helloDevMessage = this.reflector.get<string>(
      'helloDev',
      context.getHandler(),
    );
    if (helloDevMessage) {
      console.log(helloDevMessage); // Isso vai exibir "Hello from Dev!"
    }
    return next.handle();
  }
}
