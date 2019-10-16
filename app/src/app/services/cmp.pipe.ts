import { Pipe, PipeTransform } from '@angular/core';
import { InplayService } from "./inplay.service";

@Pipe({
  name: 'cmp'
})
export class CmpPipe implements PipeTransform {

  response:any;
  constructor(private inplayService:InplayService){}

  transform(value: any, ...args: any[]): any {
    this.inplayService.getStockStatus(value).subscribe(data => {
      this.response=data.LastTradedPrice;
      console.log(data.LastTradedPrice);
    });
    return this.response.toString();
  }

}
