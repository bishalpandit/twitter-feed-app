interface ServerToClientEvents {
    "tweet:create": (data: {
        content: string;
        image: string;
        user_id: string;
        likes: [],
        comments: []
    }) => void;
}

interface ClientToServerEvents {
}
