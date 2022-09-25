import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {OrdonnanceVo} from "../../../../controller/model/Ordonnance.model";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";
import {MedicamentVo} from "../../../../controller/model/Medicament.model";
import {PrescriptionVo} from "../../../../controller/model/Prescription.model";
import {MedicamentService} from "../../../../controller/service/Medicament.service";
import {OrdonnanceService} from "../../../../controller/service/Ordonnance.service";
import {ConsultationService} from "../../../../controller/service/Consultation.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {PrescriptionService} from "../../../../controller/service/Prescription.service";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-prescription-create',
    templateUrl: './prescription-create.component.html',
    styleUrls: ['./prescription-create.component.scss']
})
export class PrescriptionCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

    _validPrescriptionReference = true;
    _validPrescriptionOrdonnance = true;
    _validPrescriptionMedicament = true;
    _validPrescriptionNbreFois = true;
    _validPrescriptionQteMedicament = true;
    _validPrescriptionFormeMedicament = true;
    _validOrdonnanceReference = true;
    _validOrdonnanceDateOrdonnance = true;
    _validMedicamentCodeMedicament = true;
    _validMedicamentLibelle = true;
    _validConsultationReference = true;
    _validConsultationDateConsultation = true;
    _validConsultationPatient = true;
    _validConsultationTarif = true;
    _validConsultationPaiements = true;
    _validConsultationOrdonnances = true;
    _validConsultationConstanteConsultations = true;
    _validConsultationPrescriptions = true;


    constructor(private datePipe: DatePipe, private prescriptionService: PrescriptionService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router,
                private consultationService: ConsultationService, private ordonnanceService: OrdonnanceService,
                private medicamentService: MedicamentService) {
    }


    ngOnInit(): void {
        this.selectedOrdonnance = new OrdonnanceVo();
        this.ordonnanceService.findAll().subscribe((data) => this.ordonnances = data);
        this.selectedMedicament = new MedicamentVo();
        this.medicamentService.findAll().subscribe((data) => this.medicaments = data);
        this.selectedConsultation = new ConsultationVo();
        this.consultationService.findAll().subscribe((data) => this.consultations = data);
    }

    private setValidation(value: boolean) {
        this.validPrescriptionReference = value;
        this.validPrescriptionOrdonnance = value;
        this.validPrescriptionMedicament = value;
        this.validPrescriptionNbreFois = value;
        this.validPrescriptionQteMedicament = value;
        // this.validPrescriptionFormeMedicament = value;
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
        this.prescriptionService.save().subscribe(prescription => {
            this.prescriptions.push({...prescription});
            this.createPrescriptionDialog = false;
            this.submitted = false;
            this.selectedPrescription = new PrescriptionVo();
        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validatePrescriptionReference();
        this.validatePrescriptionOrdonnance();
        this.validatePrescriptionMedicament();
        this.validatePrescriptionNbreFois();
        this.validatePrescriptionQteMedicament();
        // this.validatePrescriptionFormeMedicament();

    }

    private validatePrescriptionReference() {
        if (this.stringUtilService.isEmpty(this.selectedPrescription.reference)) {
            this.errorMessages.push('Reference non valide');
            this.validPrescriptionReference = false;
        } else {
            this.validPrescriptionReference = true;
        }
    }

    private validatePrescriptionOrdonnance() {
        if (this.stringUtilService.isEmpty(this.selectedPrescription.ordonnanceVo)) {
            this.errorMessages.push('Ordonnance non valide');
            this.validPrescriptionOrdonnance = false;
        } else {
            this.validPrescriptionOrdonnance = true;
        }
    }

    private validatePrescriptionMedicament() {
        if (this.stringUtilService.isEmpty(this.selectedPrescription.medicamentVo)) {
            this.errorMessages.push('Medicament non valide');
            this.validPrescriptionMedicament = false;
        } else {
            this.validPrescriptionMedicament = true;
        }
    }

    private validatePrescriptionNbreFois() {
        if (this.stringUtilService.isEmpty(this.selectedPrescription.nbreFois)) {
            this.errorMessages.push('Nbre fois non valide');
            this.validPrescriptionNbreFois = false;
        } else {
            this.validPrescriptionNbreFois = true;
        }
    }

    private validatePrescriptionQteMedicament() {
        if (this.stringUtilService.isEmpty(this.selectedPrescription.qteMedicament)) {
            this.errorMessages.push('Qte medicament non valide');
            this.validPrescriptionQteMedicament = false;
        } else {
            this.validPrescriptionQteMedicament = true;
        }
    }

    private validatePrescriptionFormeMedicament() {
        if (this.stringUtilService.isEmpty(this.selectedPrescription.formeMedicament)) {
            this.errorMessages.push('Forme medicament non valide');
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

    // methods

    hideCreateDialog() {
        this.createPrescriptionDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get prescriptions(): Array<PrescriptionVo> {
        return this.prescriptionService.prescriptions;
    }

    set prescriptions(value: Array<PrescriptionVo>) {
        this.prescriptionService.prescriptions = value;
    }

    get selectedPrescription(): PrescriptionVo {
        return this.prescriptionService.selectedPrescription;
    }

    set selectedPrescription(value: PrescriptionVo) {
        this.prescriptionService.selectedPrescription = value;
    }

    get createPrescriptionDialog(): boolean {
        return this.prescriptionService.createPrescriptionDialog;

    }

    set createPrescriptionDialog(value: boolean) {
        this.prescriptionService.createPrescriptionDialog = value;
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

    get validMedicamentCodeMedicament(): boolean {
        return this._validMedicamentCodeMedicament;
    }

    set validMedicamentCodeMedicament(value: boolean) {
        this._validMedicamentCodeMedicament = value;
    }

    get validMedicamentLibelle(): boolean {
        return this._validMedicamentLibelle;
    }

    set validMedicamentLibelle(value: boolean) {
        this._validMedicamentLibelle = value;
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

}
