import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { User } from '../shared/user';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user: User = new User();
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.GetUser();
  }

  GetUser() {
    this.restaurantService.getUser().subscribe(result => {
      this.user = result;
    })
  }

  editUser() {
    this.restaurantService.updateUser(this.user)
  }

}
