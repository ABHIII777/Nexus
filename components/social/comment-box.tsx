import { id } from "date-fns/locale";
import { Trash2 } from "lucide-react";

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
    },
    isProfileView?: boolean
}

export default function CommentBox({ comment, isProfileView }: CommentProps) {

    const handleDelete = async() => {
        try {
            const data = await fetch("/api/comments", {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({id: comment.id})
            });

            if (data.ok) {
                window.location.reload();
            } else {
                const res = await data.json()
                console.error("Failed to delete the comment: ", res)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="mt-3 space-y-3">
            <div className="border p-3 rounded">
                <p>{comment.user.name}</p>
                <p className="text-sm">{comment.content}</p>
            </div>
            {
                isProfileView && (
                    <button
                        className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                        title="Delete Comment"
                        onClick={handleDelete}
                    >
                        <Trash2 className="h-3 w-3" />
                        Delete
                    </button>
                )
            }
        </div>
    );
}