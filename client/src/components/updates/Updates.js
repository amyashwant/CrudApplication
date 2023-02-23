import axios from "axios";
import React, { useEffect, useState } from "react";
import "./updates.css";
import { useParams, useNavigate } from "react-router-dom";

function Updates() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [number, setNumber] = useState("");
  const [num, setNum] = useState(1);
  const [update, setUpdate] = useState([]);

  // console.log(id)

  const handleClick = async (e) => {
    e.preventDefault();
    const user = {
      name: name,
      author: author,
      number: number,
    };
    const res = await axios.put(`http://localhost:5000/api/user/${id}`, user);
    setNum((num) => num + 1);
    navigate("/adduser");
  };

  useEffect(() => {
    const gettings = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/user/get-order/${id}`
      );
      // console.log(res.data)
      // setUpdate(res.data);
    };
    gettings();
  }, []);

  return (
    <>
      <div className="loginRight">
        <form className="loginBox" onSubmit={handleClick}>
          <input
            placeholder="Edit Book Title"
            required
            className="loginInput"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder="Edit Book author"
            required
            className="loginInput"
            type="text"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          <input
            placeholder="Edit Number of Pages"
            required
            type="number"
            className="loginInput"
            minLength="6"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />

          <button className="loginButton" type="submit">
            Edit Books
          </button>
        </form>
      </div>
    </>
  );
}

export default Updates;
