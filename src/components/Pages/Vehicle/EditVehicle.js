import React,{useEffect, useState} from 'react'
import styles from './AddVehicle.module.css'
import Button from '../../UI/Button'
import { useParams,useHistory  } from 'react-router-dom'
import axios from 'axios';

const EditVehicle = () => {
    const {id} = useParams();
    const[edit,setEdit] = useState(false)
    const history = useHistory()
    const [data,setData] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:3006/vehicles/${id}`)
        .then((response)=>setData(response.data))
        .catch((error)=>console.log(error))
        //
        console.log(data)
    },[edit])

    const updateHandler = (e) =>{
            e.preventDefault();
            axios.put(`http://localhost:3006/vehicles/${id}`,data)
            .then(res=>console.log('updated ',res))
            .catch(err=>console.log(err))
            setEdit(!edit);
            history.replace("/")
    }
  return (
    <>
      <p>Vehicle / add</p>
        <form className={styles.vform} onSubmit={updateHandler}><br/>
        <h1>Edit Vehicle</h1>
        <div className={styles.main}>
        
        <div className="input-container">
          <label>Scenario List</label><br/>
          <input type="text" placeholder="TEST SCENARIO"  value={data.scenario} onChange={e=>setData({...data,scenario:e.target.value})} required />
        </div>
          <div className="input-container">
          <label>Vehicle Name</label><br/>
          <input type="text" placeholder="Vehicle name" value={data.vehicle_name} onChange={e=>setData({...data,vehicle_name:e.target.value})} required />
        </div>
        <div className="input-container">
          <label>Speed</label><br/>
          <input type="text" placeholder="speed" value={data.speed} onChange={e=>setData({...data,speed:e.target.value})}  required />
        </div>
       
        <div className="input-container">
          <label>Position X</label><br/>
          <input type="text" placeholder="10" value={data.initial_position_X} onChange={e=>setData({...data,initial_position_X:e.target.value})}  required />
        </div>
        <div className="input-container">
          <label>Position Y</label><br/>
          <input type="text" placeholder="TEST SCENARIO" value={data.initial_position_Y} onChange={e=>setData({...data,initial_position_Y:e.target.value})} required />
        </div>
          <div className="input-container">
          <label>Direction</label><br/>
          <select style={{width:'270px',height:'45px',border:'1px solid gray', backgroundColor:'black',color:'aliceblue',borderRadius:'10px'}} value={data.direction} onChange={e=>setData({...data,direction:e.target.value})}>
            <option>Select Direction</option>
            <option>Towards</option>
            <option>Upwards</option>
            <option>Downwards</option>
            <option>Backwards</option>
          </select>
        </div>
     
       
        </div> <br/>
        <Button to="#" backgroundColor="#1bd27c" onClick={updateHandler}>Update</Button>
        <Button to="#" backgroundColor="orange">Reset</Button>
        <Button to="/" backgroundColor="skyblue">Go Back</Button>
      </form>
    </>
  )
}

export default EditVehicle