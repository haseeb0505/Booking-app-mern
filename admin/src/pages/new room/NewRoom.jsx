import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = ({ inputs, title }) => {

  const [info, setInfo] = useState({})
  const [hotelId, setHotelId] = useState(undefined)
  const [rooms, setRooms] = useState([])

  const { data, loading, error } = useFetch("/hotels");


  const handleChange = (e) => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }
  console.log(info);
  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map(room => ({ number: room }))
    try {
      const newRoom = {
        ...info, roomNumbers
      }
      await axios.post(`/rooms/${hotelId}`, newRoom);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">

          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                </div>
              ))}
              <div className="formInput" >
                <label>Rooms </label>
                <textarea name="rooms" id="" placeholder="give comma between Room No" onChange={e => setRooms(e.target.value)}></textarea>
              </div>
              <div className="formInput" >
                <label>Choose A Hotel </label>
                <select id="hotelId" onChange={e => setHotelId(e.target.value)}>
                  {loading ? "loading" : data && data.map(hotel => (
                    <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
