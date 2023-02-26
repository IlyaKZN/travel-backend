import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';

@Injectable()
export class WsJwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client = context.switchToWs().getClient<Socket>();
      const authToken = client.handshake.headers.authorization;
      const res = verify(authToken, 'jwt_secret');

      context.switchToHttp().getRequest().userId = res.sub;
      return true;
    } catch (err) {
      throw new WsException(err.message);
    }
  }
}
