import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {MutuelleVo} from "../../../../controller/model/Mutuelle.model";
import {TypeConsultationVo} from "../../../../controller/model/TypeConsultation.model";
import {OrdonnanceVo} from "../../../../controller/model/Ordonnance.model";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {ConstanteVo} from "../../../../controller/model/Constante.model";
import {MedicamentVo} from "../../../../controller/model/Medicament.model";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";
import {ConstanteConsultationService} from "../../../../controller/service/ConstanteConsultation.service";
import {MutuelleService} from "../../../../controller/service/Mutuelle.service";
import {TypeConsultationService} from "../../../../controller/service/TypeConsultation.service";
import {MedicamentService} from "../../../../controller/service/Medicament.service";
import {PatientService} from "../../../../controller/service/Patient.service";
import {ConstanteService} from "../../../../controller/service/Constante.service";
import {PrescriptionService} from "../../../../controller/service/Prescription.service";
import {PaiementService} from "../../../../controller/service/Paiement.service";
import {OrdonnanceService} from "../../../../controller/service/Ordonnance.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {ConsultationService} from "../../../../controller/service/Consultation.service";
import {DatePipe} from "@angular/common";
import {PrescriptionVo} from "../../../../controller/model/Prescription.model";
import {ConstanteConsultationVo} from "../../../../controller/model/ConstanteConsultation.model";
import {PaiementVo} from "../../../../controller/model/Paiement.model";

@Component({
    selector: 'app-consultation-view',
    templateUrl: './consultation-view.component.html',
    styleUrls: ['./consultation-view.component.scss']
})
export class ConsultationViewComponent implements OnInit {

    selectedPaiements: PaiementVo = new PaiementVo();
    paiementsListe: Array<PaiementVo> = [];


    selectedOrdonnances: OrdonnanceVo = new OrdonnanceVo();
    ordonnancesListe: Array<OrdonnanceVo> = [];


    selectedConstanteConsultations: ConstanteConsultationVo = new ConstanteConsultationVo();
    constanteConsultationsListe: Array<ConstanteConsultationVo> = [];

    myConstantes: Array<ConstanteVo> = [];

    selectedPrescriptions: PrescriptionVo = new PrescriptionVo();
    prescriptionsListe: Array<PrescriptionVo> = [];

    myOrdonnances: Array<OrdonnanceVo> = [];
    myMedicaments: Array<MedicamentVo> = [];


    constructor(private datePipe: DatePipe, private consultationService: ConsultationService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private ordonnanceService: OrdonnanceService
        , private paiementService: PaiementService
        , private prescriptionService: PrescriptionService
        , private constanteService: ConstanteService
        , private patientService: PatientService
        , private medicamentService: MedicamentService
        , private typeConsultationService: TypeConsultationService
        , private mutuelleService: MutuelleService
        , private constanteConsultationService: ConstanteConsultationService
    ) {
    }


    ngOnInit(): void {
        this.selectedConstanteConsultations.constanteVo = new ConstanteVo();
        this.constanteService.findAll().subscribe((data) => this.constantes = data);
        this.selectedPrescriptions.ordonnanceVo = new OrdonnanceVo();
        this.ordonnanceService.findAll().subscribe((data) => this.ordonnances = data);
        this.selectedPrescriptions.medicamentVo = new MedicamentVo();
        this.medicamentService.findAll().subscribe((data) => this.medicaments = data);
        this.selectedTypeConsultation = new TypeConsultationVo();
        this.typeConsultationService.findAll().subscribe((data) => this.typeConsultations = data);
        this.selectedPatient = new PatientVo();
        this.patientService.findAll().subscribe((data) => this.patients = data);
        this.selectedMutuelle = new MutuelleVo();
        this.mutuelleService.findAll().subscribe((data) => this.mutuelles = data);
    }

    hideViewDialog() {
        this.viewConsultationDialog = false;
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

    get viewConsultationDialog(): boolean {
        return this.consultationService.viewConsultationDialog;

    }

    set viewConsultationDialog(value: boolean) {
        this.consultationService.viewConsultationDialog = value;
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

    get editMedicamentDialog(): boolean {
        return this.medicamentService.editMedicamentDialog;
    }

    set editMedicamentDialog(value: boolean) {
        this.medicamentService.editMedicamentDialog = value;
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

    get editConstanteDialog(): boolean {
        return this.constanteService.editConstanteDialog;
    }

    set editConstanteDialog(value: boolean) {
        this.constanteService.editConstanteDialog = value;
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

    get editPatientDialog(): boolean {
        return this.patientService.editPatientDialog;
    }

    set editPatientDialog(value: boolean) {
        this.patientService.editPatientDialog = value;
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

    get editOrdonnanceDialog(): boolean {
        return this.ordonnanceService.editOrdonnanceDialog;
    }

    set editOrdonnanceDialog(value: boolean) {
        this.ordonnanceService.editOrdonnanceDialog = value;
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

    get editTypeConsultationDialog(): boolean {
        return this.typeConsultationService.editTypeConsultationDialog;
    }

    set editTypeConsultationDialog(value: boolean) {
        this.typeConsultationService.editTypeConsultationDialog = value;
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

    get editMutuelleDialog(): boolean {
        return this.mutuelleService.editMutuelleDialog;
    }

    set editMutuelleDialog(value: boolean) {
        this.mutuelleService.editMutuelleDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

}
