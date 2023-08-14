import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function PostCard ({
        id,
        title,
        subheader,
        image, 
    }) {

  return (
    <Link to={`quiz/show/${id}`} style={{textDecoration: 'none'}}>
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
                <Typography variant="body2" sx={{color:'#CED4DA'}}>
                    {subheader}
                </Typography>
            </CardContent>
        </Card>
    </Link>
  );
}
