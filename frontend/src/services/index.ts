import axios from "axios"
import { IComment, ICredential, ILike, ITopic, IUser } from "../@types"

const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: { 'Authorization': `Bearer ${token}` }
})


// ENDPOINTS:
const _AUTH = '/auth';
const _PROFILE = '/profile';
const _TOPICS = '/topics';
const _COMMENTS = '/comments';
const _REPOSTS = '/repost';
const _LIKES = '/likes';      // <== Endpoint para o Like.

// AUTH:
const signIn = (credential: ICredential) => api.post(`${_AUTH}/signin`, credential)
const signUp = (user: IUser) => api.post(`${_AUTH}/signup`, user)

// PROFILE: 
const getProfileByUsername = (username: string) => api.get(`${_PROFILE}/${username}`)

// TOPICS: 
const getTopicsByUsername = (username?: string) => {
    const queryParam = username ? `?username=${username}` : '';
    return api.get(`${_TOPICS}${queryParam}`);
}

const getTopicsById = (id: number) => (api.get(`${_TOPICS}/${id}`));

const createTopic = (topic: ITopic) => (api.post(_TOPICS, topic));

// COMMENTS:
const getCommentsByTopic = (topic: ITopic) => (api.get(`${_COMMENTS}?topic=${topic.id}`));
const createComment = (comment: IComment) => (api.post(_COMMENTS, comment));
const removeComment = (comment: IComment) => (api.delete(`${_COMMENTS}/${comment}`));

// REPOSTS:
const getRepostsByTopic = (topic: ITopic) => (api.get(`${_REPOSTS}?topic=${topic.id}`));

// LIKES:
const getLikesByTopic = (topic: ITopic) => (api.get(`${_LIKES}?topic=${topic.id}`));
const createLike = (comment: ILike) => (api.post(_LIKES, comment));
const removeLike = (comment: ILike) => (api.delete(`${_LIKES}/${ comment}`));

export {
    signIn,
    signUp,
    getProfileByUsername,
    getTopicsByUsername,
    getTopicsById,
    createTopic,

    // Exportação do Comment: 
    getCommentsByTopic,
    createComment,
    removeComment,

    // Exportação do Like:   
    getLikesByTopic,
    createLike,
    removeLike,
    
    // Exportação do Repost: 
    getRepostsByTopic
}