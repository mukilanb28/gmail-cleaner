export interface IUser {
    id: string;
    email: string;
    name: string;
    picture?: string;
}

export interface IProfileResponse {
    user: IUser;
}

export interface IGmailMessage {
    id: string;
    sender: string;
    count: number;
    selected: boolean;
}

export interface IDeleteMessage {
    email: string;
    limitValue: number;
}

