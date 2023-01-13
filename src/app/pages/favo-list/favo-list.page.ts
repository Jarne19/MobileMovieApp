import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favo-list',
  templateUrl: './favo-list.page.html',
  styleUrls: ['./favo-list.page.scss'],
})
export class FavoListPage implements OnInit {
  lijst: any[];
  imageBaseUrl = 'https://image.tmdb.org/t/p';
  constructor(public favoriteService: FavoriteService) {
   }
  ngOnInit() {
    this.loadFacorites();
  }
  loadFacorites(){
    this.favoriteService.getFavoriteList().forEach(x=>
      this.lijst = x
    );
    
    this.favoriteService.getFavoriteList().subscribe((res)=>{
      console.log(res) 
    });
  }
  DeleteFavorite(id: string){
    this.favoriteService.deleteFavorite(id);
  }
  handleRefresh(event) {
    this.loadFacorites();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  };
}
