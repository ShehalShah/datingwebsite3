import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useCookies} from 'react-cookie'
import axios from 'axios';
import { FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const curuser = cookies.UserId
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const nav = useNavigate();
  const { userId } = useParams();
  const [updateCount, setUpdateCount] = useState(0);
  const [formData, setFormData] = useState({
    first_name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    show_gender: '',
    gender_identity: '',
    gender_interest: '',
    url: '',
    about: '',
    matches: []
  });

  useEffect(() => {
    getUser();
  }, [userId, updateCount]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
        ...prevState,
        [name]: value
    }));
};
  
const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
        ...formData,
        user_id: userId 
    };
    console.log(data);
    try {
        const response = await axios.put('http://localhost:8000/user', {data});
        setUser(response.data);
        setEditing(false);
        setUpdateCount(updateCount + 1);
    } catch (error) {
        console.log(error);
    }
};

  

const getUser = async () => {
  try {
    const response = await axios.get('http://localhost:8000/user', {
      params: { userId },
    });
    setUser(response.data);
    setFormData({
      first_name: response.data.first_name,
      dob_day: response.data.dob_day,
      dob_month: response.data.dob_month,
      dob_year: response.data.dob_year,
      show_gender: response.data.show_gender,
      gender_identity: response.data.gender_identity,
      gender_interest: response.data.gender_interest,
      url: response.data.url,
      about: response.data.about,
      matches: response.data.matches
    });
  } catch (error) {
    console.log(error);
  }
};

  const handleEdit = () => {
    setEditing(true);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    removeCookie('UserId', cookies.UserId)
    removeCookie('AuthToken', cookies.AuthToken)
    nav("/")
}

  return (
    <div className='profileback'>
      <div className='card profile-card'>
      <div className='card-header'>
          <div className='back-button' onClick={()=>{nav("/dashboard")}} style={{cursor:"pointer"}}>
            <FaArrowLeft />
          </div>
          <div className='logout-button' onClick={handleLogout} style={{cursor:"pointer"}}>
            <FaSignOutAlt />
          </div>
        </div>
        <div className='profile-container'>
          <div className='profile-image'>
            <img src={user.url} alt='' />
          </div>
          <div className='profile-details'>
            <h2>{user.first_name}</h2>
            <p>Email: {user.email}</p>
            {editing ? (
    <form onSubmit={handleSubmit}>
        <input type="hidden" name="user_id" value={user.user_id} />
        <label htmlFor='dob_day'>Day of Birth</label>
        <input type='number' name='dob_day' defaultValue={user.dob_day} onChange={handleInputChange} />
        <label htmlFor='dob_month'>Month of Birth</label>
        <input type='number' name='dob_month' defaultValue={user.dob_month} onChange={handleInputChange} />
        <label htmlFor='dob_year'>Year of Birth</label>
        <input type='number' name='dob_year' defaultValue={user.dob_year} onChange={handleInputChange} />
        <label htmlFor='url'>Profile Image URL</label>
        <input type='url' name='url' defaultValue={user.url} onChange={handleInputChange} />
        <label htmlFor='about'>About</label>
        <textarea name='about' defaultValue={user.about} onChange={handleInputChange}></textarea>
        <button type='submit'>Save</button>
    </form>
            ) : (
              <>
                <p>Bio: {user.about}</p>
                <p>Age: {2023 - user.dob_year}</p>
                <p>Date of Birth: {user.dob_day}-{user.dob_month}-{user.dob_year}</p>
                {curuser===userId&&<button onClick={handleEdit}>Edit Profile</button>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
