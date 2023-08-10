import React from "react";
import api from "../utils/api";

function Like({likes, myid, cardid}) {

  const [isLike, setIsLike] = React.useState(false);
  const [count, setLikeCount] = React.useState(likes.length);

  React.useEffect(() => {
    setIsLike(likes.some(element => myid === element._id))
  }, [likes, myid])
  
  function handleLike() {
    if(isLike) {
        api.deleteLike(cardid)
          .then(res => {
            setIsLike(false)
            setLikeCount(res.likes.length)
          })
          .catch(error => console.log(`Ошибка снятия лайка ${error}`));
    } else {
        api.putLike(cardid)
        .then(res =>{
            setIsLike(true)
            setLikeCount(res.likes.length)
        })
        .catch(error => console.log(`Ошибка лайка ${error}`));
    }
  }

  return (
    <>
        <button 
        type="button" className={`cards__like ${isLike ? 'cards__like_active' : ''}`}
        onClick={handleLike} 
        />
        <span className="cards__like-counter">{count}</span>
    </>
  )
}

export default Like