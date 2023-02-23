import axios from "axios";
import React, { useEffect, useState } from "react";
import "./addUser.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [number, setNumber] = useState("");
  const [num, setNum] = useState(1);
  const [update, setUpdate] = useState([]);
  const [key, setKey] = useState();

  const handleClick = async (e) => {
    e.preventDefault();
    const user = {
      name: name,
      author: author,
      number: number,
    };
    const res = await axios.post(
      "http://localhost:5000/api/user/add-order",
      user
    );
    setNum((num) => num + 1);
  };

  // useEffect(() => {

  //   deleteHandler();
  // }, []);

  const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:5000/api/user/${id}`);
    setNum((num) => num + 1);
  };

  const updateHandler = async (id) => {
    // e.preventDefault();
    navigate(`/edituser/${id}`);
  };

  useEffect(() => {
    const gettings = async () => {
      const res = await axios.get("http://localhost:5000/api/user/get-order");

      setUpdate(res.data);
    };
    gettings();
  }, [num]);

  return (
    <>
      <div className="loginRight">
        <form className="loginBox" onSubmit={handleClick}>
          <input
            placeholder="Book Title"
            required
            className="loginInput"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder="Book author"
            required
            className="loginInput"
            type="text"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          <input
            placeholder="Number of Pages"
            required
            type="number"
            className="loginInput"
            minLength="6"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />

          <button className="loginButton" type="submit">
            Add Books
          </button>
        </form>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "30px", flex: "4" }}>
          <h1 style={{ color: "brown" }}>Name</h1>
          <h3 style={{}}>
            {update?.map((n) => (
              <div style={{color: "brown"}} key={n._id}>
                {n.name}
              </div>
            ))}
          </h3>
        </div>

        <div style={{ marginLeft: "30px", flex: "4" }}>
          <h1 style={{color: "blue"}}>Author</h1>
          <h3>
            {update?.map((n) => (
              <div style={{color: "blue"}} key={n._id}>
                {n.author}
              </div>
            ))}
          </h3>
        </div>

        <div style={{ marginLeft: "30px", flex: "4" }}>
          <h1 style={{color: "violet"}}>Pages</h1>
          <h3 style={{color: "violet"}}>
            {update?.map((n) => (
              <>
                <div style={{ display: "flex" }}>~
                  <div
                    style={{
                      width: "120px",
                    }}
                    key={n._id}
                  >
                    {n.number}
                  </div>
                  <button
                    className="updateButton"
                    style={{ marginLeft: "220px", marginTop: "2px" }}
                    onClick={() => updateHandler(n._id)}
                  >
                    update
                  </button>

                  <button
                    className="deleteButton"
                    style={{ marginLeft: "20px", marginTop: "2px" }}
                    onClick={() => deleteHandler(n._id)}
                  >
                    delete
                  </button>
                </div>
              </>
            ))}
          </h3>
        </div>
      </div>
    </>
  );
}

export default AddUser;
