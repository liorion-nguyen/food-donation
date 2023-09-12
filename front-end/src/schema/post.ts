export interface Comment {
    username: string,
    content: string,
    time: string,
}
export interface Actions {
    likes: {
        like: Array<string>,
        love: Array<string>,
        haha: Array<string>,
        sad: Array<string>,
        wow: Array<string>,
    },
    comments: Array<Comment>,
    shares: Array<string>,
}

export interface Postmanager {
    _id: string;
    imgTitle: string;
    title: string;
    rasing: number;
    type: string;
    location: string;
    address: string;
    description: string;
    releaseDate: string;
    status: string;
    author: string;
    actions: Actions;
}