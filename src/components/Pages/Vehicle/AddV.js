import React, { useState, useEffect } from 'react';
import styles from './AddVehicle.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { v4 } from 'uuid';
import axios from 'axios';
import Button from '../../UI/Button';

const AddVehiclefromS = () => {
  /*to get the scnario name from sccenario page  */
  const location = useLocation();
  const { scenario_name } = location.state;
/*setting values to get input from user */
  const [list, setList] = useState([]);
  const [vehicle, setVehicle] = useState('');
  const [speed, setSpeed] = useState('');
  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');
  const [direction, setDirection] = useState('');
  const [error, setError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    console.log(`http://localhost:3006/scenario`);
    axios
      .get('http://localhost:3006/scenario')
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addVehicleHandler = (e) => {
    e.preventDefault();

    /*condition check */
    if (
      vehicle.length === 0 ||
      positionX.length === 0 ||
      positionY.length === 0 ||
      speed.length === 0 ||
      direction.length === 0
    ) {
      setError(true);
    } else {
      const vehicleDetails = {
        id: v4(),
        scenario: scenario_name,
        vehicle_name: vehicle,
        initial_position_X: positionX,
        initial_position_Y: positionY,
        speed: speed,
        direction: direction,
      };

      /*post request */
      axios
        .post(`http://localhost:3006/vehicles`, vehicleDetails)
        .then((res) => {
          // console.log(res);
          // console.log(res.data);
        })
        .catch((err) => console.log(err));
      setError(false);
      alert('Added successfully');
      history.replace('/');
    }
  };
  return (
    <>
      <p>Vehicle / add</p>
      <form className={styles.vform} onSubmit={addVehicleHandler}>
        <br />
        <h1>Add Vehicle</h1>
        <div className={styles.main}>
          <div className="input-container">
            <label htmlFor="s-list">Scenario List</label>
            <br />
            <select
              style={{
                width: '275px',
                height: '50px',
                border: '1px solid gray',
                backgroundColor: 'black',
                color: 'aliceblue',
                borderRadius: '10px',
                padding: '3px',
              }}
              value={scenario_name}
              onChange={(e) => e.target.value}
            >
              {' '}
              <option>Select test</option>
              {list.map((item, id) => (
                <option key={id}>{item.scenario_name}</option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="name">Vehicle Name</label>
            <br />
            <input
              type="text"
              placeholder="Vehicle name"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              required
            />
            {error && vehicle.length === 0 ? (
              <p className={styles.error}>Scenario name cannot be empty</p>
            ) : (
              ''
            )}
          </div>
          <div className="input-container">
            <label htmlFor="speed">Speed</label>
            <br />
            <input
              type="text"
              placeholder="speed"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              required
            />
            {error && speed.length === 0 ? (
              <p className={styles.error}>Scenario name cannot be empty</p>
            ) : (
              ''
            )}
          </div>

          <div className="input-container">
            <label htmlFor="posX">Position X</label>
            <br />
            <input
              type="number"
              placeholder="10"
              value={positionX}
              onChange={(e) => setPositionX(e.target.value)}
              required
              min="0"
              max="50"
            />
            {error && positionX.length === 0 ? (
              <p className={styles.error}>Scenario name cannot be empty</p>
            ) : (
              ''
            )}
          </div>
          <div className="input-container">
            <label htmlFor="posY">Position Y</label>
            <br />
            <input
              type="text"
              placeholder="10"
              value={positionY}
              onChange={(e) => setPositionY(e.target.value)}
              required
            />
            {error && positionY.length === 0 ? (
              <p className={styles.error}>Scenario name cannot be empty</p>
            ) : (
              ''
            )}
          </div>
          <div className="input-container">
            <label htmlFor="direction">Direction</label>
            <br />
            <select
              style={{
                width: '275px',
                height: '50px',
                border: '1px solid gray',
                backgroundColor: 'black',
                color: 'aliceblue',
                borderRadius: '10px',
                padding: '3px',
              }}
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              <option>Select Direction</option>
              <option>Towards</option>
              <option>Upwards</option>
              <option>Downwards</option>
              <option>Backwards</option>
            </select>
            {error && direction.length === 0 ? (
              <p className={styles.error}>Scenario name cannot be empty</p>
            ) : (
              ''
            )}
          </div>
        </div>{' '}
        <br />
        <Button to="#" backgroundColor="#1bd27c" onClick={addVehicleHandler}>
          Add
        </Button>
        <Button to="#" backgroundColor="orange">
          Reset
        </Button>
        <Button to="/" backgroundColor="skyblue">
          Go Back
        </Button>
      </form>
    </>
  );
};

export default AddVehiclefromS;
