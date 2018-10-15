import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';

declare var firebase;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
 
 
name: string;
items=[];
v;item;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController ) {
   
    
  }

  ionViewDidLoad() {
    this.retrieveData();
  
  }
  onAdd(){
    var database = firebase.database();
    database.ref('/shopList/').push({name : this.name});
    this.retrieveData();
  }
  onUpdate(key){
    this.v = this.name;
    const alert = this.alertCtrl.create({
      title: 'Update Item name',
      message: 'Please enter item'+ this.v,
      /*subTitle: 'Please enter item',*/
      inputs: [
        {
          name: 'input',
          placeholder:'Enter Item name'
        }
      ],
      buttons: [{
        
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
      },
      {
        text: 'Update',
        handler: name => {
          var database = firebase.database();
          database.ref('/shopList/' +key ).set({name:name.input});
          this.retrieveData();
        }
      }
    ]
    });
    alert.present();
    

    // this.items=[];
    // var database = firebase.database();
    // database.ref('/shopList/' + key).set({name: this.name});
    // this.retrieveData();
    // this.navCtrl.push("UpdatePage");

  }
  onDelete(key){
    var database = firebase.database();
    database.ref('/shopList/' + key).remove();
    this.retrieveData();

  }

  retrieveData(){
    this.items = [];
    firebase.database().ref('/shopList/').on("value", (snapshot) => {
        snapshot.forEach((snap => {

          this.items.push({ key : snap.key, name : snap.val().name});
          return false;
        }));
    });
  }

}
