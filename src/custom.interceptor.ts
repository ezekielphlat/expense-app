import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs';
export class CustomIterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    //any thing outside the return statement is itercepting the request
    console.log('THIS IS INTERCEPTING THE REQUEST');
    console.log({ context });
    // anything inside the return map will intercept the response
    return handler.handle().pipe(
      map((data) => {
        console.log('THIS IS INTERCEPTING THE RESPONSE');
        // console.log({ data });
        const response = {
          ...data,
          createdAt: data.created_at,
        };
        delete response.updated_at;
        delete response.created_at;
        return response;
      }),
    );
  }
}
