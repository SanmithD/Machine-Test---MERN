import { useEffect } from "react";
import { UseAuthStore } from "../store/UseAuthStore";

function Profile() {
    const { profile, auth } = UseAuthStore();

    useEffect(()=>{
        profile();
    },[]);

    console.log(auth);
  return (
    <div>Profile</div>
  )
}

export default Profile