import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';
  import { Summary } from 'prom-client';
  
  const responseTimeSummary = new Summary({
    name: 'http_response_time_seconds',
    help: 'Время ответа HTTP-запроса в секундах',
    labelNames: ['method', 'route', 'status_code'],
  });
  
  @Injectable()
  export class MetricsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const now = Date.now();
  
      const request = context.switchToHttp().getRequest();
      const method = request.method;
      const route = request.route?.path ?? request.url;
  
      return next.handle().pipe(
        tap(() => {
          const response = context.switchToHttp().getResponse();
          const statusCode = response.statusCode;
  
          const duration = (Date.now() - now) / 1000; // в секундах
  
          responseTimeSummary
            .labels(method, route, statusCode.toString())
            .observe(duration);
        }),
      );
    }
  }
  