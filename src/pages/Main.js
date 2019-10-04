import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';
import api from '../services/api';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png';
export default function Main({ match }) {

    const [users, setUsers] = useState([]);
    const [itsmatch, setItsmatch] = useState(null);

    useEffect(() => {

        (async function loadUsers() {
            const response = await api.get('/devs', { headers: { userid: match.params.id } });
            setUsers(response.data);
        })();

    }, [match.params.id]);

    useEffect(() => {
        const socket = io( process.env.REACT_APP_API_UR , {
            query: {
                userid: match.params.id
            }
        });

        socket.on('match', dev => {
            setItsmatch(dev);
        });

    }, [match.params.id]);

    async function handleLike(id) {
    	await api.post(`/devs/like/${id}`, null, { headers: { userid: match.params.id } });
    	setUsers(users.filter( user => user._id !== id));
    }

    async function handleDislike(id) {
    	await api.post(`/devs/dislike/${id}`, null, { headers: { userid: match.params.id } });
    	setUsers(users.filter( user => user._id !== id));
    }

    return (
        <div className="mainContainer">
        <Link to="/">
    		<img src={logo} alt="TimDev" />
    	</Link>
    	{ users.length > 0 ? (
    	<ul>
    		{users.map( user => (
	    		<li key={ user._id }>
	            <img src={ user.avatar } alt={user.name} />
	            <footer>
	                <strong>{user.name}</strong>
	                <p>{ user.bio }</p>
	            </footer>
	            <div className="buttons">
	                <button type="button" onClick={() => handleDislike(user._id)}>
	                    <img src={dislike} alt="dislike" />
	                </button>
	                <button type="button" onClick={() => handleLike(user._id)} >
	                    <img src={like} alt="like" />
	                </button>
	            </div>
	        	</li> 
    		))} 
    	</ul>
    	) : (
    		<div className="empty"> Acabou :(</div>
    	)} 
        {
            itsmatch && (
                <div className="match-container">
                    <img src={itsamatch} alt="It's a match"/>
                    <img className="avatar" src={itsmatch.avatar} alt={itsmatch.name}/>
                    <strong>{itsmatch.name}</strong>
                    <p>{itsmatch.bio}</p>
                    <button type="button" onClick={() => setItsmatch(null)}>Close</button>
                </div>
            ) 
        }         
        </div>
    )}