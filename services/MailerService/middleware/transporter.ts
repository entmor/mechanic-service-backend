import smtpConfig from '../config/smtp';

// lib
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

/* ###############~~TRANSPORT~~############### */

export const transporter = nodemailer.createTransport(smtpConfig[0]);

/* ###############~~TEMPLATER~~############### */

// export const getHtmlTemplate = (name: string, array: Array<any>) => {
//     let _html = fs.readFileSync(path.resolve(__dirname, `../../../mailTemplates/${name}.html`), {
//         encoding: 'utf8',
//         flag: 'r+',
//     });
//
//     array.forEach(function (item, index) {
//         _html = _html.replace(item.from, item.to);
//     });
//
//     return _html;
// };
