import "./App.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ImageModal from "./components/ImageModal";

function App() {
  const [searchText, setSearchText] = useState("african");
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const searchPhoto = async (e) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const {
        data: { results },
      } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/search/photos/?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&query=${searchText}&page=1`
      );
      setLoading(false);
      setPhotos(results);
    } catch (error) {
      setErrorMessage(
        "Sorry, Something's not right. Please check your network connectivity"
      );
      setLoading(false);
    }
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  useEffect(() => {
    searchPhoto();
  }, [searchText]);
  return (
    <div className="App container">
      <header className="App-header header">
        <div style={{ position: "relative" }}>
          <FaSearch
            onClick={() => console.log(photos)}
            style={{ position: "absolute", left: "130px", top: "18" }}
          />
          <input
            onChange={(e) => {
              handleSearchInput(e);
            }}
            type="text"
            id="search"
            placeholder="Search for photos"
          />
        </div>
      </header>
      <section>
        <div className="grid-container">
          {photos.length > 0 &&
            !loading &&
            photos.map((item, index) => (
              <div
                onClick={() => {
                  console.log(item);
                  setModalData(item);
                  setShowModal(true);
                }}
                key={index}
                className="grid-item"
              >
                <img
                  src={item.urls && item.urls.regular}
                  className="img-responsive"
                  style={{ width: "100%", height: "80%" }}
                />
                <div
                  style={{
                    position: "absolute",
                    marginTop: "-80px",
                    marginLeft: "10px",
                    color: "#fff",
                    textAlign: "left",
                  }}
                >
                  <h4>
                    {item.user && item.user.first_name}{" "}
                    {item.user && item.user.last_name}
                  </h4>
                  <h6 style={{ textAlign: "left" }}>
                    {item.user && item.user.location}
                  </h6>
                </div>
              </div>
            ))}

          {loading &&
            arr.map((item, index) => (
              <div key={index} className="grid-item">
                <Skeleton />
                <div
                  style={{
                    position: "absolute",
                    marginTop: "-80px",
                    marginLeft: "10px",
                    color: "#fff",
                  }}
                >
                  
                </div>
              </div>
            ))}
        </div>
        {errorMessage && !loading && <h4>{errorMessage}</h4>}
      </section>
      <ImageModal
        imgUrl={modalData && modalData.urls.full}
        closeModal={() => setShowModal(false)}
        show={showModal}
      />
    </div>
  );
}

export default App;
