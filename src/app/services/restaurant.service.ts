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
                "image": "assets/restaurants/popeyes.jpg"
            },
            {
                "id": 2,
                "name": "Roscoes",
                "type": "Soul Food",
                "ratings": 4.8,
                "distance": 2.25,
                "price": 100,
                "time": 35,
                "image": "../assets/restaurants/roscoes.jpg"
            },
            {
                "id": 3,
                "name": "Chick-fil-A",
                "type": "Fast Food",
                "ratings": 5,
                "distance": 1.5,
                "price": 150,
                "time": 30,
                "image": "../assets/restaurants/chick-fil-a.png"
            },
            {
                "id": 4,
                "name": "Wendy's",
                "type": "Fast Food",
                "ratings": 3.8,
                "distance": 1.2,
                "price": 200,
                "time": 20,
                "image": "assets/restaurants/wendys.jpg"
            }]
            localStorage.setItem('restaurants', JSON.stringify(restaurants));
        }
    }

    getRestaurants(): Observable<any[]> {
        let restaurants: any[] = []
        if (localStorage.getItem('restaurants')) {
            restaurants = JSON.parse(localStorage.getItem('restaurants') || '{}');
        }
        return of(restaurants)
    }


}