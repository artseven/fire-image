import { Http } from '@angular/http';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';

declare var cordova:any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides:Slides
  fetchedImages: any;
  images: any;
 
  imageURI: any;
  imageFileName: any;
  storageDirectory = cordova.file.directory;

  constructor(
    public navCtrl: NavController,
    public http: Http,
    private transfer: FileTransfer,
    private alertCtrl: AlertController
    
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
    }, 5000);
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

  fileUrl = "http://movieaddigital.com/output/pi1729-5e241218fd38a5bb3ccb8cac18f8bade-3_1920x1080.jpg"



  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    let nextIndex = currentIndex + 1;
    console.log('Current index is ', currentIndex);

    // this.goToNext(nextIndex, this.images[nextIndex].DATETIME);
  }

  downloadImage(image) {
    let fileTransfer: FileTransferObject = this.transfer.create();

    const imageLocation = `${cordova.file.applicationDirectory}www/assets/img/${image}`;

    fileTransfer.download(imageLocation, this.storageDirectory + image).then((entry)=> {

      const alertSuccess = this.alertCtrl.create({
        title: `Download succeeded`,
      })
    })
  }

}
