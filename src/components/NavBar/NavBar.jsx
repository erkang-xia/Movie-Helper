import React, { useState, useEffect, useContext } from 'react';
import useStyles from './style';
import { Link } from 'react-router-dom';
import { ColorModeContext } from '../../utils/ToggleColorMode';
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import { useTheme } from '@emotion/react';
import { Search, SideBar } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth';
const NavBar = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(userSelector);

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  const colorMode = useContext(ColorModeContext);
  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);

  return (
    <>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}

          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={() => {
              colorMode.toggleColorMode();
            }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {!isMobile && <Search />}

          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIkAAACJCAMAAAAv+uv7AAAAMFBMVEXh4eGjo6OgoKDk5OTe3t6np6fW1taurq6qqqrb29vJycm4uLjMzMzFxcXR0dHBwcFHm6ywAAADEElEQVR4nO2b7ZKrIAxAhfAhovD+b3vB2r321pVUIHbu5OzMrvvvTJJiTOwwMAzDMAzDMAwVkFBK5T+3agxm8qPOjH4yw10yoCYrpBQP0oWd1B0uMCz6afFE6oU+LhDsvx6riw3EKjDJI5GcpIlUBeKxx+oSCVXOREhVUmpORJIKVYIgnIskFaKyVWNBRIhRUYicFwllqaiiR4YgKLCUQ5KCsvQPirKomNj+QSl+cLaghN4imHpdTbrXLBze+A5MbG8TpVEiQujehYL7DGd6mxhcclJ6DJuQmzikiBCus8n3VCzgDvt03Hc/2TzyZPPdTWakydz9Zuxwh6zuXbAJVHqk7y8CqBNFGoL2EVOz/et1xSBi0vuAfVDuZCm62AeF/FCU65Px9Ll4pBMZ3ImKHAmOkh2/JogyNQ+iOJwpCZrP7x4w9m2sJKWlONHeXWYvdjLp0ve/7f2iMpjFrgpZyC73DWSzDAwuzNMc3HDvkPphs/4wDMMw/y0A21L05+IejXTzm6L33lqbfscp3wapHXI/4PNiNLN1J+ul9bk3oPEBUCF1JVIcLgJzr5I6laC628AQ/Hgs8aIz+tAzUzC89osFGz93kgEXNVLjKaOja+8Czr+tzBEy2jd2SR4fhWMfmJYuoI4fs5AuIrZ68QHC6QM5wmVstLVF7pZOXWIDD4UcwBZUfPXIWiF3XEWV6hVlZYnsVCrnO01Ss6nUDFawo3GkSsUkwZXfZfiE62Ov0nsmn3L9vRTsbhhtcnnng99vYbn6SXZtQ5KCcrVQvic72K0Slort0/ecJ+h3PFAile+BNDvuq6fo33MvPl1bfCDSYMEB7kJP/yaiW7TVUB+VFJEmjSy4ylqRttmDRl3ZNijWHRXnSpO+/i8wXaxbqVu/LJtXXFdEeizBLoSlfUA2Fec/ejyWovWgYOdi8CMDKX3X7WRyQeVI6r4eWQVM1IUkSaGjoRhAggr+9zmXTOEIdN8UgcFEq7V88Un/aW0j9a42f4HIzIu3+on1y2zUTTPzbVivlPq5ZhiGYRiGYRgK/gDnoxxn3q7aIgAAAABJRU5ErkJggg=="
                ></Avatar>
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)} //用来帮组关闭的
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              open
              classes={{ paper: classes.drawerPaper }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
