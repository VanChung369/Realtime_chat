import React,{useEffect,useState} from "react";

const Welcome = ({currentUser}) => {
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatar);
      setCurrentUserName(currentUser.name);
    }
  }, [currentUser]);

  return (
    <>
     <div className="main" data-mobile-height="">

    <div className="chat flex-column justify-content-center text-center">
    <div className="container-xxl">

        <div className="avatar avatar-lg mb-5">
            <img className="avatar-img" src={currentUserImage} alt=""/>
        </div>

        <h6>Hey, {currentUserName}!</h6>
        <p>Please select a chat to start messaging.</p>
    </div>
   </div>

</div>
    </>
  )
}

export default Welcome