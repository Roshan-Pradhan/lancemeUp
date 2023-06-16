import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { province, districts } from "../utills/Nepal";
import { saveData } from "../store/formSlice";

const Profile = () => {
  const inputref = useRef(null);
  const dispatch = useDispatch();
  const [userImg, setUserImg] = useState("");
  const userData = useSelector((state) => state.formData);
  const provinceName = province.filter(
    (item) => item.label === userData[0]?.userProvince
  );
  const [editFields, setEditFields] = useState({
    userName: false,
    userBio: false,
    userProvince: false,
    userDistrict: false,
    userStreet: false,
  });
  const [userFormData, setUserFormData] = useState({
    userName: userData[0]?.userName,
    userBio: userData[0]?.userBio,
    userProvince: userData[0]?.userProvince,
    userDistrict: userData[0]?.userDistrict,
    userStreet: userData[0]?.userStreet,
  });

  //to check which fiels edit button is pressed
  const handleEdit = (field) => {
    setEditFields((prev) => ({ ...prev, [field]: true }));
  };

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

  const handleSubmit = () => {
    dispatch(saveData([userFormData, userImg ? userImg : userData[1]]));
    setEditFields(false);
    setUserImg("");
  };

  return (
    <div className="profileWrapper">
      {Object.keys(userData).length > 0 ? (
        <div className="innerWrappper">
          <input
            name="userProfile"
            type="file"
            className="inputField photoInput"
            ref={inputref}
            onChange={handleImgChange}
          />
          {userImg ? (
            <>
              <img
                src={userImg}
                alt=""
                className="profileImg"
                onClick={() => inputref.current.click()}
              />
              <button className="updateHandler" onClick={handleSubmit}>
                Update
              </button>
            </>
          ) : (
            <img
              src={userData[1]}
              alt=""
              className="profileImg"
              onClick={() => inputref.current.click()}
            />
          )}

          <div className="profileInfo">
              <span className="profileKey">Name</span>
            <div className="profileEdit">
              <input
                type="text"
                name="userName"
                defaultValue={userData[0].userName}
                className={editFields.userName ? "showFocus" : "profileValue"}
                disabled={editFields.userName ? false : true}
                onChange={handleChange}
              />
              {editFields.userName ? (
                <button className="updateHandler" onClick={handleSubmit}>
                  Update
                </button>
              ) : (
                <button
                  className="updateHandler"
                  onClick={() => handleEdit("userName")}
                >
                  Edit
                </button>
              )}
            </div>
            <span className="profileKey">Biography</span>
            <div className="profileEdit">
              <textarea
                name="userBio"
                defaultValue={userData[0].userBio}
                className={editFields.userBio ? "showFocus" : "profileValue"}
                cols="80"
                rows="3"
                disabled={editFields.userBio ? false : true}
                onChange={handleChange}
              ></textarea>
              {editFields.userBio ? (
                <button className="updateHandler" onClick={handleSubmit}>
                  Update
                </button>
              ) : (
                <button
                  className="updateHandler"
                  onClick={() => handleEdit("userBio")}
                >
                  Edit
                </button>
              )}
            </div>
            <span className="profileKey">Province</span>
            <div className="profileEdit">
              {editFields.userProvince ? (
                <select
                  name="userProvince"
                  className="inputFieldProfile"
                  onChange={handleChange}
                  disabled={editFields.userProvince ? false : true}
                >
                  {province?.map((p, index) => (
                    <option value={p.label} key={index}>
                      {p.value}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="profileValue">{provinceName[0].value}</p>
              )}

              {editFields.userProvince ? (
                <button className="updateHandler" onClick={handleSubmit}>
                  Update
                </button>
              ) : (
                <button
                  className="updateHandler"
                  onClick={() => handleEdit("userProvince")}
                >
                  Edit
                </button>
              )}
            </div>
            <span className="profileKey">District</span>

            <div className="profileEdit">
              {editFields.userDistrict ? (
                <select
                  name="userDistrict"
                  className="inputFieldProfile "
                  onChange={handleChange}
                  disabled={editFields.userDistrict ? false : true}
                >
                  {districts
                    ?.filter(
                      (dist) => dist.province_id === userFormData.userProvince
                    )
                    .map((p, index) => (
                      <option key={index} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                </select>
              ) : (
                <p className="profileValue">{userData[0].userDistrict}</p>
              )}

              {editFields.userDistrict ? (
                <button className="updateHandler" onClick={handleSubmit}>
                  Update
                </button>
              ) : (
                <button
                  className="updateHandler"
                  onClick={() => handleEdit("userDistrict")}
                >
                  Edit
                </button>
              )}
            </div>
            <span className="profileKey">City/Village</span>
            <div className="profileEdit">
              <input
                type="text"
                name="userStreet"
                defaultValue={userData[0].userStreet}
                className={editFields.userStreet ? "showFocus" : "profileValue"}
                disabled={editFields.userStreet ? false : true}
                onChange={handleChange}
              />
              {editFields.userStreet ? (
                <button className="updateHandler" onClick={handleSubmit}>
                  Update
                </button>
              ) : (
                <button
                  className="updateHandler"
                  onClick={() => handleEdit("userStreet")}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <br />
        </div>
      ) : (
        <div>
          <p style={{ color: "white" }}>No user Data Available</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
