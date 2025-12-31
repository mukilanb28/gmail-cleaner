import type { ReactNode } from "react";
import type { IUser } from "../models";

export interface IAuthContext {
    user: IUser | null;
    isUserLoading: boolean;
    login: () => void;
    logout: () => Promise<void>;
}

export interface IAuthProviderProps {
    children: ReactNode;
}

export interface IFilterContext {
    processCount: number;
    groupByDomain: boolean;
    onChangeProcessCount: (value: number) => void;
    onChangeGroupByDomain: (value: boolean) => void;
}

export interface IFilterProviderProps {
    children: ReactNode;
}