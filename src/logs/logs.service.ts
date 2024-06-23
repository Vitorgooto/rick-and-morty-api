import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { Log } from './schemas/log.schema';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  async create(logData: { route: string; method: string; duration: number; timestamp: Date }): Promise<Log> {
    const log = new this.logModel(logData);
    return log.save();
  }
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logsService: LogsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', async () => {
      const duration = Date.now() - start;
      const logData = {
        route: req.originalUrl,
        method: req.method,
        duration,
        timestamp: new Date(),
      };
      await this.logsService.create(logData);
    });
    next();
  }
}
