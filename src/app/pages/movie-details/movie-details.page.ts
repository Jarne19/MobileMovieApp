import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MovieService } from 'src/app/services/movie.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movies: any[] = [];
  favorite: any[] = [];
  movie: any = null;
  imageBaseUrl = 'https://image.tmdb.org/t/p';
  currentPage = 1;
  constructor(private route: ActivatedRoute, private movieService: MovieService,public favoriteService: FavoriteService,private alertController: AlertController) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.movieService.getMovieDetails(id).subscribe((res)=>{
      console.log(res);
      this.movie = res
    })
    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res)=>{
      this.movies.push(...res.results);
    });
    
    this.favoriteService.getFavoriteList().subscribe((res)=>{
      this.favorite.push(...res)
      console.log(res)
    })
  }
  async toggleFavoStatus(id: string): Promise<void>{
    const favoriteMovie = this.route.snapshot.paramMap.get('id') as string
    const movie = this.movies.find(m=>m.id == id);
    movie.favorite = !movie.favorite;
    if(movie.favorite){
      this.favoriteService.addToFavoriteList(movie);
      const alert = await this.alertController.create({
      header: 'Added successfully',
      message: 'Movie has been added to the favoriteList!',
      buttons: ['OK'],
    });
    await alert.present();
      return
    }
    this.favoriteService.deleteFavorite(favoriteMovie)
    console.log(favoriteMovie)
    
  }
}
