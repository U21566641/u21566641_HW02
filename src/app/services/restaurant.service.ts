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
                "name": "Popeyes",
                "type": "Fast Food",
                "ratings": 4.5,
                "distance": 1.2,
                "price": 200,
                "time": 25,
                "image": "assets/images/restaurants/popeyes.jpg"
            },
            {
                "name": "Roscoes",
                "type": "Soul Food",
                "ratings": 4.8,
                "distance": 2.25,
                "price": 100,
                "time": 35,
                "image": "assets/images/restaurants/roscoes.jpg"
            },
            {
                "name": "Chick-fil-A",
                "type": "Fast Food",
                "ratings": 5,
                "distance": 1.5,
                "price": 150,
                "time": 30,
                "image": "assets/images/restaurants/chick-fil-a.png"
            },
            {
                "name": "Wendy's",
                "type": "Fast Food",
                "ratings": 3.8,
                "distance": 1.2,
                "price": 200,
                "time": 20,
                "image": "assets/images/restaurants/wendys.jpg"
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