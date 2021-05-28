import React from 'react';
import Logo from "../Header/TF_Logo_Curve.png";
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    logo: {
        textAlign: 'center',
        marginTop: '20%',
    }
}))


function Header() {
    const classes=useStyles();

    return(
        <div className={classes.logo}>
        <img src={Logo} />
        </div>
    )
}

export default Header