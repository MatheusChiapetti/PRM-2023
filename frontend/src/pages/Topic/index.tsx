import { Alert, Box, Button, Fab, Snackbar, Tab, Tabs, TextField } from "@mui/material";
import HeaderProfile from "../../components/HeaderProfile";
import TopicList from "../../components/TopicsList";
import { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createTopic, getProfileByUsername, getTopicsByUsername } from "../../services";
import { useAuth } from "../../hook/useAuth";
import { ITopic, IUser } from "../../@types";
import AddIcon from "@mui/icons-material/Add"
import { LoadingButton } from "@mui/lab";
import { useTopic } from "../../hook/useTopic";

function TopicPage() {

    const { user } = useAuth();
    const params = useParams();
    const [profile, setProfile] = useState<IUser>({} as IUser);

    const [messageError, setMessageError] = useState('')

    const [profileTopics, setProfileTopics] = useState<ITopic[]>([]);
    // const [topics, setTopics] = useState<ITopic[]>([]);
    const {topics, setTopics} = useTopic();

    const [tab, setTab] = useState(1);
    function handleTabChange(event: SyntheticEvent, newValue: number) {
        setTab(newValue)
    }
    const [messageSuccess, setMessageSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [topicForm, setTopicForm] = useState<ITopic>({} as ITopic)
    function handleShowForm() {
        setShowForm(true);
        setTopicForm({ content: '', owner: user })
    }
    function handleCreateTopic() {
        setLoading(true);

        createTopic(topicForm).then(result => { 
            setProfileTopics([result.data, ...topics]);
            setMessageSuccess('Tópico criado com sucesso! ');
            setTimeout(() => {
                setMessageSuccess('');
            }, 5000);
        }).catch(error => { 
            setMessageError(error.message);
        }).finally(() => {
            setShowForm(false);
            setLoading(false);
        })

    }

    useEffect(() => {

        const username = params.username ? params.username : user?.username;

        if (username) {
            getProfileByUsername(username).then(result => {
                setProfile(result.data);

                return getTopicsByUsername(username).then(result => {
                    setProfileTopics(result.data)
                })
            })
                .catch(error => {
                    setMessageError(String(error.message))
                })
        }

    }, [])

    useEffect(() => {
        if (tab == 1) {
            getTopicsByUsername().then(result => {
                setTopics(result.data)
            })
                .catch(error => {
                    setMessageError(String(error.message))
                })
        }
    }, [tab])

    return (
        <Box id="topic-page" display="flex" flexDirection="column" alignItems="center" gap={3}>
            <HeaderProfile user={profile} />

            <Box className="topic-page-content" style={{ width: '64rem' }}>

                {profile.id == user?.id && (
                    <Tabs value={tab} onChange={handleTabChange}>
                        <Tab value={1} label="Tópicos" />
                        <Tab value={2} label="Meus Tópicos" />
                    </Tabs>
                )}
                {tab == 2 ? (
                    <Box display="flex" flexDirection="column" alignItems="end">
                        {!showForm && (
                            <Fab color="primary" style={{ marginTop: '-3.5rem' }} onClick={handleShowForm}>
                                <AddIcon />
                            </Fab>
                        )}
                        {showForm && (
                            <Box display="flex" flexDirection="column" alignItems="end" gap={3} style={{ marginTop: '2rem', width: '100%' }}>
                                <TextField label="Novo Tópico" placeholder="No que você está pensando?" multiline fullWidth required autoFocus rows={4} disabled={loading} inputProps={{ maxLenght: 250 }} value={topicForm.content} onChange={event => setTopicForm({ ...topicForm, content: (event.target as HTMLInputElement).value })}/>
                                <Box display="flex" flexDirection="row" gap={3}>
                                    <Button size="small" disabled={loading} onClick={() => setShowForm(false)}>
                                        Cancelar
                                    </Button>
                                    <LoadingButton variant="contained" size="small" loading={loading} onClick={handleCreateTopic}>
                                        Comentar
                                    </LoadingButton>
                                </Box>
                            </Box>
                        )}
                        <TopicList items={profileTopics} />

                    </Box>
                ) : (
                    <TopicList items={topics} />
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
            </Box>



        </Box>
    )
}

export default TopicPage; 