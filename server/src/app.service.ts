import { Injectable } from '@nestjs/common';
import { LogClass } from './core/log.decorator';

@LogClass
@Injectable()
export class AppService {}
