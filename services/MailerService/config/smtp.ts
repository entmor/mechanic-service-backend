/**
 *  Settings for NODEMAILER
 *  http://nodemailer.com/
 **/

export default [
    {
        // host: 'mail1.mydevil.net',
        host: '212.91.26.152',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'kontakt@domowe-alko.pl',
            pass: 'tapVpYP3Jdb9m8hULY75',
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
        },
        debug: false,
        logger: false,
    },
];
