import React, { useEffect } from "react";
import { Octokit } from "@octokit/rest";
import {createUseStyles} from 'react-jss'
import FetchedData from './components/FetchedData'

const octokit = new Octokit();

type Repo = Awaited<ReturnType<typeof octokit.repos.get>>["data"];

const repos = [
  "eslint/eslint",
  "oakwood/front-end-questions",
  "babel/babel",
  "webpack/webpack",
  "storybooks/storybook",
  "facebook/react",
  "reactjs/redux",
  "expressjs/express",
];

const useStyles = createUseStyles({
  App: {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '45px auto'
  },
  decrementButton: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    border: '1px solid black',
    borderRadius: '16px',
    backgroundColor: '#fff',
    padding: {
      top: 10,
      bottom: 10,
      left: '15px',
      right: 15
    },
    margin: {
      top: 5,
      right: 0,
      bottom: 0,
      left: '1rem'
    },
    '&:hover': {
      backgroundColor: "black",
      color: "#fff",
      '& minusIcon': {
        fill: 'white'
      }
    },
  },
  incrementButton: {
    backgroundColor: 'hotpink',
    boxSizing: 'border-box',
    border: 'none',
    color: '#fff',
    borderRadius: '16px',
    padding: {
      top: 10,
      bottom: 10,
      left: 15,
      right: 15
    },
    margin: {
      top: 5,
      right: 0,
      bottom: 0,
      left: '1rem'
    },
    '&:hover': {
      backgroundColor: "rebeccapurple",
      color: "#fff"
    }
  },
  myLabel: {
    margin: {
      left: '1rem'
    },
    fontStyle: 'italic'
  },
  counterBlock: {
    display: 'flex',
    alignItems: 'center'
  },
  loader: {
    width: '48px',
    height: '48px',
    border: '5px solid hotpink',
    borderBottomColor: 'transparent',
    borderRadius: '50%',
    display: 'inline-block',
    boxSizing: 'border-box',
    animation: '$rotation 1s linear infinite'
  },
  '@keyframes rotation': {
    '0%': {
      transform: 'rotate(0deg)'
    },
  
    '100%': {
      transform: 'rotate(360deg)'
    }
  },
})

const App = () => {
  const classes = useStyles()
  const [curr, setCurr] = React.useState(repos[0]);
  const [pos, setPos] = React.useState(0);
  const [data, setData] = React.useState<Repo | null>(null);
  const [isLoading, setLoading] = React.useState(false);

  const load = () => {
    const [owner, repo] = curr.split("/");
    setLoading(true);
    octokit.repos
      .get({ owner, repo })
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch(() => {
        setLoading(false);
        setData(null);
      });
  };
  useEffect(() => {
    load();
  }, []);

  const increment = () => {
    const next = pos + 1;
    setPos(next > repos.length - 1 ? 0 : next);
  };

  const decrement = () => {
    const next = pos - 1;
    setPos(next < 0 ? 0 : next);
  };
  useEffect(() => {
    if (pos > repos.length - 1) {
      setPos(0);
    }

    setCurr(repos[pos]);
  }, [pos]);

  useEffect(load, [curr]);

  return (
    <div className={classes.App}>
      <div>
      {isLoading ? (
        <div className={classes.loader}></div>
      ) : (!data ? (<div>No data</div>) :
        (<FetchedData data ={{name: data?.full_name, descr: data?.description, stars: data?.stargazers_count }}/>)
      )}
      </div>
      <div className={classes.counterBlock}>
      <button className={classes.decrementButton} onClick={decrement}>Decrement</button>
      <span className={classes.myLabel}>{pos}</span>
      <button className={classes.incrementButton} onClick={increment}>Increment</button>
      </div>
    </div>
  );
};

export default App;
