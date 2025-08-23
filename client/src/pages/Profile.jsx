import { useEffect } from "react";
import { UseAuthStore } from "../store/UseAuthStore";

function Profile() {
    const { profile } = UseAuthStore();

    useEffect(()=>{
        profile();
    },[]);

  return (
    <div>Profile</div>
  )
}

export default Profile