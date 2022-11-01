import { transporter } from '../middleware/transporter';
import messageQueue from '../../../middleware/MessageQueue/messageQueue';
import { getHtmlTemplate } from '../middleware/templates';
import { Job } from 'bullmq';
import { EmailSend } from '../../../interface/email';

// message Queue background Scheduler
messageQueue.setScheduler('emailService');

export const ACTION_EMAIL_REGISTER = 'EMAIL_REGISTER';

const registerEmailSend = async ({ to, from, subject, data }: EmailSend) => {
    try {
        const html = await getHtmlTemplate('default', data);
        await transporter.sendMail({ to, from, subject, html });
        return { status: 'done' };
    } catch (error) {
        return Promise.reject(error);
    }
};

const emailServiceWorker = messageQueue.setWorker(
    'emailService',
    (job: Job<EmailSend, string, string>): Promise<any> => {
        return new Promise((resolve, reject) => {
            try {
                switch (job.name) {
                    case ACTION_EMAIL_REGISTER:
                        registerEmailSend(job.data)
                            .then((result) => resolve(result))
                            .catch((e) => {
                                reject({
                                    status: 'failed',
                                    message: 'SMTP/TRANSPORTER ERROR',
                                });
                            });
                        break;
                    default:
                        reject({
                            status: 'failed',
                            message: 'No action',
                        });
                        break;
                }
            } catch (e) {
                reject({
                    status: 'failed',
                    message: 'SERVER ERROR',
                });
            }
        });
    }
);

// const emailServiceWorker = messageQueue.setWorker(
//     'emailService',
//     (job: Job<EmailRegister, string, string>): Promise<any> => {
//         return Promise.reject('fuck');
//     }
// );

emailServiceWorker.on('completed', (job) => {
    console.log('tutaj done');
    console.log(job.returnvalue);
});

emailServiceWorker.on('failed', (job, tesssst) => {
    console.log('tutaj fieled');
    console.log(tesssst);
});

emailServiceWorker.on('error', (err) => {
    console.log('onError');
    console.log(err);
});
