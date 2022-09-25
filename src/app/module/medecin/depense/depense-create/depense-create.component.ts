import {Component, OnInit} from '@angular/core';
import {TarifChargeVo} from "../../../../controller/model/TarifCharge.model";
import {OrdonnanceVo} from "../../../../controller/model/Ordonnance.model";
import {PrescriptionVo} from "../../../../controller/model/Prescription.model";
import {DatePipe} from "@angular/common";
import {DepenseService} from "../../../../controller/service/Depense.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {PrescriptionService} from "../../../../controller/service/Prescription.service";
import {PatientService} from "../../../../controller/service/Patient.service";
import {MutuelleService} from "../../../../controller/service/Mutuelle.service";
import {TarifChargeService} from "../../../../controller/service/TarifCharge.service";
import {OrdonnanceService} from "../../../../controller/service/Ordonnance.service";
import {MedicamentService} from "../../../../controller/service/Medicament.service";
import {ConstanteService} from "../../../../controller/service/Constante.service";
import {ConstanteVo} from "../../../../controller/model/Constante.model";
import {MedicamentVo} from "../../../../controller/model/Medicament.model";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {MutuelleVo} from "../../../../controller/model/Mutuelle.model";
import {DepenseVo} from "../../../../controller/model/Depense.model";
import {environment} from "../../../../../environments/environment";
import {SupplementVo} from "../../../../controller/model/Supplement.model";
import {ChargeVo} from "../../../../controller/model/Charge.model";
import {ChargeService} from "../../../../controller/service/Charge.service";
import {SupplementConsultationVo} from "../../../../controller/model/SupplementConsultation.model";
import {TypeConsultationVo} from "../../../../controller/model/TypeConsultation.model";
import {TypeChargeVo} from "../../../../controller/model/TypeCharge.model";
import {TypeChargeService} from "../../../../controller/service/TypeCharge.service";

@Component({
    selector: 'app-depense-create',
    templateUrl: './depense-create.component.html',
    styleUrls: ['./depense-create.component.scss']
})
export class DepenseCreateComponent implements OnInit {

    selectedTarifCharges: TarifChargeVo = new TarifChargeVo();
    _submitted = false;
    private _errorMessages = new Array<string>();
    _validDepenseReference = true;
    _validDepenseDateDepense = true;
    _validDepenseTarif = true;
    _validDepenseTarifCharges = true;
    _validTarifChargeReference = true;
    _validTarifChargeDateTarifCharge = true;
    _validTarifChargeMontant = true;
    chargesFixe: number = 0;

    constructor(private datePipe: DatePipe, private depenseService: DepenseService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router,
                private chargeService: ChargeService, private typeChargeService: TypeChargeService,
                private tarifChargeService: TarifChargeService) {
    }

    ngOnInit(): void {
        this.selectedTarifCharges.chargeVo = new ChargeVo();
        this.chargeService.findAll().subscribe((data) => this.charges = data);
        this.tarifChargeService.findAll().subscribe(data => {
            this.tarifCharges = data;
            // console.log(this.tarifCharges);
        });
        this.fixedCharges();
    }

    private setValidation(value: boolean) {
        this.validDepenseReference = value;
        this.validDepenseDateDepense = value;
        this.validDepenseTarif = value;
        this.validDepenseTarifCharges = value;
        this.validTarifChargeReference = value;
        this.validTarifChargeDateTarifCharge = value;
        this.validTarifChargeMontant = value;
    }

    // addTarifCharges() {
    //     if (this.selectedDepense.tarifChargesVo == null) {
    //         this.selectedDepense.tarifChargesVo = new Array<TarifChargeVo>();
    //     }
    //     this.validateDepenseTarif();
    //     if (this.errorMessages.length === 0) {
    //         this.selectedDepense.tarifChargesVo.push(this.selectedTarifCharges);
    //         this.selectedTarifCharges = new TarifChargeVo();
    //     } else {
    //         this.messageService.add({
    //             severity: 'error',
    //             summary: 'Erreurs',
    //             detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
    //         });
    //     }
    // }

    fixedCharges() {
        this.tarifCharges.forEach(e => {
            if (e.chargeVo.fixe === true) {
                this.chargesFixe += Number(e.prix);
                console.log(e);
            }
        })
        console.log(this.chargesFixe);
    }

    addTarifCharges() {
        if (this.selectedDepense.tarifChargesVo == null) {
            this.selectedDepense.tarifChargesVo = new Array<TarifChargeVo>();
        }
        this.validateTarifCharges();
        if (this.errorMessages.length === 0) {
            if (this.selectedDepense.total == null) this.selectedDepense.total = 0;
            this.selectedDepense.total += this.chargesFixe;

            // this.selectedConsultation.tarif += Number(this.selectedSupplementConsultations.prix);

            let tarif = Number(this.selectedDepense.total);
            tarif += Number(this.selectedTarifCharges.prix);
            this.selectedDepense.total = tarif;
            // this.selectedConsultation.tarif = this.selectedSupplementConsultations.prix;
            console.log(this.selectedDepense.total)
            this.selectedDepense.tarifChargesVo.push(this.selectedTarifCharges);
            this.selectedTarifCharges = new TarifChargeVo();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
    }

    validateTarifCharges() {
        this.errorMessages = new Array();
    }

    deleteTarifCharges(p: TarifChargeVo) {
        this.selectedDepense.tarifChargesVo.forEach((element, index) => {
            if (element === p) {
                this.selectedDepense.tarifChargesVo.splice(index, 1);
            }
        });
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
        this.depenseService.save().subscribe(depense => {
            this.depenses.push({...depense});
            this.createDepenseDialog = false;
            this.submitted = false;
            this.selectedDepense = new DepenseVo();

        }, error => {
            console.log(error);
        });

    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        // this.validateDepenseReference();
        this.validateDepenseDateDepense();
        // this.validateDepenseTarif();
        this.validateDepenseTarifCharges();

    }

    private validateDepenseReference() {
        if (this.stringUtilService.isEmpty(this.selectedDepense.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validDepenseReference = false;
        } else {
            this.validDepenseReference = true;
        }
    }

    private validateDepenseDateDepense() {
        if (this.stringUtilService.isEmpty(this.selectedDepense.date)) {
            this.errorMessages.push('Date depense non valide');
            this.validDepenseDateDepense = false;
        } else {
            this.validDepenseDateDepense = true;
        }
    }

    private validateDepenseTarif() {
        if (this.stringUtilService.isEmpty(this.selectedDepense.total)) {
            this.errorMessages.push('Tarif non valide');
            this.validDepenseTarif = false;
        } else {
            this.validDepenseTarif = true;
        }
    }

    private validateDepenseTarifCharges() {
        if (this.stringUtilService.isEmpty(this.selectedDepense.tarifChargesVo)) {
            this.errorMessages.push('TarifCharges non valide');
            this.validDepenseTarifCharges = false;
        } else {
            this.validDepenseTarifCharges = true;
        }
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

    hideCreateDialog() {
        this.createDepenseDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get depenses(): Array<DepenseVo> {
        return this.depenseService.depenses;
    }

    set depenses(value: Array<DepenseVo>) {
        this.depenseService.depenses = value;
    }

    get tarifCharges(): Array<TarifChargeVo> {
        return this.tarifChargeService.tarifCharges;
    }

    set tarifCharges(value: Array<TarifChargeVo>) {
        this.tarifChargeService.tarifCharges = value;
    }

    get selectedDepense(): DepenseVo {
        return this.depenseService.selectedDepense;
    }

    set selectedDepense(value: DepenseVo) {
        this.depenseService.selectedDepense = value;
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

    get validDepenseReference(): boolean {
        return this._validDepenseReference;
    }

    set validDepenseReference(value: boolean) {
        this._validDepenseReference = value;
    }

    get validDepenseDateDepense(): boolean {
        return this._validDepenseDateDepense;
    }

    set validDepenseDateDepense(value: boolean) {
        this._validDepenseDateDepense = value;
    }

    get validDepenseTarif(): boolean {
        return this._validDepenseTarif;
    }

    set validDepenseTarif(value: boolean) {
        this._validDepenseTarif = value;
    }

    get validDepenseTarifCharges(): boolean {
        return this._validDepenseTarifCharges;
    }

    set validDepenseTarifCharges(value: boolean) {
        this._validDepenseTarifCharges = value;
    }

    get validTarifChargeReference(): boolean {
        return this._validTarifChargeReference;
    }

    set validTarifChargeReference(value: boolean) {
        this._validTarifChargeReference = value;
    }

    get validTarifChargeDateTarifCharge(): boolean {
        return this._validTarifChargeDateTarifCharge;
    }

    set validTarifChargeDateTarifCharge(value: boolean) {
        this._validTarifChargeDateTarifCharge = value;
    }

    get validTarifChargeMontant(): boolean {
        return this._validTarifChargeMontant;
    }

    set validTarifChargeMontant(value: boolean) {
        this._validTarifChargeMontant = value;
    }

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

}
