interface CommentProps {
    comment: {
        id: string,
        content: string,
        userId: string,
        postId: string,
        user : {
            id: string,
            name: string
        }
    }
}

export default function CommentBox({ comment }: CommentProps) {
    return (
        <div className="mt-3 space-y-3">
            <div className="border p-3 rounded">
                <p>{comment.user.name}</p>
                <p className="text-sm">{comment.content}</p>
            </div>
        </div>
    );
}