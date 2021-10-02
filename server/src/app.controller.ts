import { Controller } from '@nestjs/common';
import { LogClass } from './core/log.decorator';

@LogClass
@Controller()
export class AppController {}
