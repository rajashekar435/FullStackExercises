import { useState } from "react";

const Button = ({onClick,text}) =>{
  return(
    <button onClick={onClick}>
      {text}
    </button>
  );
}

const StatisticLine = ({text,value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}
const Statistics = ({good,neutral,bad}) => {
  let totalVotes = good + neutral + bad;
  if(totalVotes === 0)
  {
    return(
      <div>
        <p>No feedback given yet</p>
      </div>
    );
  }
  else
  {
    return(
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={totalVotes} />
          <StatisticLine text="Average" value={(good-bad)/totalVotes} />
          <StatisticLine text="Positive" value={String((good/totalVotes)*100).concat("%")} />
        </tbody>
      </table>
    );
  }
  
      
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <br/>
      <Button onClick={() => setGood(good+1)} text="Good"/>
      <Button onClick={() => setNeutral(neutral+1)} text="Neutral"/>
      <Button onClick={() => setBad(bad+1)} text="Bad"/>
      <h1>Statistics</h1>
      <br/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
