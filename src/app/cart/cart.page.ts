import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  itemTotal: number = 0;
  orderTotal: number = 0;
  deliveryFee: number = 50;
  firstImage: string = "";

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.GetCartItems()
  }



  GetCartItems() {
    this.restaurantService.getCartItems().subscribe(result => {
      let resaurantList: any[] = result
      resaurantList.forEach((element) => {
        this.cartItems.push(element)
        this.firstImage = this.cartItems[0].image
      });
    })
  }



  getItemTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  getTotal(): number {
    return this.getItemTotal() + this.deliveryFee;
  }

}
