import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {ChargeService} from "../../../../controller/service/Charge.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ChargeVo} from "../../../../controller/model/Charge.model";
import {environment} from "../../../../../environments/environment";
import {TypeChargeVo} from "../../../../controller/model/TypeCharge.model";
import {TypeChargeService} from "../../../../controller/service/TypeCharge.service";
import {TypeConsultationVo} from "../../../../controller/model/TypeConsultation.model";

@Component({
    selector: 'app-charge-create',
    templateUrl: './charge-create.component.html',
    styleUrls: ['./charge-create.component.scss']
})
export class ChargeCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();
    _validChargeReference = true;
    _validChargeLibelle = true;

    constructor(private datePipe: DatePipe, private chargeService: ChargeService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router,
                private typeChargeService: TypeChargeService) {
    }

    // methods

    ngOnInit(): void {
        this.selectedTypeCharge = new TypeChargeVo();
        this.typeChargeService.findAll().subscribe((data) => this.typeCharges = data);
    }

    private setValidation(value: boolean) {
        // this.validChargeReference = value;
        this.validChargeLibelle = value;
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
        this.chargeService.save().subscribe(charge => {
            this.charges.push({...charge});
            this.createChargeDialog = false;
            this.submitted = false;
            this.selectedCharge = new ChargeVo();
        }, error => {
            console.log(error);
        });
    }

    public async openCreatetypeCharge(typeCharge: string) {
        const isPermistted = await this.roleService.isPermitted('TypeCharge', 'add');
        if (isPermistted) {
            this.selectedTypeCharge = new TypeChargeVo();
            this.createTypeChargeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    // validation methods

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        // this.validateChargeReference();
        this.validateChargeLibelle();
    }

    private validateChargeReference() {
        if (this.stringUtilService.isEmpty(this.selectedCharge.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validChargeReference = false;
        } else {
            this.validChargeReference = true;
        }
    }

    private validateChargeLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedCharge.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validChargeLibelle = false;
        } else {
            this.validChargeLibelle = true;
        }
    }

    hideCreateDialog() {
        this.createChargeDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get charges(): Array<ChargeVo> {
        return this.chargeService.charges;
    }

    set charges(value: Array<ChargeVo>) {
        this.chargeService.charges = value;
    }

    get selectedCharge(): ChargeVo {
        return this.chargeService.selectedCharge;
    }

    set selectedCharge(value: ChargeVo) {
        this.chargeService.selectedCharge = value;
    }

    get createChargeDialog(): boolean {
        return this.chargeService.createChargeDialog;
    }

    set createChargeDialog(value: boolean) {
        this.chargeService.createChargeDialog = value;
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

    get validChargeReference(): boolean {
        return this._validChargeReference;
    }

    set validChargeReference(value: boolean) {
        this._validChargeReference = value;
    }

    get validChargeLibelle(): boolean {
        return this._validChargeLibelle;
    }

    set validChargeLibelle(value: boolean) {
        this._validChargeLibelle = value;
    }

    get typeCharges(): Array<TypeChargeVo> {
        return this.typeChargeService.typeCharges;
    }

    set typeCharges(value: Array<TypeChargeVo>) {
        this.typeChargeService.typeCharges = value;
    }

    get createTypeChargeDialog(): boolean {
        return this.typeChargeService.createTypeChargeDialog;
    }

    set createTypeChargeDialog(value: boolean) {
        this.typeChargeService.createTypeChargeDialog = value;
    }

    get selectedTypeCharge(): TypeChargeVo {
        return this.typeChargeService.selectedTypeCharge;
    }

    set selectedTypeCharge(value: TypeChargeVo) {
        this.typeChargeService.selectedTypeCharge = value;
    }

}
