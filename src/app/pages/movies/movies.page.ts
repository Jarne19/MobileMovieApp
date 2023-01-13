import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MovieService } from 'src/app/services/movie.service';
import { LocalNotifications } from '@capacitor/local-notifications'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  imageBaseUrl = 'https://image.tmdb.org/t/p';
  constructor(private movieService: MovieService,private loadingCtrl: LoadingController,public authService: AuthServiceService,public favoriteService: FavoriteService) { }
  verticalFabPosition = 'bottom';
  async ngOnInit() {
    this.loadMovies();
    await LocalNotifications.requestPermissions();
    LocalNotifications.registerActionTypes({
      types: [{id: 'id',actions: [{id: '1',title: 'Login op de app om volledig gebruik te maken van de app.'}]}]
    });
  }
  
  async notificatie(){
    await LocalNotifications.schedule({notifications: [{
          title: 'Melding',
          body: 'Login op de app om volledig gebruik te maken van de app.',
          id: 1,
          //Test schedule: {at: new Date(Date.now() + 1000 * 5)}
          schedule: {every: 'hour', count: 1}
        }]});
  }








  async loadMovies(event?:InfiniteScrollCustomEvent){

    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'lines',
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res)=>{
      loading.dismiss();
      this.movies.push(...res.results);
      console.log(this.movies)
      console.log(res);
      event?.target.complete();
      if(event) {
        event.target.disabled = res.total_pages === this.currentPage;
      }
    });
  }
  loadMore(event: InfiniteScrollCustomEvent){
    this.currentPage++;
    this.loadMovies(event);
  }
  onClick(event){
    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    systemDark.addListener(this.colorTest);
    if(event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
    }
    else{
      document.body.setAttribute('data-theme', 'light');
    }
  }

   colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');		
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }

}
