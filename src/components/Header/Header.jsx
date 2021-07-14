import React from 'react';
import Logo from "../Header/TF_Logo_Curve.png";
import {makeStyles, Grid} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    logoContainer: {
        textAlign: 'center',
        marginTop: '80px',
    },
    logo: {
        width: '120px',
        height: '120px',
    }
}))

// contains Trading For logo and renders it on page
function Header() {
    const classes=useStyles();

    return(
        <Grid item lg={12}>
        <Grid xs={12} className={classes.logoContainer}>
        <img className={classes.logo} src={Logo} />
        </Grid>
        </Grid>
    )
}

export default Header