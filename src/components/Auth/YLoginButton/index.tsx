import { useEffect, useState } from "react";
import classes from "./index.module.css"

interface YLoginButtonProps {
  currentUser?: User,
}

interface User {
  _id: string
  email: string,
  name: string,
  avatar: string,
}

const YLoginButton: React.FC<YLoginButtonProps> = ({ currentUser }) => {
  
  const clientId = '85d13ff8593a461a9d0d6328dc713073';
  const redirectUri = 'http://v101242.hosted-by-vdsina.com:3000/auth/callback';

  const login = () => {
    const yandexAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = yandexAuthUrl;
  };

  return (
    <>
      {currentUser && currentUser._id !== '0' ? 
      <div className={classes.YLoginButton}>
        <img src={`https://avatars.yandex.net/get-yapic/${currentUser.avatar}/islands-small`} alt="user"/>
        <div className={classes.userInfo}>
          <div className={classes.name}>@{currentUser.name}</div>
          <div className={classes.email}>{currentUser.email}</div>
        </div>
      </div> : 
      <div className={classes.YLoginButton} onClick={login}>Войти через Yandex ID</div>}
    </>
  );
};

export default YLoginButton;