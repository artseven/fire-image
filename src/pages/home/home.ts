import { Http } from '@angular/http';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides:Slides
  fetchedImages: any;
  images: any;
  // goToSlide() {
  //   this.slides.slideTo(1, 5000);
  // }
  constructor(
    public navCtrl: NavController,
    public http: Http
  ) {
    this.http.get('http://solosnet.com/signage/test.cfm')
    .map(res=> res.json())
    .subscribe(data=> {
      this.fetchedImages = data
      this.images = this.fetchedImages;
    }
  );
  }

  refresh = setInterval(()=> {
    this.http.get('http://solosnet.com/signage/test.cfm')
    .map(res=> res.json())
    .subscribe(data=> {
      this.fetchedImages = data
      console.log('IMAGES', this.fetchedImages.length);
      this.images = this.fetchedImages;
    });
  }, 5000);

  

  download() {
    var fileTransfer = new Transfer();
  }

}
