import TopicCardBody from "../TopicCardBody";
import TopicCardHeader from "../TopicCardHeader";
import TopicCardActions from "../TopicCardActions";
import { IComment, ILike, ITopic, IUser } from "../../@types";
import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import TopicComment from "../TopicComment";
import { createComment, createLike, createTopic, getCommentsByTopic, getLikesByTopic, getRepostsByTopic, getTopicsById, removeLike } from "../../services";
import { useAuth } from "../../hook/useAuth";
import { useTopic } from "../../hook/useTopic";

type TopicCardProps = {
    topic: ITopic
}

function TopicCard({
    topic
}: TopicCardProps) {

    // USER
    const { user } = useAuth();

    // TOPIC
    const { topics, setTopics } = useTopic();

    // STATES - CONTROL
    const [messageError, setMessageError] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');

    // COMMENTS
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState<IComment>({} as IComment);
    const [comments, setComments] = useState<IComment[]>([]);
    const [totalComments, setTotalComments] = useState(0);

    const handleClickComment = () => {
        setShowComments(!setComments);
    }
    const postComment = async (contentText: string): Promise<void> => {

        // Preparar um comentário para ser enviado: 
        const commentForm: IComment = {
            user: user,
            topic: topic,
            content: contentText
        }

        createComment(commentForm)
            // PROVA: Igual no LIKE.
            .then(result => {
                setComment(result.data);
                setTotalComments(totalComments + 1);

                setComments([...comments, result.data]);

                setMessageSuccess("Comentário efetuado com sucesso!");
                setTimeout(() => {
                    setMessageSuccess('');
                }, 5000);
            })
            .catch(error => {
                setMessageError(error.message)
            })

    }

    // REPOSTS
    const [topicReposted, setTopicReposted] = useState<ITopic>();
    const [reposters, setReposters] = useState<IUser[]>([]); // <== Talves tenha que implementar um para o LIKE (PROVA).
    const handleClickRepost = () => {

        const repostForm: ITopic = {
            owner: user,
            repost: topic,
            content: topic.content
        }

        createTopic(repostForm)
            .then(result => {
                setReposters([...reposters, result.data.owner]);
                setTopics([result.data, ...topics]);
                setMessageSuccess("Tópico repostado com sucesso!");
                setTimeout(() => {
                    setMessageSuccess('');
                }, 5000);
            })
            .catch(error => {
                setMessageError(error.message)
            })
    }

    // LIKES
    const [likers, setLikers] = useState<IUser[]>([]);
    const [totalLikes, setTotalLikes] = useState(0);
    const [like, setLike] = useState<ILike>({} as ILike);

    const handleClickLike = () => {

        const likeForm: ILike = {
            user: user,
            topic: topic
        }

        createLike(likeForm)
            .then(result => {
                const dados: ILike[] = result.data;
                const found = dados.find(item => (item.user?.id == user?.id))
                
                if (found) {
                    setLike(found);
                    setLikers([...likers]);
                    setTotalLikes(totalLikes - 1);
                }

                setLikers([...likers, result.data]);
                setTotalLikes(totalLikes + 1);
            })
            .catch(error => {
                setMessageError(error.message)
            })

    }

    // EFFECT
    useEffect(() => {

        // Comments.
        getCommentsByTopic(topic)
            .then(result => {
                const dados: IComment[] = result.data;
                setComments(dados);
                setTotalComments(dados.length);

                // Verificar se o usuário comentou esse tópico: 
                const found = dados.find(item => (item.user?.id == user?.id))
                // PROVA: Usa-se no LIKE:
                if (found) {
                    setComment(found);
                }
            })
            .catch(error => {
                setMessageError(error.message);
            });

        // Reposts.
        if (topic.topic_id) {
            getTopicsById(topic.topic_id)
                .then(result => {
                    setTopicReposted(result.data)
                })
                .catch(error => {
                    setMessageError(error.message);
                });
        }

        getRepostsByTopic(topic)
            .then(result => {
                const dados: ITopic[] = result.data;
                const users: IUser[] = []
                dados.forEach(topic => {
                    if (topic.owner) {
                        users.push(topic.owner)
                    }
                })
                setReposters(users);
            })
            .catch(error => {
                setMessageError(error.message);
            });


        // Likes.
        getLikesByTopic(topic)
            .then(result => {
                const dados: ILike[] = result.data;
                const users: IUser[] = []
                dados.forEach(topic => {
                    if (topic.user) {
                        users.push(topic.user)
                    }
                })
                setLikers(users);

                const found = dados.find(item => (item.user?.id == user?.id))
                if (found) {
                    setLike(found);
                }
            })
            .catch(error => {
                setMessageError(error.message);
            });

    }, []);

    return (
        <div id="topic-card">
            <TopicCardHeader createdAt={topic.createdAt} owner={topic.owner} />
            <TopicCardBody content="topic.content" topicReposted={topicReposted} />
            <TopicCardActions
                commented={Boolean(comment.user)}
                totalComments={totalComments}
                clickComment={handleClickComment}
                reposters={reposters}
                clickRepost={handleClickRepost}
                clickLike={handleClickLike}
                totalLikes={totalLikes}
                likers={likers}
                liked={Boolean(like.user)}
            />

            {showComments && (
                <TopicComment
                    comments={comments}
                    postComment={postComment} />
            )}

            <Snackbar
                open={Boolean(messageError)}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert severity="error" variant="filled" onClose={() => setMessageError('')}>
                    {messageError}
                </Alert>
            </Snackbar>
            <Snackbar
                open={Boolean(messageSuccess)}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert severity="success" variant="filled" onClose={() => setMessageSuccess('')}>
                    {messageSuccess}
                </Alert>
            </Snackbar>

        </div>
    )
}

export default TopicCard;