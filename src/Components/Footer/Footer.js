import React, { useState } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';

const styles = theme => ({
  paper: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 600,
    backgroundColor: theme.palette.background.darkGrey,
    padding: 30,
    paddingBottom: 0,
    borderRadius: 0,
    [theme.breakpoints.down('sm')]: {
      padding: 10,
      paddingBottom: 0,
    },
  },
  logo: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    padding: 3,
    // boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  logoImg: {
    height: '100%',
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
    },
  },
  nameImg: {
    height: '75%',
    width: 'auto',
  },
  formWrapper: {
    border: '2px solid white',
    borderRadius: 15,
    padding: '20px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '15px 30px',
      // width: '100%',
    },
  },
  formContent: {
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: '0 10px',
    margin: '15px 0',
    width: '30vw',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  input: {
    height: 40,
    fontSize: 20,
  },
  micIcon: {
    color: '#fff',
    fontSize: 200,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  button: {
    ...theme.button,
    marginLeft: 'auto',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  socialMediaWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  fontAwesome: {
    color: '#fff',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const Contact = ({ classes }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const submit = async () => {
    try {
      let text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`;
      let result = await axios.post(
        'https://us-central1-ignitestudios-4cf86.cloudfunctions.net/api/v1/emails',
        {
          subject: `Website Outreach - ${name}`,
          to: 'info@ignitestudios.com',
          text,
        }
      );
      console.log(result);
      setSent(true);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.logo}>
        <img
          className={classes.logoImg}
          alt="Logo"
          src={require('../../Assets/Logo.svg')}
        />
        <img
          className={classes.nameImg}
          alt="Name"
          src={require('../../Assets/Logo_Name.svg')}
        />
      </div>
      <div className={classes.formWrapper}>
        {sent ? (
          <>
            <Typography style={{ color: 'white' }} variant="h6">
              Message successfully sent!
            </Typography>
            <MicIcon className={classes.micIcon} />
          </>
        ) : (
          <>
            <Typography style={{ color: 'white' }} variant="h6">
              Schedule Now!
            </Typography>
            <div className={classes.formContent}>
              <div className={classes.form}>
                <div className={classes.textField}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                </div>
                <div className={classes.textField}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                </div>
                <div className={classes.textField}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    InputProps={{
                      className: classes.input,
                    }}
                  />
                </div>
                {error && (
                  <Typography style={{ color: 'red' }} variant="h6">
                    It seems there as an error sending the message, please try
                    again.
                  </Typography>
                )}
                <Button className={classes.button} onClick={submit}>
                  Schedule
                </Button>
              </div>
              <MicIcon className={classes.micIcon} />
            </div>
          </>
        )}
      </div>
      <div className={classes.socialMediaWrapper}>
        <Typography style={{ color: '#fff', fontWeight: 500 }}>
          Follow Us! @IgniteStudiosSLC
        </Typography>
        <FontAwesomeIcon
          className={classes.fontAwesome}
          style={{ margin: '0 15px' }}
          size="2x"
          icon={faFacebookSquare}
          onClick={() => {
            window.open('https://www.facebook.com/IgniteStudiosSLC/', '_blank');
          }}
        />
        <FontAwesomeIcon
          className={classes.fontAwesome}
          size="2x"
          icon={faInstagram}
          onClick={() => {
            window.open(
              'https://www.instagram.com/ignitestudiosslc/',
              '_blank'
            );
          }}
        />
      </div>
      <Typography style={{ color: '#9b9b9b' }}>
        Copyright © 2019 Ignite Studios
      </Typography>
    </Paper>
  );
};

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Contact));
