import { Component, OnInit } from '@angular/core';
import {TypeChargeService} from "../../../../controller/service/TypeCharge.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {TypeChargeVo} from "../../../../controller/model/TypeCharge.model";

@Component({
  selector: 'app-type-charge-create',
  templateUrl: './type-charge-create.component.html',
  styleUrls: ['./type-charge-create.component.scss']
})
export class TypeChargeCreateComponent implements OnInit {

    private _submitted = false;
    private _errorMessages = new Array<string>();
    private _validTypeChargeLibelle = true;
    private _validTypeChargeCode = true;

    constructor(private typeChargeService: TypeChargeService, private stringUtilService: StringUtilService,
                private roleService: RoleService, private messageService: MessageService, private router: Router) {
    }

    ngOnInit(): void {
    }

    private setValidation(value: boolean) {
        this.validTypeChargeLibelle = value;
        this.validTypeChargeCode = value;
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
        this.typeChargeService.save().subscribe(typeCharge => {
            this.typeCharges.push({...typeCharge});
            this.createTypeChargeDialog = false;
            this.submitted = false;
            this.selectedTypeCharge = new TypeChargeVo();
        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateTypeChargeLibelle();
        // this.validateTypeConsultationCode();
    }

    private validateTypeChargeLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedTypeCharge.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeChargeLibelle = false;
        } else {
            this.validTypeChargeLibelle = true;
        }
    }

    private validateTypeConsultationCode() {
        if (this.stringUtilService.isEmpty(this.selectedTypeCharge.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeChargeCode = false;
        } else {
            this.validTypeChargeCode = true;
        }
    }

    hideCreateDialog() {
        this.createTypeChargeDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get typeCharges(): Array<TypeChargeVo> {
        return this.typeChargeService.typeCharges;
    }

    set typeCharges(value: Array<TypeChargeVo>) {
        this.typeChargeService.typeCharges = value;
    }

    get selectedTypeCharge(): TypeChargeVo {
        return this.typeChargeService.selectedTypeCharge;
    }

    set selectedTypeCharge(value: TypeChargeVo) {
        this.typeChargeService.selectedTypeCharge = value;
    }

    get createTypeChargeDialog(): boolean {
        return this.typeChargeService.createTypeChargeDialog;
    }

    set createTypeChargeDialog(value: boolean) {
        this.typeChargeService.createTypeChargeDialog = value;
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

    get validTypeChargeLibelle(): boolean {
        return this._validTypeChargeLibelle;
    }

    set validTypeChargeLibelle(value: boolean) {
        this._validTypeChargeLibelle = value;
    }

    get validTypeChargeCode(): boolean {
        return this._validTypeChargeCode;
    }

    set validTypeChargeCode(value: boolean) {
        this._validTypeChargeCode = value;
    }

}
