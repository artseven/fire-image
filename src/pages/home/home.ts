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
 
  constructor(
    public navCtrl: NavController,
    public http: Http
  ) {
    this.http.get('http://solosnet.com/signage/test.cfm')
    .map(res=> res.json())
    .subscribe(data=> {
      this.fetchedImages = data
      this.images = this.fetchedImages;
    });
    }
  

  refresh = setInterval(()=> {
    this.http.get('http://solosnet.com/signage/test.cfm')
    .map(res=> res.json())
    .subscribe(data=> {
      this.images = data;
      if (this.images[1].DATETIME - Date.now() > 0 ) {
          this.goToNext(1, this.images[1].DATETIME);
      }
    });
  }, 10000);

  goToNext(index, time) {
    var eta_ms = time - Date.now();
    setTimeout(()=> {
      this.slides.slideNext();
      console.log('Fired!');
    }, eta_ms);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is ', currentIndex);
    this.goToNext(currentIndex + 1, this.images(currentIndex+1).DATETIME);
  }

  download() {
    // var fileTransfer = new Transfer();
  }

}
