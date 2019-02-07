import { Game } from './models/Game';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  API = 'http://localhost:9595/games';

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(this.API + '/all');
  }

}
