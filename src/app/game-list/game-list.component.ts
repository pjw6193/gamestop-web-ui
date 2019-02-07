import { Game } from './../shared/models/Game';
import { GameService } from './../shared/game.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css', '../../bootstrap-4.2.1-dist/css/bootstrap.min.css']
})
export class GameListComponent implements OnInit {

  games: Array<any>;

  constructor(private service: GameService) { }

  purchase(game: any): void {
    this.service.purchase(game).subscribe(data => {
      console.log(data);
      alert('Your ' + game.title + ' game is on the way!');
    }, error => {
      console.log(error);
      alert('Sorry, ' + game.title + ' is not available for purchase!');
    });
  }

  isAvailableToday(game: any): boolean {
    return (new Date(game.dateAvailable) < new Date());
  }

  isAvailableQuantity(game: any): boolean {
    return (game.quantity > 0);
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.games = new Array();
    this.service.findAll().subscribe(data => {
      for (let i = 0; i < data.length; i += 3) {
        this.games.push({ items: data.slice(i, i + 3) });
      }
      console.log(this.games);
    });
  }

}
