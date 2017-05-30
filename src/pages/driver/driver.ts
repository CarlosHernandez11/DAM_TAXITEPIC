import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

/**
 * Generated class for the Driver page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html',
})
export class DriverPage {
   viajes: any;
   driver_id: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public alertCtrl:AlertController,
              public toast: ToastController
              ) {
  this.http.get('http://taxi.camarena.tk/api/test/travel').map(res=>res.json()).subscribe(data=>{
    
    this.viajes = data.msg;
    this.driver_id = this.navParams.data;
});
  
  }

  getTravel(viaje:any){
    this.alertCtrl.create({
    title:'¿Deseas tomar este viaje?',
    subTitle:'Recuerda ofrecer un excelente servicio',
    buttons:[
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text:'Entendido',
        handler: () => {
          //aqui se hizo todo el desmadre
          let data = {
      driver_id:this.driver_id      
    };
    let headers = {'Content-Type': 'application/json'};
    this.http.put('http://taxi.camarena.tk/api/test/travel/'+viaje.id,data,headers)
    .map(res => res.json())
      .subscribe(response => {
        console.log(response);
        if(response.code==200){
          this.toast.create({
            message:'El viaje fue asignado exitosamente',
            duration: 4000,
            position:'top'
          }).present();
        }
    });
        }
      }
    ]
   }).present();
  }
}
