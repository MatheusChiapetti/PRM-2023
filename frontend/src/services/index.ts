import axios from "axios"
import { ICredential, ITopic, IUser } from "../@types"

const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {'Authorization': `Bearer ${token}`}
})

// ENDPOINTS
const _AUTH = '/auth';
const _PROFILE = '/profile';
const _TOPICS = '/topics';

// AUTH
const signIn = (credential: ICredential) => api.post(`${_AUTH}/signin`, credential)
const signUp = (user: IUser) => api.post(`${_AUTH}/signup`, user)

const getProfileByUsername = (username: string) => api.get(`${_PROFILE}`)

const getTopicsByUsername = (username?: string) => { 
    const queryParam = username ? `?username=${username}` : '';
    return api.get(`${_TOPICS}${queryParam}`);
}

const createTopic = (topic: ITopic) => (api.post(_TOPICS, topic));

export {
    signIn,
    signUp,
    getProfileByUsername,
    getTopicsByUsername,
    createTopic
}