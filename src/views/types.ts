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
    item : QueueItem;
    isPaused: boolean;
    timestamp: number;
}