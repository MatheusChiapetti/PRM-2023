import { Box } from "@mui/material";
import HeaderProfile from "../../components/HeaderProfile";
import TopicList from "../../components/TopicsList";

function TopicPage() {

    const profile = {
        fullname: "Matheus Henrique Michels Chiapetti",
        username: "mhchiapetti",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus repellendus at in dolorem ad nemo, cupiditate earum modi facere molestias quasi vero accusantium quaerat dolore ducimus nobis eaque quo tempora.",
        createdAt: "2022-08-13"
    }

    const topics = [

        {
            owner: { fullname: "Pedro" },
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dignissimos officiis adipisci provident aut, vero vel mollitia commodi necessitatibus tempore unde dicta deleniti eius, ab excepturi ducimus quas. Minima, consequuntur.",
            comments: 115,
            reposts: 198,
            likes: 3,
            creatAt: "2023-08-01 19:23:00"
        },
        {
            owner: { fullname: "Pedro da Silva" },
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dignissimos officiis adipisci provident aut, vero vel mollitia commodi necessitatibus tempore unde dicta deleniti eius, ab excepturi ducimus quas. Minima, consequuntur.",
            comments: 178,
            reposts: 44,
            likes: 780,
            creatAt: "2023-08-01 19:23:00"
        },
        {
            owner: { fullname: "Pedro de Souza" },
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dignissimos officiis adipisci provident aut, vero vel mollitia commodi necessitatibus tempore unde dicta deleniti eius ab excepturi ducimus quas. Minima, consequuntur.",
            comments: 15648,
            reposts: 78,
            likes: 0,
            creatAt: "2023-08-01 19:23:00"
        },
        {
            owner: { fullname: "João da Silva" },
            content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis dignissimos officiis adipisci provident aut, vero vel mollitia commodi necessitatibus tempore unde dicta deleniti eius, ab excepturi ducimus quas. Minima, consequuntur.",
            comments: 15,
            reposts: 19,
            likes: 38,
            creatAt: "2023-08-01 19:23:00"
        }
    ]

    return (
        <Box id="topic-page" display="flex" flexDirection="column" alignItems="center" gap={3}>
            <HeaderProfile user={profile} />

            <TopicList items={topics} />
        </Box>
    )
}

export default TopicPage; 