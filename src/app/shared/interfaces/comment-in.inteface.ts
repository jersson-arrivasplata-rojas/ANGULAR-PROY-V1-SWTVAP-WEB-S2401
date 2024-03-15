export interface CommentInInterface {
    id: number | string;
    author: string;
    text: string;
    avatarUrl: string;
    likes: number;
    time: string;
    replies: CommentInInterface[]
}
