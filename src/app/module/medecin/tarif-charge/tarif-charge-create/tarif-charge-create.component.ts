import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {TarifChargeService} from "../../../../controller/service/TarifCharge.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {DepenseService} from "../../../../controller/service/Depense.service";
import {ChargeService} from "../../../../controller/service/Charge.service";
import {ChargeVo} from "../../../../controller/model/Charge.model";
import {DepenseVo} from "../../../../controller/model/Depense.model";
import {TarifChargeVo} from "../../../../controller/model/TarifCharge.model";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-tarif-charge-create',
    templateUrl: './tarif-charge-create.component.html',
    styleUrls: ['./tarif-charge-create.component.scss']
})
export class TarifChargeCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();
    _validChargeReference = true;
    _validChargeLibelle = true;
    _validDepenseReference = true;
    _validDepenseTarifCharges = true;

    constructor(private datePipe: DatePipe, private tarifChargeService: TarifChargeService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router,
                private depenseService: DepenseService, private chargeService: ChargeService) {
    }

    ngOnInit(): void {
        this.selectedCharge = new ChargeVo();
        this.chargeService.findAll().subscribe((data) => this.charges = data);
        this.selectedDepense = new DepenseVo();
        this.depenseService.findAll().subscribe((data) => this.depenses = data);
    }

    private setValidation(value: boolean) {
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
        this.tarifChargeService.save().subscribe(tarifCharge => {
            this.tarifCharges.push({...tarifCharge});
            this.createTarifChargeDialog = false;
            this.submitted = false;
            this.selectedTarifCharge = new TarifChargeVo();
        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
    }

    public async openCreatecharge(charge: string) {
        const isPermistted = await this.roleService.isPermitted('Charge', 'add');
        if (isPermistted) {
            this.selectedCharge = new ChargeVo();
            this.createChargeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatedepense(depense: string) {
        const isPermistted = await this.roleService.isPermitted('Depense', 'add');
        if (isPermistted) {
            this.selectedDepense = new DepenseVo();
            this.createDepenseDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    hideCreateDialog() {
        this.createTarifChargeDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get tarifCharges(): Array<TarifChargeVo> {
        return this.tarifChargeService.tarifCharges;
    }

    set tarifCharges(value: Array<TarifChargeVo>) {
        this.tarifChargeService.tarifCharges = value;
    }

    get selectedTarifCharge(): TarifChargeVo {
        return this.tarifChargeService.selectedTarifCharge;
    }

    set selectedTarifCharge(value: TarifChargeVo) {
        this.tarifChargeService.selectedTarifCharge = value;
    }

    get createTarifChargeDialog(): boolean {
        return this.tarifChargeService.createTarifChargeDialog;
    }

    set createTarifChargeDialog(value: boolean) {
        this.tarifChargeService.createTarifChargeDialog = value;
    }

    get selectedCharge(): ChargeVo {
        return this.chargeService.selectedCharge;
    }

    set selectedCharge(value: ChargeVo) {
        this.chargeService.selectedCharge = value;
    }

    get charges(): Array<ChargeVo> {
        return this.chargeService.charges;
    }

    set charges(value: Array<ChargeVo>) {
        this.chargeService.charges = value;
    }

    get createChargeDialog(): boolean {
        return this.chargeService.createChargeDialog;
    }

    set createChargeDialog(value: boolean) {
        this.chargeService.createChargeDialog = value;
    }

    get selectedDepense(): DepenseVo {
        return this.depenseService.selectedDepense;
    }

    set selectedDepense(value: DepenseVo) {
        this.depenseService.selectedDepense = value;
    }

    get depenses(): Array<DepenseVo> {
        return this.depenseService.depenses;
    }

    set depenses(value: Array<DepenseVo>) {
        this.depenseService.depenses = value;
    }

    get createDepenseDialog(): boolean {
        return this.depenseService.createDepenseDialog;
    }

    set createDepenseDialog(value: boolean) {
        this.depenseService.createDepenseDialog = value;
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

    get validDepenseReference(): boolean {
        return this._validDepenseReference;
    }

    set validDepenseReference(value: boolean) {
        this._validDepenseReference = value;
    }

    get validDepenseTarifCharges(): boolean {
        return this._validDepenseTarifCharges;
    }

    set validDepenseTarifCharges(value: boolean) {
        this._validDepenseTarifCharges = value;
    }

}
