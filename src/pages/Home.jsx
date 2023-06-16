import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { province, districts } from "../utills/Nepal";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveData } from "../store/formSlice";

const Home = () => {
  const inputref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState("");
  const [userFormData, setUserFormData] = useState({
    userName: "",
    userBio: "",
    userProvince: "1",
    userDistrict: "",
    userStreet: "",
  });


  const handleChange = (e) => {
    setUserFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImgChange = (e) => {
    const selectedFile = e.target.files[0];

    const allowedFileTypes = ["image/jpeg", "image/png", "image/webp"];

    if (allowedFileTypes.includes(selectedFile.type)) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserImg(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } catch (error) {
        toast.error("An error occurred while processing the file.");
      }
    } else {
      toast.warn(`Only jpeg, png & webp files are allowed.`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      userFormData.userName === "" ||
      userFormData.userBio === "" ||
      userFormData.userDistrict === "" ||
      userFormData.userStreet === "" ||
      userImg === ""
    ) {
      toast.error("All fields are required");
    } else {
      dispatch(saveData([userFormData, userImg]));
      toast.success("Successfully Submitted");
      navigate("/profiles");
    }
  };

 

  return (
    <>
      <div className="formwrapper">
        <h1 className="title">User's Information</h1>
        <form className="userForm" onSubmit={handleSubmit}>
          <fieldset className="nameField">
            <legend>
              Name:
              <span className="requiredField">*</span>
            </legend>
            <input
              name="userName"
              type="text"
              placeholder="Enter your name"
              className="inputField"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <legend>
              Bio:
              <span className="requiredField">*</span>
            </legend>
            <textarea
              name="userBio"
              className="inputField"
              placeholder="Tell us about yourself"
              cols="10"
              rows="2"
              onChange={handleChange}
            ></textarea>
          </fieldset>
          <fieldset>
            <legend>
              Select Province:
              <span className="requiredField">*</span>
            </legend>
            <select
              name="userProvince"
              className="inputField"
              onChange={handleChange}
            >
              {province?.map((p, index) => (
                <option
                  value={ p.label}
                  key={index}
                >
                  {p.value}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset>
            <legend>
              Select District:
              <span className="requiredField">*</span>
            </legend>
            <select
              name="userDistrict"
              className="inputField"
              onChange={handleChange}
            >
              {districts
                ?.filter(
                  (dist) => dist.province_id === userFormData.userProvince
                )
                .map((p, index) => (
                  <option
                    key={index}
                     value={ p.name}
                  >
                    {p.name}
                  </option>
                ))}
            </select>
          </fieldset>
          <fieldset className="nameField">
            <legend>
              City/Village:
              <span className="requiredField">*</span>
            </legend>
            <input
              name="userStreet"
              type="text"
              placeholder="Enter your name"
              className="inputField"
              onChange={handleChange}
            />
          </fieldset>
          <br />
          <fieldset className="photoField">
            <legend>
              Upload Profile
              <span className="requiredField">*</span>
            </legend>
            <input
              name="userProfile"
              type="file"
              className="inputField photoInput"
              ref={inputref}
              onChange={handleImgChange}
            />
            {userImg ? (
              <img
                src={userImg}
                alt=""
                className="uploadImg"
                onClick={() => inputref.current.click()}
              />
            ) : (
              <img
                src="Images/UPLOAD.PNG"
                alt=""
                className="uploadImg"
                onClick={() => inputref.current.click()}
              />
            )}
          </fieldset>
          <br />
          <input type="submit" value="Submit" className="sbmitBTN" />
        </form>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      <br />
    </>
  );
};

export default Home;
