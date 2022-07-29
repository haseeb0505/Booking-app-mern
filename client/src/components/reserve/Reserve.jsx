import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import "./reserve.css"
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'

function Reserve({ setOpen, hotelId }) {
    const [selectedRooms, setSelectedRooms] = React.useState([])
    const { data, error, loading } = useFetch(`/hotel/room/${hotelId}`)
    const { dates } = useContext(SearchContext)
    const navigate = useNavigate()

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime());
        let list = []
        while (date <= end) {
            list.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        return list
    }
    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNo) => {
        const isFound = roomNo.unavailableDates.some(date => allDates.includes(new Date(date).getTime()))

        return !isFound
    }

    function handleSelect(e) {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value))

    }
    const handleClick = async () => {
        try {
            await Promise.all(selectedRooms.map(roomId => {
                const res = axios.put(`/room/availibility/${roomId}`, { dates: allDates })
                setOpen(false)
                navigate("/")

            }))
        } catch (error) {
            console.log(error)
        }

    }



    return (
        <div className='reserve'>
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
                <span>Select Your Rooms</span>
                {data.map((item) => (
                    <div className="rItem" key={item.id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Max People: <b>{item.maxPeople}</b></div>
                            <div className="rPrice"> Price: <b>{item.price}</b></div>
                        </div>
                        <div className="rSelectrooms">

                            {item.roomNumbers.map((room) => (
                                <div className="room">
                                    <label>{room.number}</label>
                                    <input type="checkbox" value={room._id} onChange={handleSelect} disabled={!isAvailable(room)} />
                                </div>
                            ))}
                        </div>
                    </div>

                ))}
                <button className='rButton' onClick={handleClick}> Reserve now </button>

            </div>
        </div>
    )



}

export default Reserve

