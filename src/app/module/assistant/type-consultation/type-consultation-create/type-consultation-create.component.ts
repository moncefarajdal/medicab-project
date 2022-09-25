import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {TypeConsultationVo} from "../../../../controller/model/TypeConsultation.model";
import {DatePipe} from "@angular/common";
import {TypeConsultationService} from "../../../../controller/service/TypeConsultation.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
    selector: 'app-type-consultation-create',
    templateUrl: './type-consultation-create.component.html',
    styleUrls: ['./type-consultation-create.component.scss']
})
export class TypeConsultationCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validTypeConsultationLibelle = true;
    _validTypeConsultationCode = true;
    _validTypeConsultationTarif = true;


    constructor(private datePipe: DatePipe, private typeConsultationService: TypeConsultationService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router) {
    }

    ngOnInit(): void {
    }

    private setValidation(value: boolean) {
        this.validTypeConsultationLibelle = value;
        this.validTypeConsultationCode = value;
        this.validTypeConsultationTarif = value;
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
        this.typeConsultationService.save().subscribe(typeConsultation => {
            this.typeConsultations.push({...typeConsultation});
            this.createTypeConsultationDialog = false;
            this.submitted = false;
            this.selectedTypeConsultation = new TypeConsultationVo();

        }, error => {
            console.log(error);
        });

    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateTypeConsultationLibelle();
        this.validateTypeConsultationCode();
        this.validateTypeConsultationTarif();

    }

    private validateTypeConsultationLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedTypeConsultation.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeConsultationLibelle = false;
        } else {
            this.validTypeConsultationLibelle = true;
        }
    }

    private validateTypeConsultationCode() {
        if (this.stringUtilService.isEmpty(this.selectedTypeConsultation.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeConsultationCode = false;
        } else {
            this.validTypeConsultationCode = true;
        }
    }

    private validateTypeConsultationTarif() {
        if (this.stringUtilService.isEmpty(this.selectedTypeConsultation.tarif)) {
            this.errorMessages.push('Tarif non valide');
            this.validTypeConsultationTarif = false;
        } else {
            this.validTypeConsultationTarif = true;
        }
    }

    hideCreateDialog() {
        this.createTypeConsultationDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get typeConsultations(): Array<TypeConsultationVo> {
        return this.typeConsultationService.typeConsultations;
    }

    set typeConsultations(value: Array<TypeConsultationVo>) {
        this.typeConsultationService.typeConsultations = value;
    }

    get selectedTypeConsultation(): TypeConsultationVo {
        return this.typeConsultationService.selectedTypeConsultation;
    }

    set selectedTypeConsultation(value: TypeConsultationVo) {
        this.typeConsultationService.selectedTypeConsultation = value;
    }

    get createTypeConsultationDialog(): boolean {
        return this.typeConsultationService.createTypeConsultationDialog;
    }

    set createTypeConsultationDialog(value: boolean) {
        this.typeConsultationService.createTypeConsultationDialog = value;
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

    get validTypeConsultationLibelle(): boolean {
        return this._validTypeConsultationLibelle;
    }

    set validTypeConsultationLibelle(value: boolean) {
        this._validTypeConsultationLibelle = value;
    }

    get validTypeConsultationCode(): boolean {
        return this._validTypeConsultationCode;
    }

    set validTypeConsultationCode(value: boolean) {
        this._validTypeConsultationCode = value;
    }

    get validTypeConsultationTarif(): boolean {
        return this._validTypeConsultationTarif;
    }

    set validTypeConsultationTarif(value: boolean) {
        this._validTypeConsultationTarif = value;
    }


}
