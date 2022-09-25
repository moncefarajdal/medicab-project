import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {MutuelleVo} from "../../../../controller/model/Mutuelle.model";
import {DatePipe} from "@angular/common";
import {MutuelleService} from "../../../../controller/service/Mutuelle.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mutuelle-create',
  templateUrl: './mutuelle-create.component.html',
  styleUrls: ['./mutuelle-create.component.scss']
})
export class MutuelleCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();
    _validMutuelleLibelle = true;
    _validMutuelleCode = true;

    constructor(private datePipe: DatePipe, private mutuelleService: MutuelleService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router) {
    }

    ngOnInit(): void {
    }

    private setValidation(value: boolean) {
        this.validMutuelleLibelle = value;
        this.validMutuelleCode = value;
    }

    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.mutuelleService.save().subscribe(mutuelle => {
            this.mutuelles.push({...mutuelle});
            this.createMutuelleDialog = false;
            this.submitted = false;
            this.selectedMutuelle = new MutuelleVo();
        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateMutuelleLibelle();
        this.validateMutuelleCode();
    }

    private validateMutuelleLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedMutuelle.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validMutuelleLibelle = false;
        } else {
            this.validMutuelleLibelle = true;
        }
    }

    private validateMutuelleCode() {
        if (this.stringUtilService.isEmpty(this.selectedMutuelle.code)) {
            this.errorMessages.push('Code non valide');
            this.validMutuelleCode = false;
        } else {
            this.validMutuelleCode = true;
        }
    }


    hideCreateDialog() {
        this.createMutuelleDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get mutuelles(): Array<MutuelleVo> {
        return this.mutuelleService.mutuelles;
    }

    set mutuelles(value: Array<MutuelleVo>) {
        this.mutuelleService.mutuelles = value;
    }

    get selectedMutuelle(): MutuelleVo {
        return this.mutuelleService.selectedMutuelle;
    }

    set selectedMutuelle(value: MutuelleVo) {
        this.mutuelleService.selectedMutuelle = value;
    }

    get createMutuelleDialog(): boolean {
        return this.mutuelleService.createMutuelleDialog;

    }

    set createMutuelleDialog(value: boolean) {
        this.mutuelleService.createMutuelleDialog = value;
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

    get validMutuelleLibelle(): boolean {
        return this._validMutuelleLibelle;
    }

    set validMutuelleLibelle(value: boolean) {
        this._validMutuelleLibelle = value;
    }

    get validMutuelleCode(): boolean {
        return this._validMutuelleCode;
    }

    set validMutuelleCode(value: boolean) {
        this._validMutuelleCode = value;
    }

}
