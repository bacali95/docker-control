import { Controller } from '@nestjs/common';
import { LogClass } from '../../core/log.decorator';

@LogClass
@Controller('public')
export class PublicController {}
