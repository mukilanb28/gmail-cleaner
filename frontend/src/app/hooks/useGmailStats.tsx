import { useEffect, useState } from "react";
import { fetchMessages, deleteMessages } from "../api/gmailApi";
import type { IDeleteMessage, IGmailMessage } from "../models";
import { useAuth } from "../context/AuthContext";
import { useFilter } from "../context/FilterContext";

export const useGmailSenderStats = () => {
    const [messages, setMessages] = useState<IGmailMessage[]>([]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(true);
    const [percentage, setPercentage] = useState(0);
    const { processCount, groupByDomain } = useFilter()
    const [isMessageDeleting, setIsMessagesDeleting] = useState(false);

    const { user } = useAuth();

    const fetchData = async () => {
        if (user) {
            setIsMessagesLoading(true);
            setMessages([]);
            setPercentage(0);
            await fetchMessages(processCount, groupByDomain, setPercentage, (data) => {
                setMessages(data.map((item) => ({ ...item, checked: false })));
                setIsMessagesLoading(false);
            });

        }
    };


    const deleteData = async (payload: IDeleteMessage[]) => {
        setIsMessagesDeleting(true);
        await deleteMessages(payload);
        setIsMessagesDeleting(false);
        await fetchData();

    };

    useEffect(() => {
        fetchData();
    }, [user]);

    return { isMessagesLoading, percentage, messages, refresh: fetchData, deleteData, isMessageDeleting };
}
