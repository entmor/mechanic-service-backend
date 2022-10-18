export interface EmailSend {
    to: string;
    from: string;
    subject: string;
    data?: Array<{
        from: string;
        to: string;
    }>;
}
