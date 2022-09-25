import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {MutuelleVo} from "../../../../controller/model/Mutuelle.model";
import {TypeConsultationVo} from "../../../../controller/model/TypeConsultation.model";
import {OrdonnanceVo} from "../../../../controller/model/Ordonnance.model";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {ConstanteVo} from "../../../../controller/model/Constante.model";
import {MedicamentVo} from "../../../../controller/model/Medicament.model";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";
import {DateUtils} from "../../../../utils/DateUtils";
import {PrescriptionVo} from "../../../../controller/model/Prescription.model";
import {ConstanteConsultationVo} from "../../../../controller/model/ConstanteConsultation.model";
import {PaiementVo} from "../../../../controller/model/Paiement.model";
import {DatePipe} from "@angular/common";
import {ConsultationService} from "../../../../controller/service/Consultation.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {OrdonnanceService} from "../../../../controller/service/Ordonnance.service";
import {PaiementService} from "../../../../controller/service/Paiement.service";
import {PrescriptionService} from "../../../../controller/service/Prescription.service";
import {ConstanteService} from "../../../../controller/service/Constante.service";
import {PatientService} from "../../../../controller/service/Patient.service";
import {MedicamentService} from "../../../../controller/service/Medicament.service";
import {TypeConsultationService} from "../../../../controller/service/TypeConsultation.service";
import {MutuelleService} from "../../../../controller/service/Mutuelle.service";
import {ConstanteConsultationService} from "../../../../controller/service/ConstanteConsultation.service";
import {SupplementService} from "../../../../controller/service/Supplement.service";
import {SupplementConsultationVo} from "../../../../controller/model/SupplementConsultation.model";
import {SupplementVo} from "../../../../controller/model/Supplement.model";

@Component({
  selector: 'app-consultation-medecin-edit',
  templateUrl: './consultation-medecin-edit.component.html',
  styleUrls: ['./consultation-medecin-edit.component.scss']
})
export class ConsultationMedecinEditComponent implements OnInit {

    selectedPaiements: PaiementVo = new PaiementVo();
    paiementsListe: Array<PaiementVo> = [];

    selectedOrdonnances: OrdonnanceVo = new OrdonnanceVo();
    ordonnancesListe: Array<OrdonnanceVo> = [];

    selectedConstanteConsultations: ConstanteConsultationVo = new ConstanteConsultationVo();
    constanteConsultationsListe: Array<ConstanteConsultationVo> = [];

    selectedSupplementConsultations: SupplementConsultationVo = new SupplementConsultationVo();
    supplementConsultationsListe: Array<SupplementConsultationVo> = [];

    myConstantes: Array<ConstanteVo> = [];
    selectedPrescriptions: PrescriptionVo = new PrescriptionVo();
    prescriptionsListe: Array<PrescriptionVo> = [];

    myOrdonnances: Array<OrdonnanceVo> = [];
    myMedicaments: Array<MedicamentVo> = [];

    _validConsultationSupplementConsultations = true;
    private errorMessages = new Array<string>();

    constructor(private datePipe: DatePipe, private consultationService: ConsultationService,
                private roleService: RoleService, private messageService: MessageService, private router: Router,
                private ordonnanceService: OrdonnanceService, private paiementService: PaiementService,
                private prescriptionService: PrescriptionService, private constanteService: ConstanteService,
                private patientService: PatientService, private medicamentService: MedicamentService,
                private typeConsultationService: TypeConsultationService, private mutuelleService: MutuelleService,
                private constanteConsultationService: ConstanteConsultationService,
                private supplementService: SupplementService) {
    }

    ngOnInit(): void {
        this.selectedSupplementConsultations.supplementVo = new SupplementVo();
        this.supplementService.findAll().subscribe((data) => this.supplements = data);
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

    validateSupplementConsultations() {
        this.errorMessages = new Array();
    }

    addPaiements() {
        if (this.selectedConsultation.paiementsVo == null) {
            this.selectedConsultation.paiementsVo = new Array<PaiementVo>();
        }
        this.selectedConsultation.paiementsVo.push(this.selectedPaiements);
        this.selectedPaiements = new PaiementVo();
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
        this.selectedConsultation.ordonnancesVo.push(this.selectedOrdonnances);
        this.selectedOrdonnances = new OrdonnanceVo();
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
        this.selectedConsultation.constanteConsultationsVo.push(this.selectedConstanteConsultations);
        this.selectedConstanteConsultations = new ConstanteConsultationVo();
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
        this.selectedConsultation.prescriptionsVo.push(this.selectedPrescriptions);
        this.selectedPrescriptions = new PrescriptionVo();
    }

    deletePrescriptions(p: PrescriptionVo) {
        this.selectedConsultation.prescriptionsVo.forEach((element, index) => {
            if (element === p) {
                this.selectedConsultation.prescriptionsVo.splice(index, 1);
            }
        });
    }

    addSupplementConsultations() {
        if (this.selectedConsultation.supplementConsultationsVo == null) {
            this.selectedConsultation.supplementConsultationsVo = new Array<SupplementConsultationVo>();
        }
        this.validateSupplementConsultations();
        if (this.errorMessages.length === 0) {
            if (this.selectedConsultation.tarif == null) this.selectedConsultation.tarif = 0;

            // this.selectedConsultation.tarif += Number(this.selectedSupplementConsultations.prix);

            let tarif = Number(this.selectedConsultation.tarif)
            tarif += Number(this.selectedSupplementConsultations.prix);
            this.selectedConsultation.tarif = tarif;
            // this.selectedConsultation.tarif = this.selectedSupplementConsultations.prix;
            console.log(this.selectedConsultation.tarif)
            this.selectedConsultation.supplementConsultationsVo.push(this.selectedSupplementConsultations);
            this.selectedSupplementConsultations = new SupplementConsultationVo();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
    }

    deleteSupplementConsultations(p: SupplementConsultationVo) {
        this.selectedConsultation.supplementConsultationsVo.forEach((element, index) => {
            if (element === p) {
                this.selectedConsultation.supplementConsultationsVo.splice(index, 1);
            }
        });
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

    public edit() {
        this.editWithShowOption(false);
    }

    public changeMontant() {
        // if (this.selectedConsultation.tarif == null) this.selectedConsultation.tarif = 0;
        this.selectedConsultation.tarif = 0;
        console.log(this.selectedConsultation.tarif);
        console.log(this.selectedConsultation);
        this.selectedConsultation.tarif = this.selectedConsultation.typeConsultationVo.tarif;
        console.log(this.selectedConsultation.typeConsultationVo.tarif)
    }

    public editWithShowOption(showList: boolean) {
        this.selectedConsultation.dateConsultation = DateUtils.toDate(this.selectedConsultation.dateConsultation);
        this.selectedConsultation.dateArchivage = DateUtils.toDate(this.selectedConsultation.dateArchivage);
        this.selectedConsultation.dateCreation = DateUtils.toDate(this.selectedConsultation.dateCreation);
        this.consultationService.edit().subscribe(consultation => {
            const myIndex = this.consultations.findIndex(e => e.id === this.selectedConsultation.id);
            this.consultations[myIndex] = this.selectedConsultation;
            this.editConsultationDialog = false;
            this.selectedConsultation = new ConsultationVo();

        }, error => {
            console.log(error);
        });
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

    public async openCreatesupplement(supplement: string) {
        const isPermistted = await this.roleService.isPermitted('Supplement', 'add');
        if (isPermistted) {
            this.selectedSupplement = new SupplementVo();
            this.createSupplementDialog = true;
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

    hideEditDialog() {
        this.editConsultationDialog = false;
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

    get editConsultationDialog(): boolean {
        return this.consultationService.editConsultationDialog;

    }

    set editConsultationDialog(value: boolean) {
        this.consultationService.editConsultationDialog = value;
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
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

    get selectedSupplement(): SupplementVo {
        return this.supplementService.selectedSupplement;
    }

    set selectedSupplement(value: SupplementVo) {
        this.supplementService.selectedSupplement = value;
    }

    get supplements(): Array<SupplementVo> {
        return this.supplementService.supplements;
    }

    set supplements(value: Array<SupplementVo>) {
        this.supplementService.supplements = value;
    }

    get createSupplementDialog(): boolean {
        return this.supplementService.createSupplementDialog;
    }

    set createSupplementDialog(value: boolean) {
        this.supplementService.createSupplementDialog = value;
    }

}
