import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { User } from '../shared/user';
import { ModalController } from '@ionic/angular';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { HelpModalComponent } from '../help-modal/help-modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  orders: any[] = [];
  user: User = new User();
  constructor(private restaurantService: RestaurantService, private modalController: ModalController, private router: Router) { }

  ngOnInit() {
    this.GetUser();
    this.getOrders();
  }

  GetUser() {
    this.restaurantService.getUser().subscribe(result => {
      this.user = result;
    })
  }

  getOrders() {
    this.restaurantService.getOrders().subscribe(result => {
      this.orders = result;
    });
  }

  reorder(order: any) {
    this.restaurantService.setCart(order.restaurant);
    this.router.navigate(['/tabs/cart']);
  }

  async editUser() {
    const modal = await this.modalController.create({
      component: EditUserModalComponent,
      componentProps: {
        user: { ...this.user },
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.user = result.data;
        this.restaurantService.updateUser(this.user);
      }
    });

    await modal.present();
  }

  async help() {
    const modal = await this.modalController.create({
      component: HelpModalComponent,
    });
    return await modal.present();
  }
}
