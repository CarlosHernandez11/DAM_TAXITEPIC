import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  

  constructor(public navCtrl: NavController, 
              public http: Http,
              public alertCtrl:AlertController,
              public toast: ToastController) {
    
  }
 
 crearViaje(user_id,latitud,longitud){
  let data = {
      user_id: user_id,
      latitud: latitud,
      longitud:longitud

    };
    let headers = {'Content-Type': 'application/json'};
    console.log(data);
    this.http.post('http://taxi.camarena.tk/api/test/travel',data,headers)
    .map(res => res.json())
      .subscribe(response => {
        console.log(response);

        if(response.code==200){
         this.alertCtrl.create({
           title:'Viaje registrado!',
           subTitle:'En seguida se atenderá a su petición',
           buttons:['Entendido!']
         }).present();
        }
    });
}//crearViaje

deleteViaje(travel_id){
   let alert = this.alertCtrl.create({
    title: 'Cancelar Viaje',
    message: '¿Realmente deseas cancelar el viaje?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Buy',
        handler: () => {
          let headers = {'Content-Type': 'application/json'};
          // console.log(data);
          this.http.delete('http://taxi.camarena.tk/api/test/travel/'+travel_id,headers)
          .map(res => res.json())
          .subscribe(response => {
            console.log(response);
          if(response.code==200){
          
          }
        });
        }
      }
    ]
  });
  alert.present();
}//deleteViaje

showViaje(travel_id){
    let headers = {'Content-Type': 'application/json'};
   // console.log(data);
    this.http.get('http://taxi.camarena.tk/api/test/travel/'+travel_id,headers)
    .map(res => res.json())
      .subscribe(response => {
        console.log(response);

        if(response.code==200){
          
        }
    });
}//showViaje


}
