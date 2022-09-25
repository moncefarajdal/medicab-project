import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";
import {PaiementVo} from "../../../../controller/model/Paiement.model";
import {ConsultationService} from "../../../../controller/service/Consultation.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {PaiementService} from "../../../../controller/service/Paiement.service";
import {DatePipe} from "@angular/common";
import {TypePaiementService} from "../../../../controller/service/TypePaiement.service";
import {TypePaiementVo} from "../../../../controller/model/TypePaiement.model";

@Component({
    selector: 'app-paiement-create',
    templateUrl: './paiement-create.component.html',
    styleUrls: ['./paiement-create.component.scss']
})
export class PaiementCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();
    _validPaiementReference = true;
    _validPaiementDatePaiement = true;
    _validPaiementMontant = true;
    _validConsultationReference = true;
    _validConsultationDateConsultation = true;
    _validConsultationPatient = true;
    _validConsultationTarif = true;
    _validConsultationPaiements = true;
    _validConsultationOrdonnances = true;
    _validConsultationConstanteConsultations = true;
    _validConsultationPrescriptions = true;
    private _validTypePaiementLibelle = true;
    private _validTypePaiementCode = true;

    constructor(private datePipe: DatePipe, private paiementService: PaiementService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router,
                private consultationService: ConsultationService, private typePaiementService: TypePaiementService) {
    }

    ngOnInit(): void {
        this.selectedConsultation = new ConsultationVo();
        this.consultationService.findAll().subscribe((data) => this.consultations = data);
        this.typePaiementService.findAll().subscribe(data => this.typePaiements = data);
    }

    private setValidation(value: boolean) {
        this.validPaiementReference = value;
        this.validPaiementDatePaiement = value;
        this.validPaiementMontant = value;
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
        this.paiementService.save().subscribe(paiement => {
            this.paiements.push({...paiement});
            this.createPaiementDialog = false;
            this.submitted = false;
            this.selectedPaiement = new PaiementVo();
        }, error => {
            console.log(error);
        });

    }

    // validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();
        // this.validatePaiementReference();
        this.validatePaiementDatePaiement();
        this.validatePaiementMontant();
    }

    private validatePaiementReference() {
        if (this.stringUtilService.isEmpty(this.selectedPaiement.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validPaiementReference = false;
        } else {
            this.validPaiementReference = true;
        }
    }

    private validatePaiementDatePaiement() {
        if (this.stringUtilService.isEmpty(this.selectedPaiement.datePaiement)) {
            this.errorMessages.push('Date paiement non valide');
            this.validPaiementDatePaiement = false;
        } else {
            this.validPaiementDatePaiement = true;
        }
    }

    private validatePaiementMontant() {
        if (this.stringUtilService.isEmpty(this.selectedPaiement.montant)) {
            this.errorMessages.push('Montant non valide');
            this.validPaiementMontant = false;
        } else {
            this.validPaiementMontant = true;
        }
    }


    //openPopup
    public async openCreateconsultation(consultation: string) {
        const isPermistted = await this.roleService.isPermitted('Consultation', 'add');
        if (isPermistted) {
            this.selectedConsultation = new ConsultationVo();
            this.createConsultationDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatetypePaiement(typePaiement: string) {
        const isPermistted = await this.roleService.isPermitted('TypePaiement', 'add');
        if (isPermistted) {
            this.selectedTypePaiement = new TypePaiementVo();
            this.createTypePaiementDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    // methods
    hideCreateDialog() {
        this.createPaiementDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get paiements(): Array<PaiementVo> {
        return this.paiementService.paiements;
    }

    set paiements(value: Array<PaiementVo>) {
        this.paiementService.paiements = value;
    }

    get selectedPaiement(): PaiementVo {
        return this.paiementService.selectedPaiement;
    }

    set selectedPaiement(value: PaiementVo) {
        this.paiementService.selectedPaiement = value;
    }

    get createPaiementDialog(): boolean {
        return this.paiementService.createPaiementDialog;

    }

    set createPaiementDialog(value: boolean) {
        this.paiementService.createPaiementDialog = value;
    }

    get selectedConsultation(): ConsultationVo {
        return this.consultationService.selectedConsultation;
    }

    set selectedConsultation(value: ConsultationVo) {
        this.consultationService.selectedConsultation = value;
    }

    get consultations(): Array<ConsultationVo> {
        return this.consultationService.consultations;
    }

    set consultations(value: Array<ConsultationVo>) {
        this.consultationService.consultations = value;
    }

    get createConsultationDialog(): boolean {
        return this.consultationService.createConsultationDialog;
    }

    set createConsultationDialog(value: boolean) {
        this.consultationService.createConsultationDialog = value;
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

    get validPaiementReference(): boolean {
        return this._validPaiementReference;
    }

    set validPaiementReference(value: boolean) {
        this._validPaiementReference = value;
    }

    get validPaiementDatePaiement(): boolean {
        return this._validPaiementDatePaiement;
    }

    set validPaiementDatePaiement(value: boolean) {
        this._validPaiementDatePaiement = value;
    }

    get validPaiementMontant(): boolean {
        return this._validPaiementMontant;
    }

    set validPaiementMontant(value: boolean) {
        this._validPaiementMontant = value;
    }

    get validConsultationReference(): boolean {
        return this._validConsultationReference;
    }

    set validConsultationReference(value: boolean) {
        this._validConsultationReference = value;
    }

    get validConsultationDateConsultation(): boolean {
        return this._validConsultationDateConsultation;
    }

    set validConsultationDateConsultation(value: boolean) {
        this._validConsultationDateConsultation = value;
    }

    get validConsultationPatient(): boolean {
        return this._validConsultationPatient;
    }

    set validConsultationPatient(value: boolean) {
        this._validConsultationPatient = value;
    }

    get validConsultationTarif(): boolean {
        return this._validConsultationTarif;
    }

    set validConsultationTarif(value: boolean) {
        this._validConsultationTarif = value;
    }

    get validConsultationPaiements(): boolean {
        return this._validConsultationPaiements;
    }

    set validConsultationPaiements(value: boolean) {
        this._validConsultationPaiements = value;
    }

    get validConsultationOrdonnances(): boolean {
        return this._validConsultationOrdonnances;
    }

    set validConsultationOrdonnances(value: boolean) {
        this._validConsultationOrdonnances = value;
    }

    get validConsultationConstanteConsultations(): boolean {
        return this._validConsultationConstanteConsultations;
    }

    set validConsultationConstanteConsultations(value: boolean) {
        this._validConsultationConstanteConsultations = value;
    }

    get validConsultationPrescriptions(): boolean {
        return this._validConsultationPrescriptions;
    }

    set validConsultationPrescriptions(value: boolean) {
        this._validConsultationPrescriptions = value;
    }


    get validTypePaiementLibelle(): boolean {
        return this._validTypePaiementLibelle;
    }

    set validTypePaiementLibelle(value: boolean) {
        this._validTypePaiementLibelle = value;
    }

    get validTypePaiementCode(): boolean {
        return this._validTypePaiementCode;
    }

    set validTypePaiementCode(value: boolean) {
        this._validTypePaiementCode = value;
    }

    get typePaiements(): Array<TypePaiementVo> {
        return this.typePaiementService.typePaiements;
    }

    set typePaiements(value: Array<TypePaiementVo>) {
        this.typePaiementService.typePaiements = value;
    }

    get selectedTypePaiement(): TypePaiementVo {
        return this.typePaiementService.selectedTypePaiement;
    }

    set selectedTypePaiement(value: TypePaiementVo) {
        this.typePaiementService.selectedTypePaiement = value;
    }

    get createTypePaiementDialog(): boolean {
        return this.typePaiementService.createTypePaiementDialog;
    }

    set createTypePaiementDialog(value: boolean) {
        this.typePaiementService.createTypePaiementDialog = value;
    }
}
