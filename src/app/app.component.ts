import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {Observable} from "rxjs";
import {RoleService} from "./controller/service/role.service";
import {CalendarOptions} from "@fullcalendar/angular";
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    menuMode = 'static';
    private role$: Observable<string>;

    constructor(private primengConfig: PrimeNGConfig, private roleService: RoleService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        document.documentElement.style.fontSize = '14px';
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
        });
    }
}
