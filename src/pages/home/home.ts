import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  images = [
      {
        FILE: "http://www.solosnet.com/signage/vertical12up90.jpg",
        DATETIME: 1508944716
      },
      {
        FILE: "http://www.solosnet.com/signage/vertical1up90.jpg",
        DATETIME: 1508944836
      },
      {
        FILE: "http://www.solosnet.com/signage/america.gif",
        DATETIME: 1508945016
      }
  ];
  constructor(public navCtrl: NavController) {

  }


  download() {
    var fileTransfer = new Transfer();
  }

}
