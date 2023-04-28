import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';


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

  constructor(private restaurantService: RestaurantService, private modalController: ModalController) { }

  ngOnInit() {
    this.GetCartItems();
    this.restaurantService.currentCart.subscribe((cart: any[]) => {
      this.cartItems = cart;
      if (this.cartItems.length > 0) {
        this.firstImage = this.cartItems[0].image;
      }
    });
  }

  ionViewWillEnter() {
    this.GetCartItems()
    this.itemTotal = this.getItemTotal()
    this.orderTotal = this.getTotal()
  }

  GetCartItems() {
    this.restaurantService.getCartItems().subscribe((result: any[]) => {
      if (result && Array.isArray(result)) {
        this.cartItems = result;
        if (this.cartItems.length > 0) {
          this.firstImage = this.cartItems[0].image;
        }
      }
    });
  }

  getItemTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  getTotal(): number {
    return this.getItemTotal() + this.deliveryFee;
  }

  async makePayment() {
    const restaurant = this.cartItems[0]

    this.restaurantService.saveOrder({
      restaurant: restaurant,
      itemTotal: this.getItemTotal(),
      deliveryFee: this.deliveryFee,
      total: this.getTotal(),
      timestamp: new Date().getTime()
    });

    const modal = await this.modalController.create({
      component: PaymentModalComponent,
      cssClass: 'payment-modal'
    });
    await modal.present()
    await modal.onDidDismiss()
    this.restaurantService.clearCart()
  }

}
