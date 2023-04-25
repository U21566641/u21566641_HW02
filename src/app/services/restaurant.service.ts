import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { restaurant } from "../shared/restaurant";

@Injectable({
    providedIn: 'root'
})

export class RestaurantService {
    constructor() {
        if (!localStorage.getItem('restaurants')) {
            let restaurants = [{
                "id": 1,
                "name": "Popeyes",
                "type": "Fast Food",
                "ratings": 4.5,
                "distance": 1.2,
                "price": 200,
                "time": 25,
                "image": "assets/images/restaurants/popeyes.jpg",
                "description": "for two"
            },
            {
                "id": 2,
                "name": "Roscoes",
                "type": "Soul Food",
                "ratings": 4.8,
                "distance": 2.25,
                "price": 100,
                "time": 35,
                "image": "../assets/images/restaurants/roscoes.jpg",
                "description": "for one"
            },
            {
                "id": 3,
                "name": "Chick-fil-A",
                "type": "Fast Food",
                "ratings": 5,
                "distance": 1.5,
                "price": 150,
                "time": 30,
                "image": "../assets/images/restaurants/chick-fil-a.png",
                "description": "for one"
            },
            {
                "id": 4,
                "name": "Wendy's",
                "type": "Fast Food",
                "ratings": 3.8,
                "distance": 1.2,
                "price": 200,
                "time": 20,
                "image": "assets/images/restaurants/wendys.jpg",
                "description": "for four"
            }]
            localStorage.setItem('restaurants', JSON.stringify(restaurants));

        }
        if (!localStorage.getItem('user')) {
            let user = {
                "id": 1,
                "name": "John",
                "surname": "Doe",
                "phoneNumber": "123456789",
                "email": "johndoe@gmail.com"
            }
            localStorage.setItem("user", JSON.stringify(user));
        }


    }

    getRestaurants(): Observable<any[]> {
        let restaurants: any[] = []
        if (localStorage.getItem('restaurants')) {
            restaurants = JSON.parse(localStorage.getItem('restaurants') || '{}');
        }
        return of(restaurants)
    }

    getCartItems(): Observable<any[]> {
        let cart: any[] = []
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart') || '{}');
        }
        return of(cart)
    }

    getUser(): Observable<any> {
        let user: any = {}
        if (localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user') || '{}');
        }
        return of(user)
    }

    updateUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }





}