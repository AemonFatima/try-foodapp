import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form, message } from 'antd';
import { login } from '../store/actions/authActions';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleSubmit = () => {
    dispatch(login(username, password));
  };

  useEffect(() => {
    console.log("Auth State: ", auth); // Add this line for debugging
    if (auth.isAuthenticated) {
      navigate('/Landing');
    } else if (auth.error) {
      message.error(auth.error);
    }
  }, [auth, navigate]);

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Username">
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>
      <Form.Item label="Password">
        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>
      <Button type="primary" htmlType="submit">Login</Button>
    </Form>
  );
};

export default Login;
