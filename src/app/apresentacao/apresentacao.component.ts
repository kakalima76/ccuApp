import { Component, OnInit, Input} from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemService } from '../services/item.service';
import { SpinnerService } from '../services/spinner.service'
import { Subscription, Observable, interval } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { takeWhile, flatMap } from 'rxjs/operators';
import { ApiService } from '../services/api.service'


@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.css']
  })

  export class ApresentacaoComponent implements OnInit {

    
    constructor(private _itemService: ItemService, 
                private _spennerService: SpinnerService,
                private domSanitizer: DomSanitizer,
                private _apiService: ApiService) { 

     
      this.subscription = this._itemService.getItem()
      .subscribe(res => {
          this.gerarView(res)
      });    

    }

  subscription: Subscription
  subscription_spinner: Subscription;
  dados: Item[] = [];
  imagePath: string = 'assets/golfinho.png'
  displayedColumns: string[] = ['id', 'lacre', 'processo'];
  dataSource = this.dados;
  noWrapSlides = false
  index: string = "amor"
  

  sanitize(url: string) {
    //return url;
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  gerarView(data: Item[]){
    if (data) {
      this.dados = data;
      this.dataSource = this.dados
       

        this.dados.forEach(dado => {
          dado.imagem = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + dado.path);
        })
        
       
    } else {
      // clear messages when empty message received
      this.dados = [];
    
       
    }
  }
   
    
  ngOnInit() {
    this.dados = []    
  }

}
