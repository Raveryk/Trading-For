import React from 'react';
import Logo from "../Header/TF_Logo_Curve.png";
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    logoContainer: {
        textAlign: 'center',
        marginTop: '20%',
    },
    logo: {
        width: '30%',
        height: '30%',
    }
}))

// contains Trading For logo and renders it on page
function Header() {
    const classes=useStyles();

    return(
        <div className={classes.logoContainer}>
        <img className={classes.logo} src={Logo} />
        </div>
    )
}

export default Header