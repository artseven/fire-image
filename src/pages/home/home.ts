import { Http } from '@angular/http';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { setTimeout } from 'timers';
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
    setInterval(()=> {
      this.http.get('http://solosnet.com/signage/test.cfm')
      .map(res=> res.json())
      .subscribe(data=> {
        this.images = data;
        // this.goToNext(1, this.images[1].DATETIME);
        });
        if (Date.now() - (this.images[1].DATETIME)*1000 < 0) {
          this.slides.slideNext();
        }
    }, 10000);
  }

  goToNext(index, time) {
    var multiplied = time*1000;
    var eta_ms = multiplied - Date.now();
    console.log(eta_ms);
    setTimeout(()=> {
      this.slides.slideNext();
      console.log('Fired!');
    }, eta_ms);
  }





  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    let nextIndex = currentIndex + 1;
    console.log('Current index is ', currentIndex);

    // this.goToNext(nextIndex, this.images[nextIndex].DATETIME);
  }

  download() {
    // var fileTransfer = new Transfer();
  }

}
