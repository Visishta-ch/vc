import React, { useState, useEffect } from 'react';
import Button from '../../UI/Button';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import './AddScenario.css';

const EditScenario = () => {
  const { id } = useParams();
  // console.log(id)
  const history = useHistory();
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const resp = await fetch(`http://localhost:3006/scenario/${id}`);
    const data = await resp.json();
    // console.log(data);
    setData(data);
  };
  
  useEffect(() => {
    fetchData();
  }, [update]);

  const restHandler = () => {
    setName('');
    setTime('');
  };

  const updateHandler = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3006/scenario/${id}`, data)
      .then((res) => console.log('updated ', res))
      .catch((err) => console.log(err));
    setUpdate(!true);
    history.replace('/scenario');
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
              value={data.scenario_name}
              onChange={(e) =>
                setData({ ...data, scenario_name: e.target.value })
              }
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
              value={data.scenario_time}
              onChange={(e) =>
                setData({ ...data, scenario_time: e.target.value })
              }
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
          <Button to="#" backgroundColor="#1bd27c" onClick={updateHandler}>
            Update
          </Button>
          <Button to="#" backgroundColor="orange" onClick={restHandler}>
            Reset
          </Button>
          <Button to="/scenario" backgroundColor="skyblue">
            Go Back
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EditScenario;
