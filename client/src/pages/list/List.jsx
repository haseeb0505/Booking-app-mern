import React, { useContext } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import './list.css';
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";

function List() {
  const location = useLocation()
  const [destination, setDestination] = React.useState(location.state?.destination);
  const [dates, setDates] = React.useState(location.state?.dates);
  const [openDate, setOpenDate] = React.useState(false);
  const [options, setOptions] = React.useState(location.state?.options);
  const [min, setMin] = React.useState(undefined);
  const [max, setMax] = React.useState(undefined);

  const { data, loading, reFetch } = useFetch(`hotel?city=${destination}&&min=${min || 0}&&max=${max || 999}`);
  const { dispatch } = useContext(SearchContext)
  const handleClick = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
    reFetch();
  }


  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" onChange={(e) => setDestination(e.target.value)} placeholder={destination ? destination : " Destination "} />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{format(dates[0].startDate, "dd-MMM-yyyy")} To{" "}
                {format(dates[0].endDate, "dd-MMM-yyyy")}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsItemOptions">

                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min Price <small>per night</small>
                  </span>
                  <input type="Number" min={0} onChange={(e) => setMin(e.target.value)} className="lsOptionInput" placeholder="$" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max Price <small>per night</small>
                  </span>
                  <input type="Number" min={0} onChange={(e) => setMax(e.target.value)} className="lsOptionInput" placeholder="$" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Adults
                  </span>
                  <input type="Number" min={1} className="lsOptionInput" placeholder={options?.adult} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Children
                  </span>
                  <input type="Number" min={0} className="lsOptionInput" placeholder={options?.children} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Room
                  </span>
                  <input type="Number" min={1} className="lsOptionInput" placeholder={options?.room} />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? "Loading" :

              data.map((item) => (<>
                <SearchItem item={item} key={item._id} />
              </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
