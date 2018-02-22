import { NgModule } from '@angular/core';
import { ChoiceBoxComponent } from './choice-box/choice-box';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [ChoiceBoxComponent],
	imports: [
		IonicModule
	],
	exports: [ChoiceBoxComponent]
})
export class ComponentsModule {}
