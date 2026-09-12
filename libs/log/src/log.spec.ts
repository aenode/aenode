import { Logger } from './log.js';
describe('iam-db', () => {
  it('should work', () => {
    const logger = new Logger({ context: 'some' });

    logger
      .debug('Debug', { some: true })
      .log('Log')
      .error('Error')
      .info('Info')
      .warn('WaRN');
  });
});
