import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from '../shared/user';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModalComponent implements OnInit {
  @Input() user: User = new User();

  constructor(private modalController: ModalController) { }
  dismissModal() {
    this.modalController.dismiss()
  }

  saveUser() {
    this.modalController.dismiss(this.user)
  }
  ngOnInit() { }

}
