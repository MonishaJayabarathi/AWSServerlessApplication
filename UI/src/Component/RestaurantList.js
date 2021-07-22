import React , {useState} from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import { getRestaurantList } from '../service';
 
const RestaurantList = () => {
    const history = useHistory();
    const location = useLocation();

    const[restaurantsList,setRestaurantsList] = useState("")

    const [users, setUsers] = useState([
        { id: 1, firstName: 'Frank', lastName: 'Murphy', email: 'frank.murphy@test.com', role: 'User' },
        { id: 2, firstName: 'Vic', lastName: 'Reynolds', email: 'vic.reynolds@test.com', role: 'Admin' },
        { id: 3, firstName: 'Gina', lastName: 'Jabowski', email: 'gina.jabowski@test.com', role: 'Admin' },
        { id: 4, firstName: 'Jessi', lastName: 'Glaser', email: 'jessi.glaser@test.com', role: 'User' },
        { id: 5, firstName: 'Jay', lastName: 'Bilzerian', email: 'jay.bilzerian@test.com', role: 'User' }
    ]);
    

    useEffect(() => {
        var temp = fetchResto();
        console.log(restaurantsList);
    })

    //var restaurantsList;
    async function fetchResto(){
        let restaurantList = await getRestaurantList();
        var list = restaurantList.data.restaurantList;
        setRestaurantsList(list);
    }

    const handleMFA = (event) => {
        event.preventDefault()
    }

    const styles = {
        color: "white"
    };

    const dropDownStyle = {width:"945px"};

    return (
        <html>
        <head>
        <title>User Home</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-auth.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-database.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-storage.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-firestore.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-functions.js"></script>
        <script src="https://sdk.amazonaws.com/js/aws-sdk-2.950.0.min.js"></script>
        </head>
        <body>
        <div class="homenav">
            <Link to='/ChatHome'>Chat</Link>
            <Link to='/RestaurantList'>Restaurant</Link>
        </div>
        
        <div style={{"margin-left":"250px"}}>
            <h2>Restaurant List</h2>
                    {restaurantsList && restaurantsList.map(user =>
                        <div class="card">
                        <div class="container">
                            <br></br>
                          <p>{user.restaurantName}</p> 
                          <p>{user.restaurantDescription}</p> 
                          <p>{user.restaurantAddress}</p> 
                          <p>{user.contactNumber}</p> 
                          <p>{user.restaurantEmail}</p> 
                        </div>
                        <br></br>
                      </div>
                    )}
        </div>
        </body>
    </html>
);
}

export default RestaurantList;