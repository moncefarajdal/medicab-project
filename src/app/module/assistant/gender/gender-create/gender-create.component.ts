import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {SexeVo} from "../../../../controller/model/Sexe.model";
import {DatePipe} from "@angular/common";
import {SexeService} from "../../../../controller/service/Sexe.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
    selector: 'app-gender-create',
    templateUrl: './gender-create.component.html',
    styleUrls: ['./gender-create.component.scss']
})
export class GenderCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();
    _validSexeLibelle = true;
    _validSexeCode = true;

    constructor(private datePipe: DatePipe, private sexeService: SexeService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router) {
    }


    ngOnInit(): void {
    }

    private setValidation(value: boolean) {
        this.validSexeLibelle = value;
        this.validSexeCode = value;
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
        this.sexeService.save().subscribe(sexe => {
            this.sexes.push({...sexe});
            this.createSexeDialog = false;
            this.submitted = false;
            this.selectedSexe = new SexeVo();

        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateSexeLibelle();
        this.validateSexeCode();
    }

    private validateSexeLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedSexe.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validSexeLibelle = false;
        } else {
            this.validSexeLibelle = true;
        }
    }

    private validateSexeCode() {
        if (this.stringUtilService.isEmpty(this.selectedSexe.code)) {
            this.errorMessages.push('Code non valide');
            this.validSexeCode = false;
        } else {
            this.validSexeCode = true;
        }
    }

    hideCreateDialog() {
        this.createSexeDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get sexes(): Array<SexeVo> {
        return this.sexeService.sexes;
    }

    set sexes(value: Array<SexeVo>) {
        this.sexeService.sexes = value;
    }

    get selectedSexe(): SexeVo {
        return this.sexeService.selectedSexe;
    }

    set selectedSexe(value: SexeVo) {
        this.sexeService.selectedSexe = value;
    }

    get createSexeDialog(): boolean {
        return this.sexeService.createSexeDialog;
    }

    set createSexeDialog(value: boolean) {
        this.sexeService.createSexeDialog = value;
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

    get validSexeLibelle(): boolean {
        return this._validSexeLibelle;
    }

    set validSexeLibelle(value: boolean) {
        this._validSexeLibelle = value;
    }

    get validSexeCode(): boolean {
        return this._validSexeCode;
    }

    set validSexeCode(value: boolean) {
        this._validSexeCode = value;
    }


}
