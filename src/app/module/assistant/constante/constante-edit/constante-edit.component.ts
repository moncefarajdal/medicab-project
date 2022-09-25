import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ConstanteVo} from "../../../../controller/model/Constante.model";
import {DateUtils} from "../../../../utils/DateUtils";
import {DatePipe} from "@angular/common";
import {ConstanteService} from "../../../../controller/service/Constante.service";
import {MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-constante-edit',
  templateUrl: './constante-edit.component.html',
  styleUrls: ['./constante-edit.component.scss']
})

export class ConstanteEditComponent implements OnInit {

    _submitted = false;

    constructor(private datePipe: DatePipe, private constanteService: ConstanteService, private roleService: RoleService,
                private messageService: MessageService, private router: Router) {
    }

    ngOnInit(): void {
    }

    public edit() {
        this.submitted = true;
        this.editWithShowOption(false);
    }

    public editWithShowOption(showList: boolean) {
        this.selectedConstante.dateArchivage = DateUtils.toDate(this.selectedConstante.dateArchivage);
        this.selectedConstante.dateCreation = DateUtils.toDate(this.selectedConstante.dateCreation);
        this.constanteService.edit().subscribe(constante => {
            const myIndex = this.constantes.findIndex(e => e.id === this.selectedConstante.id);
            this.constantes[myIndex] = this.selectedConstante;
            this.submitted = false;
            this.editConstanteDialog = false;
            this.selectedConstante = new ConstanteVo();
        }, error => {
            console.log(error);
        });
    }

    // methods

    hideEditDialog() {
        this.editConstanteDialog = false;
    }

    // getters and setters

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

    get editConstanteDialog(): boolean {
        return this.constanteService.editConstanteDialog;
    }

    set editConstanteDialog(value: boolean) {
        this.constanteService.editConstanteDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

}
