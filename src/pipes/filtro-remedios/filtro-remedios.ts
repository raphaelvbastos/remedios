import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FiltroRemediosPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filtroRemedios',
})
export class FiltroRemediosPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], terms: any) {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {
      return it.nome.toLowerCase().includes(terms);
    });
  }
}
