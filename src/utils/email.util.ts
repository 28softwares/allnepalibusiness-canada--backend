import nodemailer from 'nodemailer';
import { DotEnvConfig } from '../config/dotenv.config';
// import tokenService from "../services/token/token.service";

export enum MailType {
    RESET_PASSWORD = 'RESET_PASSWORD',
    LOGIN_OTP = 'LOGIN_OTP',
    NEW_OTP = 'NEW _OTP',
    NOTIFICATION = 'NOTIFICATION',
}

class EmailUtil {
    async sendMail(
        to: string,
        mailType: MailType,
        otp?: number,
        token?: string,
        message?: string,
    ) {
        const transporter = nodemailer.createTransport({
            host: DotEnvConfig.MAIL_HOST,
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: DotEnvConfig.MAIL_USER,
                pass: DotEnvConfig.MAIL_PASSWORD,
            },
        });
        const { subject, body } = await this.getTemplate(
            to,
            mailType,
            otp,
            token,
            message,
        );
        try {
            await transporter.sendMail({
                from: DotEnvConfig.MAIL_USER,
                to,
                subject,
                text: body,
                html: body,
            });
        } catch (e: any) {
            console.log('mail error issue', e);
            throw new Error(e);
        }
    }

    private async getTemplate(
        email: string,
        mailType: MailType,
        otp?: number,
        token?: string,
        message?: string,
    ) {
        let subject, body;
        switch (mailType) {
            case MailType.RESET_PASSWORD: {
                const link = `${DotEnvConfig.FRONTEND_BASE_URL}/reset-password?token=${token}`;

                subject = 'Reset password';
                body = `Your Reset Link is <b><a href=${link}>${link}</a></b> <br/><br/> <small>Note: This link will expire in 10 minutes</small>`;
                break;
            }
            case MailType.NEW_OTP: {
                subject = 'Account verification OTP';
                body = `here is your otp for verification ${otp}`;
                break;
            }
            case MailType.NOTIFICATION: {
                subject = `There is an Update for you from Nepali Rental Community in Canada`;
                body = message;
                break;
            }
        }
        return { subject, body };
    }
}

export default new EmailUtil();
