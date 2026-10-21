import { Injectable, OnModuleInit } from '@nestjs/common';
import { Histogram, Registry } from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {
  public registry: Registry;
  public httpRequestDuration: Histogram<string>;

  onModuleInit() {
    this.registry = new Registry();

    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.05, 0.1, 0.3, 0.5, 1, 1.5, 2, 5],
      registers: [this.registry],
    });
  }

  getMetrics(): Promise<string> {
    return this.registry.metrics();
  }
}
