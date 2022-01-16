import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import { useDispatch, useSelector } from "react-redux";
import {
    loadComments,
    getCommentsLoading,
    getComments,
    removeComment,
    createComment
} from "./../../store/comments";
import { getCurrentUserId } from "../../store/users";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUserId());
    useEffect(() => {
        dispatch(loadComments(userId));
    }, []);

    const isLoading = useSelector(getCommentsLoading());
    const comments = useSelector(getComments());

    const handleSubmit = (data) => {
        const comment = {
            ...data,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId,
            _id: nanoid()
        };

        dispatch(createComment(comment));
    };
    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
