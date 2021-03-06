import { InjectQueue } from '@nestjs/bull';
import { Controller, Post, Get } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('audio')
export class AudioController {
    constructor(@InjectQueue('audio') private readonly audioQueue: Queue) { }

    @Get('transcode')
    transcode() {
        this.audioQueue.add('transcode', {
            file: 'audio.mp3',
        });

        return { "success": true }
    }
}