import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { GenderComponent } from './gender/gender.component';
import { GenderCreateComponent } from './gender/gender-create/gender-create.component';


@NgModule({
    declarations: [
        GenderComponent,
        GenderCreateComponent
    ],
    exports: [
        GenderCreateComponent,
        GenderComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }
