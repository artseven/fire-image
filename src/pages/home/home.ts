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

  
  now = new Date().getTime();
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
      // this.images.forEach(element => {
      //   console.log(this.images.indexOf(element));
      //   this.goToNext(element.index, element.DATETIME);
      // });
      // console.log('Objects', this.images);
      // var nextTime = this.images[1].DATETIME;
      // var eta_ms = nextTime - Date.now();
      // setTimeout(()=>{
      //   this.goToSlide(1)
      // }, eta_ms);
      // console.log('ETA', eta_ms);
    });
  }, 10000);

  isTime: boolean = false;
  if ()
  goToNext(index, time) {
    var eta_ms = time - Date.now();
    setTimeout(()=> {
      this.slides.slideNext();
      console.log('Fired!');
    }, eta_ms);
  }



  download() {
    // var fileTransfer = new Transfer();
  }

}
