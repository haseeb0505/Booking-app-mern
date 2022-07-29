import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import "./hotel.css";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

function Hotel() {
  const [slideNo, setSlideNo] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openModel, setOpenModel] = React.useState(false);

  const location = useLocation()
  const navigate = useNavigate()
  const id = location.pathname.split("/")[2]
  const { data, error, loading } = useFetch(`/hotel/find/${id}`);


  const { dates, options } = useContext(SearchContext)
  const { user } = useContext(AuthContext)

  const milliseconds = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const diff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diff / milliseconds);
  }

  const handleOpen = (i) => {
    setSlideNo(i)
    setOpen(true);

  }

  const handleMove = (direction) => {

    let newSlideNo;
    if (direction === "l") {

      newSlideNo = slideNo === 0 ? 5 : slideNo - 1;
    } else {
      newSlideNo = slideNo === 5 ? 0 : slideNo + 1;
    }

    setSlideNo(newSlideNo);
  }

  const handleClick = () => {
    if (!user) {
      navigate("/login")

    } else {
      setOpenModel(true)
    }

  }

  return <div>
    <Navbar />
    <Header type="list" />
    {loading ? "Loading" : <div className="hotelContainer">
      {open && <div className="slider">
        <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
        <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
        <div className="sliderWrapper">
          <img src={data.photos[slideNo]?.src} alt="" className="sliderImg" />
        </div>
        <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
      </div>}
      <div className="hotelWrapper">
        <button className="bookNow" onClick={handleClick}>Reserve or Book Now</button>
        <h1 className="hotelTitle">
          {data.name}
        </h1>
        <div className="hotelAddress">
          <FontAwesomeIcon icon={faLocationDot} />
          <span>{data.address}</span>
        </div>
        <span className="hotelDistance">
          Excellent location – {data.distance}m from center
        </span>
        <span className="hotelPriceHighlight">
          Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
        </span>
        <div className="hotelImages">
          {data.photos?.map((img, i) => (
            <div className="hotelImgWrapper">
              <img onClick={() => handleOpen(i)} src={img} alt="" className="hotelImg" />
            </div>
          ))}
        </div>
      </div>
      <div className="hotelDetails">
        <div className="hotelDetailsText">
          <h1 className="hotelTitle">{data.title}</h1>
          <p className="hotelDesc">
            {data.desc}
          </p></div>
        <div className="hotelDetailsPrice"><h1>Perfect for a {dayDifference(dates[0].endDate, dates[0].startDate)}-night stay!</h1>
          <span>
            Located in the real heart of Krakow, this property has an
            excellent location score of {data.rating}!
          </span>
          <h2>
            <b>${data.cheapestPrice * dayDifference(dates[0].startDate, dates[0].endDate) * options.room}
            </b> ( <b>{dayDifference(dates[0].startDate, dates[0].endDate)}</b> Nights) & <b>{options.room}</b> Rooms
          </h2>
          <button onClick={handleClick}>Reserve or Book Now!</button></div>
      </div>


      <MailList />
      <Footer />
    </div>}
    {openModel && <Reserve setOpen={setOpenModel} hotelId={id} />}
  </div>;
}

export default Hotel;
