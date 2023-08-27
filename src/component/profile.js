import React from "react";

const Profile = () => {

    let auth = localStorage.getItem('user');
    return(
        <div>
            <h2>Welcome {JSON.parse(auth).name}</h2>
        </div>
    )
}

export default Profile;