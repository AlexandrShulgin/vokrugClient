import { useEffect, useState } from "react";
import classes from "./index.module.css"
import axios from 'axios';

const YANDEX_CLIENT_ID = '85d13ff8593a461a9d0d6328dc713073';
const REDIRECT_URI = 'http://localhost:3000';

const Auth = () => {
  
  const [token, setToken] = useState<any>(null);
  const [data, setData] = useState<any>()
  
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get('access_token');
      if (token) {
        setToken(token);
        getUserData(token);
      }
    }
  }, []);

  const getUserData = async (token: any) => {
    try {
      const response = await axios.get(`https://login.yandex.ru/info?oauth_token=${token}`);
      console.log(response.data);
      setData(response.data)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogin = () => {
    const authUrl = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${YANDEX_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = authUrl;
  };
  return ( 
    <>
    {!token ? 
      <div className={classes.Auth}>
        <p className={classes.greet}>Войдите, чтобы использовать все возможности приложения</p>
        <button className={classes.authButton} onClick={handleLogin}>Войти</button>
      </div> 
    :
      <div className={classes.profileImg}>
        <img src={`https://avatars.yandex.net/get-yapic/${data?.default_avatar_id}/islands-50`}/>
      </div>
    }
    </>
  )
}

export default Auth;