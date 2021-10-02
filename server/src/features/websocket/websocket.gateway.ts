import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { LogClass } from '../../core/log.decorator';

type UpdateEvents = string;

@LogClass
@WebSocketGateway({ namespace: 'ws' })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  pingForUpdates(...events: UpdateEvents[]) {
    events.forEach((event) => this.server.emit(event, true));
  }
}
