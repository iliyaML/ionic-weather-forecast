import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  location: {
    city: string,
    state: string,
    temperature: string
  }
  city: string;
  state: string;
  temperature: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {
      this.storage.get('location').then(val => {
        this.location = (val != null) ? JSON.parse(val) : { city: 'Nashville', state: 'TN', temperature: 'c' };
        this.city = this.location.city;
        this.state = this.location.state;
        this.temperature = this.location.temperature;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  saveForm(){
    let location = {
      city: this.city,
      state: this.state,
      temperature: this.temperature
    };

    this.storage.set('location', JSON.stringify(location));

    // Navigate to HomePage
    this.navCtrl.push(HomePage);
  }

}
