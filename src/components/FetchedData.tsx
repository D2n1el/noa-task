import React, { useState } from "react";
import {createUseStyles} from 'react-jss'


const useStyles = createUseStyles({
  dataBlock: {
    width: '80vw',
    display: 'flex',
    marginBottom: '50px',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& div': {
      width: '300px',
      padding: '30px',
      border: '1px solid hotpink',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
})

const FetchedData = (props:any) => {
  const classes = useStyles();

  return(

    <div className={classes.dataBlock}>
      <div >{props.data.name}</div>
      <div >{props.data.descr}</div>
      <div >{props.data.stars}</div>
    </div>
  )
}

export default FetchedData;