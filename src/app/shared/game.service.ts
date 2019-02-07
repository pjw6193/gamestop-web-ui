import { Game } from './models/Game';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get('http://localhost:9595/games/all');
  }

  purchase(game: any): Observable<any> {
    return this.http.post('http://localhost:9595/games/purchase', game);
  }

}
