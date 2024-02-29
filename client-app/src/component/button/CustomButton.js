import React from 'react'
import {
    Button,
    ButtonGroup
  } from "@mui/material";
import { makeStyles} from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: theme.spacing(2),
      "& > *:not(:last-child)": {
        marginRight: theme.spacing(2)
      }
    }
  }));
function CustomButton({handelCancel,text}) {
    const classes = useStyles();
  return (
    <><ButtonGroup
    className={classes.root}
  >
    <Button 
    type="submit" 
    variant="contained"
    >
     {text}
    </Button>

    <Button
      type="submit"
     color='brown'
      variant="contained"
      onClick={handelCancel}
    >
     Annuler
    </Button>
  </ButtonGroup></>
  )
}

export default CustomButton