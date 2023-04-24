import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { restaurant } from '../shared/restaurant';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchQuery = '';
  restaurants: restaurant[] = [];
  filteredRestaurants: restaurant[] = [];
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(result => {
      this.restaurants = result;
      this.filteredRestaurants = [];
    })

  }

  search() {
    if (this.searchQuery.trim() === '') {
      this.filteredRestaurants = [];
    } else {
      this.filteredRestaurants = this.restaurants.filter((restaurant) => {
        return restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      })
    }
  }

  addToCart(restaurant: restaurant) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(restaurant);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

}
