import React, { useState } from 'react';
import Button from '../../UI/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { v4 } from 'uuid';
import './AddScenario.css';

const AddScenario = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const restHandler = () => {
    setName('');
    setTime('');
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log('length of name', name.length);
    if (name.length === 0 || time.length === 0) {
      setError(true);
    }
    if (name && time) {
      const scenarioDetails = {
        scenario_name: name,
        scenario_time: time,
        id: v4(),
      };
      setData([...data, scenarioDetails]);
      console.log(scenarioDetails);
      /* post request for json-server*/

      axios
        .post('http://localhost:3006/scenario', scenarioDetails)
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
      setName('');
      setTime('');
      setError(false);
      history.replace('/');
    }
  };
  return (
    <section>
      <p>Scenario / add</p>
      <div className="container">
        <h1>AddScenario</h1>
        <form>
          <div className="input-container">
            <label>Scenario Name</label>
            <br />
            <input
              className={!error ? '' : 'error-input'}
              type="text"
              placeholder="TEST SCENARIO"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {error && name.length === 0 ? (
              <p className="error">Scenario name cannot be empty</p>
            ) : (
              ''
            )}
          </div>
          <div className="input-container">
            <label>Scenario Time(seconds)</label>
            <br />
            <input
              className={!error ? '' : 'error-input'}
              type="text"
              placeholder="10"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
            {error && time.length === 0 ? (
              <p className="error">Scenario name cannot be empty</p>
            ) : (
              ''
            )}
          </div>
        </form>
        <br />
        <div className="btn-primary">
          <Button to="#" backgroundColor="#1bd27c" onClick={submitHandler}>
            Add
          </Button>
          <Button to="#" backgroundColor="orange" onClick={restHandler}>
            Reset
          </Button>
          <Button to="/" backgroundColor="skyblue">
            Go Back
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AddScenario;
