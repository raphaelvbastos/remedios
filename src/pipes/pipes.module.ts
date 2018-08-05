import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro/filtro';
import { FiltroRemediosPipe } from './filtro-remedios/filtro-remedios';
import { FiltroPeriodosPipe } from './filtro-periodos/filtro-periodos';
@NgModule({
	declarations: [FiltroPipe,
    FiltroRemediosPipe,
    FiltroPeriodosPipe],
	imports: [],
	exports: [FiltroPipe,
    FiltroRemediosPipe,
    FiltroPeriodosPipe]
})
export class PipesModule {}
