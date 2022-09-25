import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {MutuelleVo} from "../../../../controller/model/Mutuelle.model";
import {TypeConsultationVo} from "../../../../controller/model/TypeConsultation.model";
import {OrdonnanceVo} from "../../../../controller/model/Ordonnance.model";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {ConstanteVo} from "../../../../controller/model/Constante.model";
import {MedicamentVo} from "../../../../controller/model/Medicament.model";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";
import {PrescriptionVo} from "../../../../controller/model/Prescription.model";
import {ConstanteConsultationVo} from "../../../../controller/model/ConstanteConsultation.model";
import {PaiementVo} from "../../../../controller/model/Paiement.model";
import {DatePipe} from "@angular/common";
import {ConsultationService} from "../../../../controller/service/Consultation.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {PrescriptionService} from "../../../../controller/service/Prescription.service";
import {TypeConsultationService} from "../../../../controller/service/TypeConsultation.service";
import {ConstanteConsultationService} from "../../../../controller/service/ConstanteConsultation.service";
import {PatientService} from "../../../../controller/service/Patient.service";
import {MutuelleService} from "../../../../controller/service/Mutuelle.service";
import {PaiementService} from "../../../../controller/service/Paiement.service";
import {ConstanteService} from "../../../../controller/service/Constante.service";
import {OrdonnanceService} from "../../../../controller/service/Ordonnance.service";
import {MedicamentService} from "../../../../controller/service/Medicament.service";

@Component({
  selector: 'app-consultation-create',
  templateUrl: './consultation-create.component.html',
  styleUrls: ['./consultation-create.component.scss']
})
export class ConsultationCreateComponent implements OnInit {

    selectedPaiements: PaiementVo = new PaiementVo();
    selectedOrdonnances: OrdonnanceVo = new OrdonnanceVo();
    selectedConstanteConsultations: ConstanteConsultationVo = new ConstanteConsultationVo();
    selectedPrescriptions: PrescriptionVo = new PrescriptionVo();
    _submitted = false;
    private _errorMessages = new Array<string>();

    _validConsultationReference = true;
    _validConsultationDateConsultation = true;
    _validConsultationPatient = true;
    _validConsultationTarif = true;
    _validConsultationPaiements = true;
    _validConsultationOrdonnances = true;
    _validConsultationConstanteConsultations = true;
    _validConsultationPrescriptions = true;

    _validTypeConsultationLibelle = true;
    _validTypeConsultationCode = true;
    _validTypeConsultationTarif = true;
    _validPatientCin = true;
    _validPatientNom = true;
    _validPatientPrenom = true;
    _validPatientDateNaissance = true;
    _validPatientSexe = true;
    _validPatientAdresse = true;
    _validPatientTelephone = true;
    _validPatientNumeroCnss = true;
    _validMutuelleLibelle = true;
    _validMutuelleCode = true;
    _validPaiementReference = true;
    _validPaiementDatePaiement = true;
    _validPaiementMontant = true;
    _validOrdonnanceReference = true;
    _validOrdonnanceDateOrdonnance = true;
    _validPrescriptionReference = true;
    _validPrescriptionOrdonnance = true;
    _validPrescriptionMedicament = true;
    _validPrescriptionNbreFois = true;
    _validPrescriptionQteMedicament = true;
    _validPrescriptionFormeMedicament = true;

    constructor(private datePipe: DatePipe, private consultationService: ConsultationService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router,
                private prescriptionService: PrescriptionService, private typeConsultationService: TypeConsultationService,
                private constanteConsultationService: ConstanteConsultationService, private patientService: PatientService,
                private mutuelleService: MutuelleService, private paiementService: PaiementService,
                private ordonnanceService: OrdonnanceService, private medicamentService: MedicamentService,
                private constanteService: ConstanteService) {
    }

    ngOnInit(): void {
        this.selectedConstanteConsultations.constanteVo = new ConstanteVo();
        this.constanteService.findAll().subscribe((data) => this.constantes = data);

        // this.selectedPrescriptions.ordonnanceVo = new OrdonnanceVo();
        // this.ordonnanceService.findAll().subscribe((data) => this.ordonnances = data);
        // this.selectedPrescriptions.medicamentVo = new MedicamentVo();
        // this.medicamentService.findAll().subscribe((data) => this.medicaments = data);

        this.selectedTypeConsultation = new TypeConsultationVo();
        this.typeConsultationService.findAll().subscribe((data) => this.typeConsultations = data);
        this.selectedPatient = new PatientVo();
        this.patientService.findAll().subscribe((data) => this.patients = data);
        this.selectedMutuelle = new MutuelleVo();
        this.mutuelleService.findAll().subscribe((data) => this.mutuelles = data);
    }


    validatePaiements() {
        this.errorMessages = new Array();
        this.validatePaiementReference();
        this.validatePaiementDatePaiement();
        this.validatePaiementMontant();
    }

    validateOrdonnances() {
        this.errorMessages = new Array();
        this.validateOrdonnanceReference();
        this.validateOrdonnanceDateOrdonnance();
    }

    validateConstanteConsultations() {
        this.errorMessages = new Array();
    }

    validatePrescriptions() {
        this.errorMessages = new Array();
        this.validatePrescriptionReference();
        this.validatePrescriptionOrdonnance();
        this.validatePrescriptionMedicament();
        this.validatePrescriptionNbreFois();
        this.validatePrescriptionQteMedicament();
        this.validatePrescriptionFormeMedicament();
    }

    private setValidation(value: boolean) {
        // this.validConsultationReference = value;
        this.validConsultationDateConsultation = value;
        this.validConsultationPatient = value;
        this.validConsultationTarif = value;
        this.validConsultationPaiements = value;
        this.validPaiementReference = value;
        this.validPaiementDatePaiement = value;
        this.validPaiementMontant = value;
        this.validConsultationOrdonnances = value;
        this.validOrdonnanceReference = value;
        this.validOrdonnanceDateOrdonnance = value;
        this.validConsultationConstanteConsultations = value;
        this.validConsultationPrescriptions = value;
        this.validPrescriptionReference = value;
        this.validPrescriptionOrdonnance = value;
        this.validPrescriptionMedicament = value;
        this.validPrescriptionNbreFois = value;
        this.validPrescriptionQteMedicament = value;
        this.validPrescriptionFormeMedicament = value;
    }

    addPaiements() {
        if (this.selectedConsultation.paiementsVo == null) {
            this.selectedConsultation.paiementsVo = new Array<PaiementVo>();
        }
        this.validatePaiements();
        if (this.errorMessages.length === 0) {
            // this.selectedConsultation.tarif += this.selectedPaiements.montant;
            this.selectedConsultation.paiementsVo.push(this.selectedPaiements);
            this.selectedPaiements = new PaiementVo();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
    }

    deletePaiements(p: PaiementVo) {
        this.selectedConsultation.paiementsVo.forEach((element, index) => {
            if (element === p) {
                this.selectedConsultation.paiementsVo.splice(index, 1);
            }
        });
    }

    addOrdonnances() {
        if (this.selectedConsultation.ordonnancesVo == null) {
            this.selectedConsultation.ordonnancesVo = new Array<OrdonnanceVo>();
        }
        this.validateOrdonnances();
        if (this.errorMessages.length === 0) {
            this.selectedConsultation.ordonnancesVo.push(this.selectedOrdonnances);
            this.selectedOrdonnances = new OrdonnanceVo();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
    }

    deleteOrdonnances(p: OrdonnanceVo) {
        this.selectedConsultation.ordonnancesVo.forEach((element, index) => {
            if (element === p) {
                this.selectedConsultation.ordonnancesVo.splice(index, 1);
            }
        });
    }

    addConstanteConsultations() {
        if (this.selectedConsultation.constanteConsultationsVo == null) {
            this.selectedConsultation.constanteConsultationsVo = new Array<ConstanteConsultationVo>();
        }
        this.validateConstanteConsultations();
        if (this.errorMessages.length === 0) {
            this.selectedConsultation.constanteConsultationsVo.push(this.selectedConstanteConsultations);
            this.selectedConstanteConsultations = new ConstanteConsultationVo();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
    }

    deleteConstanteConsultations(p: ConstanteConsultationVo) {
        this.selectedConsultation.constanteConsultationsVo.forEach((element, index) => {
            if (element === p) {
                this.selectedConsultation.constanteConsultationsVo.splice(index, 1);
            }
        });
    }

    addPrescriptions() {
        if (this.selectedConsultation.prescriptionsVo == null) {
            this.selectedConsultation.prescriptionsVo = new Array<PrescriptionVo>();
        }
        this.validatePrescriptions();
        if (this.errorMessages.length === 0) {
            this.selectedConsultation.prescriptionsVo.push(this.selectedPrescriptions);
            this.selectedPrescriptions = new PrescriptionVo();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
    }

    deletePrescriptions(p: PrescriptionVo) {
        this.selectedConsultation.prescriptionsVo.forEach((element, index) => {
            if (element === p) {
                this.selectedConsultation.prescriptionsVo.splice(index, 1);
            }
        });
    }

    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Consultation ajoutée'});
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.consultationService.save().subscribe(consultation => {
            this.consultations.push({...consultation});
            this.createConsultationDialog = false;
            this.submitted = false;
            this.selectedConsultation = new ConsultationVo();
            this.selectedConsultation.tarif = 0;

        }, error => {
            console.log(error);
        });

    }

    //validation methods

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        // this.validateConsultationReference();
        this.validateConsultationDateConsultation();
        this.validateConsultationPatient();
        // this.validateConsultationTarif();
        // this.validateConsultationPaiements();
        // this.validateConsultationOrdonnances();
        // this.validateConsultationConstanteConsultations();
        // this.validateConsultationPrescriptions();

    }

    private validateConsultationReference() {
        if (this.stringUtilService.isEmpty(this.selectedConsultation.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validConsultationReference = false;
        } else {
            this.validConsultationReference = true;
        }
    }

    private validateConsultationDateConsultation() {
        if (this.stringUtilService.isEmpty(this.selectedConsultation.dateConsultation)) {
            this.errorMessages.push('Date consultation non valide');
            this.validConsultationDateConsultation = false;
        } else {
            this.validConsultationDateConsultation = true;
        }
    }

    private validateConsultationPatient() {
        if (this.stringUtilService.isEmpty(this.selectedConsultation.patientVo)) {
            this.errorMessages.push('Patient non valide');
            this.validConsultationPatient = false;
        } else {
            this.validConsultationPatient = true;
        }
    }

    private validateConsultationTarif() {
        if (this.stringUtilService.isEmpty(this.selectedConsultation.tarif)) {
            this.errorMessages.push('Tarif non valide');
            this.validConsultationTarif = false;
        } else {
            this.validConsultationTarif = true;
        }
    }

    private validateConsultationPaiements() {
        if (this.stringUtilService.isEmpty(this.selectedConsultation.paiementsVo)) {
            this.errorMessages.push('Paiements non valide');
            this.validConsultationPaiements = false;
        } else {
            this.validConsultationPaiements = true;
        }
    }

    private validateConsultationOrdonnances() {
        if (this.stringUtilService.isEmpty(this.selectedConsultation.ordonnancesVo)) {
            this.errorMessages.push('Ordonnances non valide');
            this.validConsultationOrdonnances = false;
        } else {
            this.validConsultationOrdonnances = true;
        }
    }

    private validateConsultationConstanteConsultations() {
        if (this.stringUtilService.isEmpty(this.selectedConsultation.constanteConsultationsVo)) {
            this.errorMessages.push('Constante consultations non valide');
            this.validConsultationConstanteConsultations = false;
        } else {
            this.validConsultationConstanteConsultations = true;
        }
    }

    private validateConsultationPrescriptions() {
        if (this.stringUtilService.isEmpty(this.selectedConsultation.prescriptionsVo)) {
            this.errorMessages.push('Prescriptions non valide');
            this.validConsultationPrescriptions = false;
        } else {
            this.validConsultationPrescriptions = true;
        }
    }

    private validatePaiementReference() {
        if (this.selectedPaiements.reference == null) {
            this.errorMessages.push('Reference de la paiement est  invalide');
            this.validPaiementReference = false;
        } else {
            this.validPaiementReference = true;
        }
    }

    private validatePaiementDatePaiement() {
        if (this.selectedPaiements.datePaiement == null) {
            this.errorMessages.push('DatePaiement de la paiement est  invalide');
            this.validPaiementDatePaiement = false;
        } else {
            this.validPaiementDatePaiement = true;
        }
    }

    private validatePaiementMontant() {
        if (this.selectedPaiements.montant == null) {
            this.errorMessages.push('Montant de la paiement est  invalide');
            this.validPaiementMontant = false;
        } else {
            this.validPaiementMontant = true;
        }
    }


    private validateOrdonnanceReference() {
        if (this.selectedOrdonnances.reference == null) {
            this.errorMessages.push('Reference de la ordonnance est  invalide');
            this.validOrdonnanceReference = false;
        } else {
            this.validOrdonnanceReference = true;
        }
    }


    private validateOrdonnanceDateOrdonnance() {
        if (this.selectedOrdonnances.dateOrdonnance == null) {
            this.errorMessages.push('DateOrdonnance de la ordonnance est  invalide');
            this.validOrdonnanceDateOrdonnance = false;
        } else {
            this.validOrdonnanceDateOrdonnance = true;
        }
    }


    private validatePrescriptionReference() {
        if (this.selectedPrescriptions.reference == null) {
            this.errorMessages.push('Reference de la prescription est  invalide');
            this.validPrescriptionReference = false;
        } else {
            this.validPrescriptionReference = true;
        }
    }

    private validatePrescriptionOrdonnance() {
        if (this.selectedPrescriptions.ordonnanceVo == null) {
            this.errorMessages.push('Ordonnance de la prescription est  invalide');
            this.validPrescriptionOrdonnance = false;
        } else {
            this.validPrescriptionOrdonnance = true;
        }
    }

    private validatePrescriptionMedicament() {
        if (this.selectedPrescriptions.medicamentVo == null) {
            this.errorMessages.push('Medicament de la prescription est  invalide');
            this.validPrescriptionMedicament = false;
        } else {
            this.validPrescriptionMedicament = true;
        }
    }

    private validatePrescriptionNbreFois() {
        if (this.selectedPrescriptions.nbreFois == null) {
            this.errorMessages.push('NbreFois de la prescription est  invalide');
            this.validPrescriptionNbreFois = false;
        } else {
            this.validPrescriptionNbreFois = true;
        }
    }

    private validatePrescriptionQteMedicament() {
        if (this.selectedPrescriptions.qteMedicament == null) {
            this.errorMessages.push('QteMedicament de la prescription est  invalide');
            this.validPrescriptionQteMedicament = false;
        } else {
            this.validPrescriptionQteMedicament = true;
        }
    }

    private validatePrescriptionFormeMedicament() {
        if (this.selectedPrescriptions.formeMedicament == null) {
            this.errorMessages.push('FormeMedicament de la prescription est  invalide');
            this.validPrescriptionFormeMedicament = false;
        } else {
            this.validPrescriptionFormeMedicament = true;
        }
    }

    public async openCreatemedicament(medicament: string) {
        const isPermistted = await this.roleService.isPermitted('Medicament', 'add');
        if (isPermistted) {
            this.selectedMedicament = new MedicamentVo();
            this.createMedicamentDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreateconstante(constante: string) {
        const isPermistted = await this.roleService.isPermitted('Constante', 'add');
        if (isPermistted) {
            this.selectedConstante = new ConstanteVo();
            this.createConstanteDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatepatient(patient: string) {
        const isPermistted = await this.roleService.isPermitted('Patient', 'add');
        if (isPermistted) {
            this.selectedPatient = new PatientVo();
            this.createPatientDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreateordonnance(ordonnance: string) {
        const isPermistted = await this.roleService.isPermitted('Ordonnance', 'add');
        if (isPermistted) {
            this.selectedOrdonnance = new OrdonnanceVo();
            this.createOrdonnanceDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatetypeConsultation(typeConsultation: string) {
        const isPermistted = await this.roleService.isPermitted('TypeConsultation', 'add');
        if (isPermistted) {
            this.selectedTypeConsultation = new TypeConsultationVo();
            this.createTypeConsultationDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreatemutuelle(mutuelle: string) {
        const isPermistted = await this.roleService.isPermitted('Mutuelle', 'add');
        if (isPermistted) {
            this.selectedMutuelle = new MutuelleVo();
            this.createMutuelleDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    hideCreateDialog() {
        this.createConsultationDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get consultations(): Array<ConsultationVo> {
        return this.consultationService.consultations;
    }

    set consultations(value: Array<ConsultationVo>) {
        this.consultationService.consultations = value;
    }

    get selectedConsultation(): ConsultationVo {
        return this.consultationService.selectedConsultation;
    }

    set selectedConsultation(value: ConsultationVo) {
        this.consultationService.selectedConsultation = value;
    }

    get createConsultationDialog(): boolean {
        return this.consultationService.createConsultationDialog;
    }

    set createConsultationDialog(value: boolean) {
        this.consultationService.createConsultationDialog = value;
    }

    get selectedMedicament(): MedicamentVo {
        return this.medicamentService.selectedMedicament;
    }

    set selectedMedicament(value: MedicamentVo) {
        this.medicamentService.selectedMedicament = value;
    }

    get medicaments(): Array<MedicamentVo> {
        return this.medicamentService.medicaments;
    }

    set medicaments(value: Array<MedicamentVo>) {
        this.medicamentService.medicaments = value;
    }

    get createMedicamentDialog(): boolean {
        return this.medicamentService.createMedicamentDialog;
    }

    set createMedicamentDialog(value: boolean) {
        this.medicamentService.createMedicamentDialog = value;
    }

    get selectedConstante(): ConstanteVo {
        return this.constanteService.selectedConstante;
    }

    set selectedConstante(value: ConstanteVo) {
        this.constanteService.selectedConstante = value;
    }

    get constantes(): Array<ConstanteVo> {
        return this.constanteService.constantes;
    }

    set constantes(value: Array<ConstanteVo>) {
        this.constanteService.constantes = value;
    }

    get createConstanteDialog(): boolean {
        return this.constanteService.createConstanteDialog;
    }

    set createConstanteDialog(value: boolean) {
        this.constanteService.createConstanteDialog = value;
    }

    get selectedPatient(): PatientVo {
        return this.patientService.selectedPatient;
    }

    set selectedPatient(value: PatientVo) {
        this.patientService.selectedPatient = value;
    }

    get patients(): Array<PatientVo> {
        return this.patientService.patients;
    }

    set patients(value: Array<PatientVo>) {
        this.patientService.patients = value;
    }

    get createPatientDialog(): boolean {
        return this.patientService.createPatientDialog;
    }

    set createPatientDialog(value: boolean) {
        this.patientService.createPatientDialog = value;
    }

    get selectedOrdonnance(): OrdonnanceVo {
        return this.ordonnanceService.selectedOrdonnance;
    }

    set selectedOrdonnance(value: OrdonnanceVo) {
        this.ordonnanceService.selectedOrdonnance = value;
    }

    get ordonnances(): Array<OrdonnanceVo> {
        return this.ordonnanceService.ordonnances;
    }

    set ordonnances(value: Array<OrdonnanceVo>) {
        this.ordonnanceService.ordonnances = value;
    }

    get createOrdonnanceDialog(): boolean {
        return this.ordonnanceService.createOrdonnanceDialog;
    }

    set createOrdonnanceDialog(value: boolean) {
        this.ordonnanceService.createOrdonnanceDialog = value;
    }

    get selectedTypeConsultation(): TypeConsultationVo {
        return this.typeConsultationService.selectedTypeConsultation;
    }

    set selectedTypeConsultation(value: TypeConsultationVo) {
        this.typeConsultationService.selectedTypeConsultation = value;
    }

    get typeConsultations(): Array<TypeConsultationVo> {
        return this.typeConsultationService.typeConsultations;
    }

    set typeConsultations(value: Array<TypeConsultationVo>) {
        this.typeConsultationService.typeConsultations = value;
    }

    get createTypeConsultationDialog(): boolean {
        return this.typeConsultationService.createTypeConsultationDialog;
    }

    set createTypeConsultationDialog(value: boolean) {
        this.typeConsultationService.createTypeConsultationDialog = value;
    }

    get selectedMutuelle(): MutuelleVo {
        return this.mutuelleService.selectedMutuelle;
    }

    set selectedMutuelle(value: MutuelleVo) {
        this.mutuelleService.selectedMutuelle = value;
    }

    get mutuelles(): Array<MutuelleVo> {
        return this.mutuelleService.mutuelles;
    }

    set mutuelles(value: Array<MutuelleVo>) {
        this.mutuelleService.mutuelles = value;
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

    get validPatientCin(): boolean {
        return this._validPatientCin;
    }

    set validPatientCin(value: boolean) {
        this._validPatientCin = value;
    }

    get validPatientNom(): boolean {
        return this._validPatientNom;
    }

    set validPatientNom(value: boolean) {
        this._validPatientNom = value;
    }

    get validPatientPrenom(): boolean {
        return this._validPatientPrenom;
    }

    set validPatientPrenom(value: boolean) {
        this._validPatientPrenom = value;
    }

    get validPatientDateNaissance(): boolean {
        return this._validPatientDateNaissance;
    }

    set validPatientDateNaissance(value: boolean) {
        this._validPatientDateNaissance = value;
    }

    get validPatientSexe(): boolean {
        return this._validPatientSexe;
    }

    set validPatientSexe(value: boolean) {
        this._validPatientSexe = value;
    }

    get validPatientAdresse(): boolean {
        return this._validPatientAdresse;
    }

    set validPatientAdresse(value: boolean) {
        this._validPatientAdresse = value;
    }

    get validPatientTelephone(): boolean {
        return this._validPatientTelephone;
    }

    set validPatientTelephone(value: boolean) {
        this._validPatientTelephone = value;
    }

    get validPatientNumeroCnss(): boolean {
        return this._validPatientNumeroCnss;
    }

    set validPatientNumeroCnss(value: boolean) {
        this._validPatientNumeroCnss = value;
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

    get validOrdonnanceReference(): boolean {
        return this._validOrdonnanceReference;
    }

    set validOrdonnanceReference(value: boolean) {
        this._validOrdonnanceReference = value;
    }

    get validOrdonnanceDateOrdonnance(): boolean {
        return this._validOrdonnanceDateOrdonnance;
    }

    set validOrdonnanceDateOrdonnance(value: boolean) {
        this._validOrdonnanceDateOrdonnance = value;
    }

    get validPrescriptionReference(): boolean {
        return this._validPrescriptionReference;
    }

    set validPrescriptionReference(value: boolean) {
        this._validPrescriptionReference = value;
    }

    get validPrescriptionOrdonnance(): boolean {
        return this._validPrescriptionOrdonnance;
    }

    set validPrescriptionOrdonnance(value: boolean) {
        this._validPrescriptionOrdonnance = value;
    }

    get validPrescriptionMedicament(): boolean {
        return this._validPrescriptionMedicament;
    }

    set validPrescriptionMedicament(value: boolean) {
        this._validPrescriptionMedicament = value;
    }

    get validPrescriptionNbreFois(): boolean {
        return this._validPrescriptionNbreFois;
    }

    set validPrescriptionNbreFois(value: boolean) {
        this._validPrescriptionNbreFois = value;
    }

    get validPrescriptionQteMedicament(): boolean {
        return this._validPrescriptionQteMedicament;
    }

    set validPrescriptionQteMedicament(value: boolean) {
        this._validPrescriptionQteMedicament = value;
    }

    get validPrescriptionFormeMedicament(): boolean {
        return this._validPrescriptionFormeMedicament;
    }

    set validPrescriptionFormeMedicament(value: boolean) {
        this._validPrescriptionFormeMedicament = value;
    }

}
