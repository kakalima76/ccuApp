import { Component, OnInit, Input} from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemService } from '../services/item.service';
import { SpinnerService } from '../services/spinner.service'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.css']
  })

  export class ApresentacaoComponent implements OnInit {

    
    constructor(private _itemService: ItemService, private _spennerService: SpinnerService) { 
      
      this.subscription = this._itemService.getItem().subscribe(x => {
        if (x) {
          this.dados = x;
          this.dataSource = this.dados;
            this.loading = true;
            console.log(this.loading);
        } else {
          // clear messages when empty message received
          this.dados = [];
            this.loading = true;
            console.log(this.loading);
        }
      });   
    }

  subscription: Subscription
  subscription_spinner: Subscription;
  dados: Item[] = [];
  imagePath: string = 'assets/golfinho.png'
  loading: boolean;
  displayedColumns: string[] = ['id', 'lacre', 'processo'];
  dataSource = this.dados;
   
    
  ngOnInit() {
    this.dados = []
  }

}
