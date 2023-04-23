import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { restaurant } from '../shared/restaurant';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  restaurants: restaurant[] = []
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.GetResturants()
    console.log(this.restaurants)
  }

  GetResturants() {
    this.restaurantService.getRestaurants().subscribe(result => {
      let resaurantList: any[] = result
      resaurantList.forEach((element) => {
        this.restaurants.push(element)
      });
    })

  }

}
