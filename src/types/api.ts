export interface Queue {
    items: QueueItem[];
    activeVideo: ActiveVideo;
}

export interface QueueItem {
    id: number;
    thumbnail: string;
    name: string;
    url: string;
}

export interface ActiveVideo {
    item? : QueueItem;
    isPaused?: boolean;
    timestamp?: number;
}

export interface useSocketProps {
    queue: QueueItem[] | null;
    loading: boolean;
    currentVideo: ActiveVideo | undefined;
    sendEvent: <T extends object, >(message: string, data: T) => void;
}