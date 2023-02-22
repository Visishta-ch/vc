import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Button from '../../UI/Button';
import useFetch from '../../customHook/useFetch';
import Graph from './Graph';
import axios from 'axios';
const Home = () => {
  const [data] = useFetch('http://localhost:3006/scenario');

  let existingList = [];
  const [vehicles, setVehicles] = useState([]);
  const [params, setParams] = useState([]);
  const [update, setUpdate] = useState(false);
  const [stimulation, setStimulation] = useState(false)

  useEffect(() => {
    axios
      .get(' http://localhost:3006/vehicles')
      .then((res) => setVehicles(res.data))
      .catch((err) => console.log(err));
  }, [update]);

  /*delete handler */

  const deleteHandler = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3006/vehicles/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setUpdate(!update);
  };

  const selectHandler = (e) => {
    setStimulation(false);
    let id = e.target.value;
    let url = id.replace(/ /g, '%20');

    axios
      .get(`http://localhost:3006/vehicles?scenario=${url}`)
      .then((res) => {
        setVehicles(res.data);
        let data = res.data;

        Object.entries(data).forEach((item) => {
          existingList.push({
            direction: item[1].direction,
            initial_position_X: item[1].initial_position_X,
            initial_position_Y: item[1].initial_position_Y,
            speed: item[1].speed,
          });
        });
        setParams(existingList);
      })
      .catch((err) => console.log(err));
  };

  const start = (e) =>{
    e.preventDefault();
    setStimulation(true);
  }
  return (
    <section>
      <div>
        <p>Scenario</p>
      </div>
      <div className="select">
        <select
          style={{
            margin: '10px',
            padding: '10px',
            position: 'relative',
            display: 'inline-block',
            fontSize: '14px',
            background: 'gray',
            border: '1px solid lightblue',
          }}
          onChange={selectHandler}
        >
          <option>Select scenario</option>
          {data &&
            data.map((item, index) => (
              <option key={index}>{item.scenario_name}</option>
            ))}
        </select>
      </div>

      <div style={{ overflowX: 'auto', paddingTop: '35px' }}>
        <table className="vehicles-table">
          <thead>
            <tr>
              <th>Vehicle Id</th>
              <th>Vehicle Name</th>
              <th>position X</th>
              <th>Position Y</th>
              <th>Speed</th>
              <th>Direction</th>
              <th>Edit </th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v, i) => (
              <tr key={v.id}>
                <td>{i + 1}</td>
                <td>{v.vehicle_name}</td>
                <td>{v.initial_position_X}</td>
                <td>{v.initial_position_Y}</td>
                <td>{v.speed}</td>
                <td>{v.direction}</td>
                <td>
                  <Link to={`/editVehicle/${v.id}`}>🖋️</Link>
                </td>
                <td
                  onClick={() => deleteHandler(v.id)}
                  style={{ cursor: 'pointer' }}
                >
                  🗑️
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button to="#" backgroundColor="#1bd27c" onClick={start}>
          Start Stimulation
        </Button>
        <Button to="#" backgroundColor="skyblue">
          Stop Stimulation
        </Button>
      </div>
      {stimulation ? <Graph params={params} />: ''}
    </section>
  );
};

export default Home;
