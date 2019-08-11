import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import {ApiService} from './services/api.service';
import {Item} from 'src/app/models/item';
import { filter } from 'minimatch';
import { ItemService } from './services/item.service';
import { Subscription, interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
 
const minutos = 1
const segundos = 18
const milissegundos = 1000
const time = (minutos*segundos*milissegundos)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy{
  

  constructor(private _api: ApiService, private _itemService: ItemService) {}

 
  dataSource: Item[];
  grupos: {grupo: any, total: any}[] = [];
  subscription: Subscription;
  dados: Item[]

  gerarView(data: Item[]){
    let pos: number = 0;

       data.forEach(x => {
          x.posicao = parseInt(x.posicao.toString());
          
          
          if(this.grupos.findIndex(y => y.grupo == x.grupo) == -1){
            this.grupos.push({grupo: x.grupo, total: 1});
          }else{
            pos = this.grupos.findIndex(y => y.grupo == x.grupo)
            this.grupos[pos].total++; 
          }
        })

        this.grupos.sort(function(a, b){
          var x = a.grupo.toLowerCase();
          var y = b.grupo.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });

        this.grupos.forEach(x => {
          if(x.total < 10){
            x.total = "0" + x.total.toString();
          }
        })
    
        this.dataSource = data;
  }
  
  getParam(value: string): void{
    this._itemService.setItem(this.dataSource.filter(x => {
      return x.grupo == value
    }));

  }
 
  ngOnInit(): void {

      this._api.getItens().subscribe(res => {
          this.gerarView(res)
      })

      interval(time)
      .pipe(
      flatMap(() =>{
        return this._api.getItens();
      })
      ).subscribe(res => {
        this.dados = []
        this.dataSource = []
        this.grupos = []
        this.dados = res
        this.gerarView(this.dados)


      
    }, err => {
      console.log(err);
    })
              
  }

  title = 'app';

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
