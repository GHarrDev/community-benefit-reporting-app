import React, { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import { useTheme } from '@mui/material/styles'; 
import { ColorModeContext, tokens } from '../theme';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import IconButton from '@mui/material/IconButton';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const Login = () => {
  const theme = useTheme(); 
  const colors = tokens(theme.palette.mode);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toggleColorMode } = useContext(ColorModeContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(email.trim() === '' || password.trim() === '');
  }, [email, password]);

  const handleLogin = () => {
    const users = [
      {
        email: 'admin@email.com',
        password: 'Admin',
        fname: 'Austin',
        lname: 'Strassle',
        title: 'Community Benefits Manager',
        role: 'admin',
        photo: '/assets/admin.png',
        dept: 11,
        event: null
      },{
        email: 'moderator@email.com',
        password: 'Moderator',
        fname: 'Gregory',
        lname: 'Harris',
        title: 'Director of Public Relations',
        role: 'moderator',
        photo: '/assets/moderator.png',
        dept: 32,
        event: ["Immunization Booster", "Flu Shot Clinic", "Blood Drive"]
      },{
        email: 'reporter@email.com',
        password: 'Reporter',
        fname: 'Kayla',
        lname: 'McKenzie',
        title: 'Pediatric Program Coordinator',
        role: 'reporter',
        photo: '/assets/reporter.png',
        dept: 32,
        event: ["Immunization Booster", "Flu Shot Clinic", "Blood Drive"]
      },{
        email: 'viewer@email.com',
        password: 'Viewer',
        fname: 'Mark',
        lname: 'Zuckerberg',
        title: 'Volunteer',
        role: 'viewer',
        photo: '/assets/viewer.png',
        dept: null,
        event: ["Immunization Booster Drive"]
      }
    ];

  const user = users.find(
    (u) => u.email === email && u.password === password
  );


    if (email === user.email && password === user.password) {
      setError(false);
      setHelperText('Login Successfully');
      console.log('Login Successfully');
      login(user);
      navigate('/dashboard');
    } else {
      setError(true);
      setHelperText('Incorrect email or password');
      console.log('Incorrect email or password');
      setEmail('');
      setPassword('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: `${colors.primary[400]}`
    }}>
      <form
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '500px',
        margin: "auto",
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
      <Card m="10px" sx={{ padding: '10px' }}>
        <CardHeader
          title="Community Impact"
          sx={{
            backgroundColor: colors.primary[400],
            textAlign: "center",
            padding: "20px"
          }}
        />
        <CardContent>
          <TextField
            error={error}
            fullWidth
            id="email"
            type="email"
            label="Email"
            placeholder="Email"
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
            helperText={error ? helperText : ''}
            sx={{
              marginBottom: 2,
              '& .MuiInputBase-root': {
                color: colors.grey[100],
              },
            }}
          />
          <TextField
            error={error}
            fullWidth
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
            helperText={error ? helperText : ''}
            sx={{
              '& .MuiInputBase-root': {
                color: colors.grey[100],
              },
            }}
          />
        </CardContent>
        <CardActions>
        <Button
        variant="contained"
        size="large"
        onClick={handleLogin}
        sx={{
        marginTop: 2,
        flexGrow: 1,
        backgroundColor: colors.blueAccent[500],
        color: colors.primary[400],
          '&:hover': {
            backgroundColor: colors.blueAccent[600],
          },
        }}
      >
        Login
      </Button>
          </CardActions>
        </Card>
      </form>

      {/* Mode Toggle Icon */}
      <IconButton 
        onClick={toggleColorMode} 
        style={{ position: 'absolute', top: 20, right: 100 }}
      >
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>
    </div>
    
  );
};

export default Login;
