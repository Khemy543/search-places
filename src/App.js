import React from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [searhKey, setSearchKey] = React.useState("");
  const [places, setPlaces] = React.useState([]);

  React.useEffect(() => {
    const MAP_BOX_TOKEN =
      "pk.eyJ1IjoiZ2Vibzk2IiwiYSI6ImNsMWY0NzczZzByZnQzcXFpanBpczBjcXQifQ.0w75NzO1o2vxGyuauC-vRA";
    async function fetchData() {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searhKey}.json?access_token=${MAP_BOX_TOKEN}`
      );

      if (response) {
        const placeNames = response.data?.features;
        setPlaces(placeNames);
      }
    }
    fetchData();
  }, [searhKey]);

  return (
    <div className="layout">
      <form>
        <div>
          <input
            name="search"
            type="search"
            value={searhKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className="search-input"
            placeholder="Search place... "
          />
        </div>
      </form>

      <div>
        {searhKey && <h5>Search Results for {searhKey}</h5>}
        <ul>
          {places.map((place) => (
            <li key={place.id}>{place.place_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
