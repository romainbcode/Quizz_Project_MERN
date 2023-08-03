import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';




export default function PostCard ({
    title,
    subheader,
    image, 
    }) {

  return (
    <Card sx={{ maxWidth: 350, p : 2, color: 'primary.themewhite', bgcolor: 'primary.mainGreenDark', 
    borderRadius: '10%', boxShadow: '0 3px 10px #000', padding: '20px, 20px', height: 300
    }}>
        
        <CardMedia
            component="img"
            sx={{ height: '85%', borderRadius: '20px',transitionDuration: '1s', "&:hover": { cursor: "pointer", height: "55%", transitionDuration: '1s' }}}
         

        
            image={image}
        />
        <Typography gutterBottom variant="h5" component="div">
            {title}
            </Typography>
        <CardContent>
            <Typography variant="body2">
            {subheader}
            </Typography>
        </CardContent>
        
        <CardActions disableSpacing>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    {"likes"} 3 
                </Box>       
            </Box>
        </CardActions>
    </Card>
  );
}
