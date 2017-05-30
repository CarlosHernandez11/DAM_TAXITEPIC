import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DriverPage } from '../driver/driver';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
              public alertCtrl:AlertController, 
              public http: Http) {

  }

  loginTaxista() {
  let alert = this.alertCtrl.create({
    title: 'Iniciar sesión',
    inputs: [
      {
        name: 'permission_number',
        placeholder: 'Numero de permiso'
      },
      {
        name: 'password',
        placeholder: 'Contraseña',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Aceptar',
        role: 'aceptar',
        handler: data => {
          this.authTaxi(data.permission_number,data.password);    
        }
      },
      {
        text: 'Cancelar',
        role: 'cancelar',
        handler: data => {
          
        }
      }
    ]
  });
  alert.present();
}

loginUsuario() {
  let alert = this.alertCtrl.create({
    title: 'Iniciar sesión',
    inputs: [
      {
        name: 'email',
        placeholder: 'Correo Electronico'
      },
      {
        name: 'password',
        placeholder: 'Contraseña',
        type: 'password'
      }
    ],
    buttons: [
      {
        text: 'Aceptar',
        role: 'aceptar',
        handler: data => {
          this.authUser(data.email,data.password);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancelar',
        handler: data => {
          
        }
      }
    ]
  });
  alert.present();
}

authTaxi(user, password){
    let data = {
      permission_number: user,
      password: password,
    };
    let headers = {'Content-Type': 'application/json'};
    console.log(data);
    this.http.post('http://taxi.camarena.tk/api/test/driver/login',data,headers)
    .map(res => res.json())
      .subscribe(response => {
        console.log(response);
        if(response.code==200){
          this.alertCtrl.create({
             title: 'Inicio sesión',
             subTitle: 'Te haz logueado correctamente',
             buttons: ['Entendido']
          }).present();
          let driver_id = response.msg;
          this.navCtrl.push(DriverPage, driver_id);
        }else{
          this.alertCtrl.create({
             title: 'Oooopss!',
             subTitle: 'Los datos introducidos son incorrectos :(',
             buttons: ['Entendido']
          }).present();
        }
    });
  }
  authUser(user, password){
    let data = {
      email: user,
      password: password,
    };
    let headers = {'Content-Type': 'application/json'};
    console.log(data);
    this.http.post('http://taxi.camarena.tk/api/test/user/login',data,headers)
    .map(res => res.json())
      .subscribe(response => {
        console.log(response);
        if(response.code==200){
          this.alertCtrl.create({
             title: 'Inicio sesión',
             subTitle: 'Te haz logueado correctamente',
             buttons: ['Entendido']
          }).present();
          this.navCtrl.push(HomePage);
        }else{
          this.alertCtrl.create({
             title: 'Oooopss!',
             subTitle: 'Los datos introducidos son incorrectos :(',
             buttons: ['Entendido']
          }).present();
        }
    });
  }


}
