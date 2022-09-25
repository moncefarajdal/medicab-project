import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ConstanteVo} from "../../../../controller/model/Constante.model";
import {ConstanteService} from "../../../../controller/service/Constante.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-constante-view',
  templateUrl: './constante-view.component.html',
  styleUrls: ['./constante-view.component.scss']
})
export class ConstanteViewComponent implements OnInit {

    constructor(private datePipe: DatePipe, private constanteService: ConstanteService, private roleService: RoleService,
                private messageService: MessageService, private router: Router) {
    }

    // methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewConstanteDialog = false;
    }

    // Getters and setters

    get constantes(): Array<ConstanteVo> {
        return this.constanteService.constantes;
    }

    set constantes(value: Array<ConstanteVo>) {
        this.constanteService.constantes = value;
    }

    get selectedConstante(): ConstanteVo {
        return this.constanteService.selectedConstante;
    }

    set selectedConstante(value: ConstanteVo) {
        this.constanteService.selectedConstante = value;
    }

    get viewConstanteDialog(): boolean {
        return this.constanteService.viewConstanteDialog;

    }

    set viewConstanteDialog(value: boolean) {
        this.constanteService.viewConstanteDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

}
