import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Login({ history }) {
    
    const [ username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await api.post('/devs', {
        	username
        });

        const { _id: userId } = response.data;
        history.push(`/devs/${userId}`);
    }

    return (
        <div className="loginContainer">
			<img src={logo} alt="Tim Dev" />
			<form onSubmit={handleSubmit}>
				<input type="text"
					placeholder="digite seu usuário do github"
					value={username}
					name="username"
					onChange={e => setUsername(e.target.value)}
				/>				
				<button type="submit">
					Enviar
				</button>
			</form>
		</div>
    );
}