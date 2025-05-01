import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configSerivce: NestConfigService) {}

  get(key: string): string {
    return this.configSerivce.get(key);
  }
}
