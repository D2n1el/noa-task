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
      backgroundColor: 'hotpink',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      borderRadius: '16px'
    }
  }
})

const FetchedData = (props:any) => {
  const classes = useStyles();

  return(

    <div className={classes.dataBlock}>
      <div >Repository name: {props.data.name}</div>
      <div > Description: {props.data.descr}</div>
      <div >Stars: {props.data.stars}</div>
    </div>
  )
}

export default FetchedData;