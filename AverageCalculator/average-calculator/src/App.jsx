import { div } from "@tensorflow/tfjs";
import react, {useState, useEffect} from "react";

function AverageCalculator(){
  const [numberid, setNumberId] = useState('');
  const [average, setAverage] = useState(null);
  const [error, setError] = useState(null);

  const Change = (event) => {
    setNumberId(event.target.value)
  };

  const Submit = async (event)=> {
      event.preventDefault();
      setError(null);

      try {
        const response = await fetch("http://localhost:9876/numbers/e",{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({question})
        });
        if (!response.ok){
          throw new Error('Error fetching data: ${response.status}');
        }

        const data = await response.json();
        setAnswer(data.answer);
      } catch(error){
        setError(error.message);
      }
  };
  return(
    <div className="average-calculator">
      <h1>Average Calculator</h1>
      <form onSubmit={Submit}>
        <label htmlFor="question">Question: </label>
        <textarea id="question" value={question} onChange={Change}></textarea>
        <button type="submit">Ask Question</button>
      </form>
      {answer && <p>Answer: {answer}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default AverageCalculator;