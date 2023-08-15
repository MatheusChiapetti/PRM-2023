import { Box, Avatar, Typography } from "@mui/material";
import banner from '../../assets/img/profile_banner.png';
import avatar from '../../assets/img/profile_avatar.jpg';
import { CalendarMonthOutlined } from "@mui/icons-material";
import "./style.css"; 

function HeaderProfile() {
    return (
        <Box id="header-profile">
            <Box className="header-profile-background">
                <img src={banner} />
            </Box>

            <Box className="header-profile-detail">
                <Avatar alt="Fulano de Tal" style={{ width: 128, height: 128 }} src={avatar} className="header-profile-detail-avatar" />
                <Box className="header-profile-detail-text">

                    <Typography variant="h5">
                        Fulano de Tal
                    </Typography>

                    <Typography variant="subtitle1" component="h6">
                        @FulanoDeTal
                    </Typography>

                    <Typography variant="subtitle1" component="p">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi optio nihil nam ea explicabo nulla ut, enim libero, consequuntur dignissimos est sequi soluta quisquam possimus aliquam culpa repellendus? Fugit, unde?
                    </Typography>

                    <Typography variant="caption">
                        <CalendarMonthOutlined />
                        Entrou em Agosto de 2023
                    </Typography>

                </Box>
            </Box>
        </Box>
    )
}

export default HeaderProfile; 