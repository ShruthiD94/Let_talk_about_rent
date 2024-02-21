import React, { useRef, useState, useEffect } from "react";
import {
  GetArticleSchema,
  PublishArticle,
} from "../../components/util/DataManager";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { database } from "../../firebase";
import { PrimaryButton, SecondaryButton } from "../../components/buttons/buttons";
import "./postarticle.css"

export default function PostArticle() {
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // check data
    if (
      !Number.isInteger(Number(addressData.postalcode)) ||
      addressData.postalcode.length !== 5
    ) {
      setFeedback("The postal code you entered was incorrect.");
      return;
    }

    addressData["city"] = cityRef.current.value;
    // create data
    const data = GetArticleSchema();
    data.author = currentUser.uid;
    data.title = titleRef.current.value;
    data.address = addressData;
    data.appartmentData = {
      "cold-rent": coldRef.current.value,
      "warm-rent": warmRef.current.value,
      area: areaRef.current.value,
      rooms: roomsRef.current.value,
    };
    data.ratings = {
      appartment: appartmentRef.current.value,
      landlord: landlordRef.current.value,
      location: locationRef.current.value,
    };
    data.questionnaire = sections;
    data.userType = "Tenant";

    console.log(data);

    const response = PublishArticle(data);
    if (response != null) {
      response.then(() => navigate("/articledashboard"));
    }
  };

  const handleAddSection = () => {
    const values = [...sections];
    setSections(values.concat({ title: "", content: "" }));
  };

  const handleRemove = (e, idx) => {
    e.preventDefault();

    const values = [...sections];
    values.splice(idx, 1);
    setSections(values);
  };

  const handleChange = (e, idx) => {
    e.preventDefault();

    console.log(e.target.name);
    const values = [...sections];
    values[idx][e.target.name] = e.target.value;
    setSections(values);
  };

  const handleAddressChange = (e) => {
    const target = e.target;
    const id = target.id;

    const tempData = { ...addressData };
    tempData[id] = target.value;

    SetAddressData(tempData);
  };

  const HandleCityDropdownMenu = async () => {
    const zip = addressData.postalcode;
    const ref = database.ref("geodata/").orderByChild("zipcode").equalTo(zip);

    const data = await ref.get().then((snapshot) => {
      if (!snapshot.exists()) return;

      return Object.values(snapshot.val());
    });

    // 56357 worst case
    console.log(data);

    if (data == null) return;
    SetCachedCities(data);
  };

  // quick data
  const titleRef = useRef("");
  const coldRef = useRef(0);
  const warmRef = useRef(0);
  const areaRef = useRef(0);
  const roomsRef = useRef(0);
  // ratings
  const appartmentRef = useRef(0);
  const landlordRef = useRef(0);
  const locationRef = useRef(0);
  // city
  const cityRef = useRef("");

  const [addressData, SetAddressData] = useState({});
  const [cachedCities, SetCachedCities] = useState([]);
  const [sections, setSections] = useState([{ title: "", content: "" }]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (
      !Number.isInteger(Number(addressData.postalcode)) ||
      addressData.postalcode.length !== 5
    )
      return;

    HandleCityDropdownMenu();
  }, [addressData.postalcode]);

  // the values like name and id are very important in the dynamic forms.
  // the way I programmed them is that they know which data they contain by their name.
  // pls do not change!!!

  if (!currentUser) {
    return (
      <span className="d-flex justify-content-center w-100">
        You have to be{" "}
        <Link to="/login" className="px-1">
          logged in
        </Link>{" "}
        to post :(
      </span>
    );
  }

  return (
        <div className="article-card-body card-blue-header">
          <h4 className="title article-title">Share your experience!</h4>
          {feedback && (
            <div className="alert alert-danger" role="alert">
              {feedback}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group col-md-5">
                <label htmlFor="title">Title</label>
                <input
                  ref={titleRef}
                  type="text"
                  className="form-control mt-1"
                  id="title"
                  placeholder="Title"
                  required
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-md-4">
                <label htmlFor="postalcode">Postal Code</label>
                <input
                  onChange={handleAddressChange}
                  type="text"
                  className="form-control mt-1"
                  id="postalcode"
                  placeholder="Postal code"
                  required
                />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="city">City</label>
                <select
                  className="form-control mt-1"
                  id="city"
                  ref={cityRef}
                  required
                >
                  {cachedCities.map((city, idx) => (
                    <option key={idx}>{city.city}</option>
                  ))}
                </select>
              </div>
            </div>
            <hr />
            <div className="row mt-2">
              <div className="form-group col-md-3">
                <label htmlFor="cold-rent">Cold Rent</label>
                <input
                  ref={coldRef}
                  type="text"
                  className="form-control"
                  id="cold-rent"
                  placeholder="0"
                  required
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="warm-rent">Warm Rent</label>
                <input
                  ref={warmRef}
                  type="text"
                  className="form-control"
                  id="warm-rent"
                  placeholder="0"
                  required
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="cold-rent">Area</label>
                <input
                  ref={areaRef}
                  type="text"
                  className="form-control"
                  id="cold-rent"
                  placeholder="0"
                  required
                />
                <small className="text-muted">
                  If you don't know, estimate.
                </small>
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="rooms">Rooms</label>
                <input
                  ref={roomsRef}
                  type="text"
                  className="form-control"
                  id="rooms"
                  placeholder="1"
                  required
                />
              </div>
            </div>
            <h5 className="mt-1"> Ratings </h5>
            <div className="row mt-2">
              <div className="form-group col-md-4">
                <label htmlFor="rating-appartment">Appartment</label>
                <input
                  ref={appartmentRef}
                  type="text"
                  className="form-control"
                  id="rating-appartment"
                  placeholder="3"
                  required
                />
                <small
                  id="rating-help-appartment"
                  className="form-text text-muted"
                >
                  The Appartment
                </small>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="rating-landlord">Landlord</label>
                <input
                  ref={landlordRef}
                  type="text"
                  className="form-control"
                  id="rating-landlord"
                  placeholder="3"
                  required
                />
                <small
                  id="rating-help-landlord"
                  className="form-text text-muted"
                >
                  The Landlord Experience
                </small>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="rating-location">Location</label>
                <input
                  ref={locationRef}
                  type="text"
                  className="form-control"
                  id="rating-location"
                  placeholder="3"
                  required
                />
                <small
                  id="rating-help-landlord"
                  className="form-text text-muted"
                >
                  The generell environment
                </small>
              </div>
            </div>
            <div className="row mt-4">
              <h5 className="mb-0"> Write something about your experience</h5>
              {sections &&
                sections.map((section, idx) => (
                  <div key={idx}>
                    <div className="row mt-2">
                      <div className="form-group col-md-6">
                        <label htmlFor={"titel" + idx}> Caption </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Section Title"
                          value={section.title}
                          name="title"
                          id={"titel" + idx}
                          onChange={(event) => handleChange(event, idx)}
                        />
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="form-group col-md-6">
                        <label htmlFor={"content" + idx}> Talk about it </label>
                        <textarea
                          className="form-control"
                          placeholder="Write something here"
                          value={section.content}
                          name="content"
                          id={"content" + idx}
                          onChange={(event) => handleChange(event, idx)}
                        ></textarea>
                      </div>
                      <div className="col-md-1 d-flex align-items-center">
                        <button
                          className="btn btn-danger p-2 lh-1"
                          onClick={(e) => handleRemove(e, idx)}
                        >
                          <FaRegTrashAlt size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              <div className="col-md-4">
                <SecondaryButton
                  onClick={handleAddSection}
                  className="mt-2"
                >
                  Add a new Section
                </SecondaryButton>
              </div>
            </div>
            <PrimaryButton type="submit" className="mt-2">
              Post
            </PrimaryButton>
          </form>
        </div>
  )
}
