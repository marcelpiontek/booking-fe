export class Event {
    id: string;
    title: string;
    description: string;
    date: Date;
    info?: string;
    maxParticipants: number;
    replyAddress: string;
    location: string;
    tags: string[];
}