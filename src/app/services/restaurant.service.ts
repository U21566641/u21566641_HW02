import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { restaurant } from "../shared/restaurant";

@Injectable({
    providedIn: 'root'
})

export class RestaurantService {
    private orderSource = new BehaviorSubject<any[]>([])
    pastOrders = this.orderSource.asObservable()

    private cartSource = new BehaviorSubject<any[]>([])
    currentCart = this.cartSource.asObservable()
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

    setCart(restaurant: any) {
        localStorage.setItem('cart', JSON.stringify(restaurant));
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

    saveOrder(order: any) {

        let orders = [];

        if (localStorage.getItem('orders')) {
            orders = JSON.parse(localStorage.getItem('orders') || '{}');
        }
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        this.orderSource.next(orders);
    }

    getOrders(): Observable<any[]> {

        if (localStorage.getItem('orders')) {
            let pastOrders = JSON.parse(localStorage.getItem('orders') || '{}');
            this.orderSource.next(pastOrders)
        }
        return this.pastOrders;
    }


    addToCart(restaurant: restaurant) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push(restaurant);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.cartSource.next(cart);
    }

    clearCart() {
        localStorage.removeItem('cart');
        this.cartSource.next([]);
    }

}