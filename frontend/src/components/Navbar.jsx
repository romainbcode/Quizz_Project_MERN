import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Tooltip, MenuItem } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutAction, userProfileAction} from '../redux/actions/userAction';
import { UserCircle2, MenuSquare, GraduationCap } from 'lucide-react';

function ResponsiveAppBar({
    titlePage
    }) {
    const { userInfo } = useSelector(state => state.signIn);
    const dispatch = useDispatch();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logOutUser = async () =>{
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(()=>{
            navigate('/')
        },500)
    }

    const getUserInfo = async()=>{
        dispatch(userProfileAction());
    }
    

    return (
        <AppBar position="static" sx={{bgcolor: 'primary.mainGreenDark'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box sx={{position: 'absolute', left: '50%', transform: 'translate(-50%, 0%)', display:'flex', flexDirection:'row', alignItems:'center'}} >
                        <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'primary.themewhite',
                            textDecoration: 'none',
                            justifyContent:'center',
                            flexGrow:1

                        }}
                        >
                        {titlePage}
                        </Typography>
                    </Box>
                    
                    <Box sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        color: 'primary.themewhite',
                    }}>
                        <GraduationCap strokeWidth={1.5}/>
                        <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            ml:1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                        >
                            Quiz
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuSquare color='white'/>
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >
                            { 
                            userInfo ? 
                            <Box sx={{ flexGrow: 0 }}>
                            
                            {
                                userInfo.role === 'admin' ? 
                                <Box>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography ><Link style={{textDecoration: "none", color: '#000', fontWeight:'bold'}}to="/admin/dashboard">Admin</Link></Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography ><Link style={{textDecoration: "none", color: '#000', fontWeight:'bold'}}to="/admin/dashboard">AsminDashboard</Link></Typography>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography ><Link style={{textDecoration: "none", color: '#000', fontWeight:'bold'}}to="/admin/quiz/create">Creat post admin</Link></Typography>
                                </MenuItem>
                                </Box>

                                : 
                                <MenuItem onClick={getUserInfo}>
                                    <Typography ><Link style={{textDecoration: "none", color: "#000"}} to="/user/dashboard">UserProfile</Link></Typography>
                                </MenuItem>
                                
                                
                            }
                            </Box>

                            :
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography ><Link style={{textDecoration: "none", color: "#000", fontWeight:'bold'}}to="/signin">LogIn</Link></Typography>
                            </MenuItem>
                            }
                        </Menu>
                    </Box>
                    
                    <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                        display: { xs: 'flex', md: 'none'},
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'white',
                        textDecoration: 'none',
                    }}
                    >
                    {titlePage}

                    </Typography>
                    
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography ><Link style={{textDecoration: "none", color: 'white', fontWeight:'bold'}}to="/">Home</Link></Typography>
                        </MenuItem>
                        {
                            userInfo ? 
                            <MenuItem onClick={logOutUser}>
                                <Typography ><Link style={{textDecoration: "none", color: 'white', fontWeight:'bold'}}to="/signin">Logout</Link></Typography>
                            </MenuItem>
                        
                            : 
                            
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography ><Link style={{textDecoration: "none", color: 'white', fontWeight:'bold'}}to="/signup">SignUp</Link></Typography>
                            </MenuItem>
                        } 
                    </Box>
                    
                    
                    { 
                    userInfo ? 
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <UserCircle2 size={36} color="white" strokeWidth={1} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                        {
                            userInfo.role === 'admin' ? 
                            <Box>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography ><Link style={{textDecoration: "none", color: '#000', fontWeight:'bold'}}to="/admin/dashboard">Admin</Link></Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography ><Link style={{textDecoration: "none", color: '#000', fontWeight:'bold'}}to="/admin/dashboard">AsminDashboard</Link></Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography ><Link style={{textDecoration: "none", color: '#000', fontWeight:'bold'}}to="/admin/quiz/create">Creat post admin</Link></Typography>
                            </MenuItem>
                            </Box>
                            : 
                            <MenuItem onClick={getUserInfo}>
                                <Typography ><Link style={{textDecoration: "none", color: "black"}} to='/user/dashboard'>UserInfo</Link></Typography>
                            </MenuItem>
                        }
                        </Menu>
                    </Box>
                    :
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography ><Link style={{textDecoration: "none", color: "white", fontWeight:'bold'}}to="/signin">LogIn</Link></Typography>
                    </MenuItem>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;