import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import { environment } from 'src/environments/environment';

export interface ApiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getTopRatedMovies(page = 1): Observable<ApiResult>{
    return this.http.get<ApiResult>(`https://api.themoviedb.org/3/movie/popular?api_key=c075b16249aa2b0e677d30a804ba62f3&page=${page}`);
  }

  getMovieDetails(id: string){
    return this.http.get(
     `https://api.themoviedb.org/3/movie/${id}?api_key=c075b16249aa2b0e677d30a804ba62f3`);
  }
}
