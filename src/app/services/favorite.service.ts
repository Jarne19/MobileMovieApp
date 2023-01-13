import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Observable } from 'rxjs';
export interface FavoMovie{
  favoriteMovie: object;
}
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  readonly #baseURL = 'https://movieapi-production-9ae0.up.railway.app/favorites/'
  constructor(private http: HttpClient) { }
  
  getFavoriteList(): Observable<FavoMovie[]>{
    return this.http.get<FavoMovie[]>(`${this.#baseURL}`);
  }

  addToFavoriteList(movie: FavoMovie){
    this.http.post<FavoMovie>(`${this.#baseURL}create`, {favoriteMovie: movie}).subscribe((res)=>{
      console.log(res)
    });
    console.log(`${this.#baseURL}create`,movie)
  }

  deleteFavorite(id: string): void{
    this.http.delete(`${this.#baseURL}delete/${id}`).subscribe((res)=>{
      console.log('ok')
    })
    console.log(`${this.#baseURL}`, id)
  }

}
