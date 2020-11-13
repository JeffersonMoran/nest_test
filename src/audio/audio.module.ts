import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioConsumer } from './audio.processor';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({
    name: 'audio',
  })],
  controllers: [AudioController],
  providers: [AudioConsumer],
})
export class AudioModule {}