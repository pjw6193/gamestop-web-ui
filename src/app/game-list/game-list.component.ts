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

  // code this function for the demo
  purchase(game: any): void {
    this.service.purchase(game).subscribe(data => {
      console.log(data);
      this.updateQuantity(game);
      alert('Your game is being shipped!');
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
      this.groupGamesByThree(data);
    });
  }

  updateQuantity(game: Game): void {
    this.games.forEach(element => {
      element.items.forEach(g => {
        if (game === g) {
          game.quantity = game.quantity - 1;
          g = game;
        }
      });
    });
  }

  groupGamesByThree(data: Array<any>): void {
    for (let i = 0; i < data.length; i += 3) {
      this.games.push({ items: data.slice(i, i + 3) });
    }
  }
}
