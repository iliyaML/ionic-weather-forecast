import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather: any;
  location: {
    city: string,
    state: string,
    temperature: string
  }

  constructor(
    public navCtrl: NavController,
    private weatherProvider: WeatherProvider,
    private storage: Storage
  ) {

  }

  ionViewWillEnter(){
    this.storage.get('location').then(val => {
      this.location = (val != null) ? JSON.parse(val) : { city: 'Nashville', state: 'TN', temperature: 'c' };

      this.weatherProvider.getWeather(this.location.city, this.location.state)
      .subscribe(weather => {
        console.log(weather);
        this.weather = weather.current_observation;
      });
    });
  }

}
