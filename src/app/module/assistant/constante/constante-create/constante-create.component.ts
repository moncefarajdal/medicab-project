import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ConstanteVo} from "../../../../controller/model/Constante.model";
import {DatePipe} from "@angular/common";
import {ConstanteService} from "../../../../controller/service/Constante.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
    selector: 'app-constante-create',
    templateUrl: './constante-create.component.html',
    styleUrls: ['./constante-create.component.scss']
})
export class ConstanteCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validConstanteReference = true;
    _validConstanteLibelle = true;


    constructor(private datePipe: DatePipe, private constanteService: ConstanteService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router) {

    }


    // methods

    ngOnInit(): void {

    }

    private setValidation(value: boolean) {
        // this.validConstanteReference = value;
        this.validConstanteLibelle = value;
    }


    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs sur le formulaire'
            });
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.constanteService.save().subscribe(constante => {
            this.constantes.push({...constante});
            this.createConstanteDialog = false;
            this.submitted = false;
            this.selectedConstante = new ConstanteVo();


        }, error => {
            console.log(error);
        });

    }

    // validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        // this.validateConstanteReference();
        this.validateConstanteLibelle();

    }

    private validateConstanteReference() {
        if (this.stringUtilService.isEmpty(this.selectedConstante.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validConstanteReference = false;
        } else {
            this.validConstanteReference = true;
        }
    }

    private validateConstanteLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedConstante.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validConstanteLibelle = false;
        } else {
            this.validConstanteLibelle = true;
        }
    }

    hideCreateDialog() {
        this.createConstanteDialog = false;
        this.setValidation(true);
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

    get createConstanteDialog(): boolean {
        return this.constanteService.createConstanteDialog;

    }

    set createConstanteDialog(value: boolean) {
        this.constanteService.createConstanteDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatCreate;
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


    get errorMessages(): string[] {
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }

    get validConstanteReference(): boolean {
        return this._validConstanteReference;
    }

    set validConstanteReference(value: boolean) {
        this._validConstanteReference = value;
    }

    get validConstanteLibelle(): boolean {
        return this._validConstanteLibelle;
    }

    set validConstanteLibelle(value: boolean) {
        this._validConstanteLibelle = value;
    }

}
