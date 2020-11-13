import { Process, Processor, OnQueueActive } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {
    @OnQueueActive()
    onActive(job: Job) {
        console.log(
            `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
    }

    @Process('transcode')
    async transcode(job: Job<unknown>) {
        let progress = 0;
        for (let i = 0; i < 100; i++) {
            console.log(job.data);
            progress += 10;
            job.progress(progress);
        }
        return {};
    }
}