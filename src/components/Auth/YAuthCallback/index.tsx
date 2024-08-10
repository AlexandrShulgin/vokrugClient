import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const YAuthCallback: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      axios.post('http://v101242.hosted-by-vdsina.com:5000/api/users', { code })
        .then(response => {
          // Сохраните токен и перенаправьте пользователя
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user))
          navigate('/');
        })
        .catch(error => {
          console.error('Ошибка авторизации:', error);
        });
    }
  }, []);

  return <div>Авторизация...</div>;
};

export default YAuthCallback;