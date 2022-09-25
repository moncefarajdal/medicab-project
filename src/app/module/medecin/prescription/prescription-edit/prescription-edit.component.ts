import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {OrdonnanceVo} from "../../../../controller/model/Ordonnance.model";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";
import {MedicamentVo} from "../../../../controller/model/Medicament.model";
import {PrescriptionVo} from "../../../../controller/model/Prescription.model";
import {DateUtils} from "../../../../utils/DateUtils";
import {DatePipe} from "@angular/common";
import {PrescriptionService} from "../../../../controller/service/Prescription.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {OrdonnanceService} from "../../../../controller/service/Ordonnance.service";
import {ConsultationService} from "../../../../controller/service/Consultation.service";
import {MedicamentService} from "../../../../controller/service/Medicament.service";

@Component({
  selector: 'app-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.scss']
})
export class PrescriptionEditComponent implements OnInit {

    constructor(private datePipe: DatePipe, private prescriptionService: PrescriptionService,
                private roleService: RoleService, private messageService: MessageService, private router: Router,
                private ordonnanceService: OrdonnanceService, private consultationService: ConsultationService,
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

    public edit() {
        this.editWithShowOption(false);
    }

    public editWithShowOption(showList: boolean) {
        this.selectedPrescription.dateArchivage = DateUtils.toDate(this.selectedPrescription.dateArchivage);
        this.selectedPrescription.dateCreation = DateUtils.toDate(this.selectedPrescription.dateCreation);
        this.prescriptionService.edit().subscribe(prescription => {
            const myIndex = this.prescriptions.findIndex(e => e.id === this.selectedPrescription.id);
            this.prescriptions[myIndex] = this.selectedPrescription;
            this.editPrescriptionDialog = false;
            this.selectedPrescription = new PrescriptionVo();

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

    hideEditDialog() {
        this.editPrescriptionDialog = false;
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

    get editPrescriptionDialog(): boolean {
        return this.prescriptionService.editPrescriptionDialog;

    }

    set editPrescriptionDialog(value: boolean) {
        this.prescriptionService.editPrescriptionDialog = value;
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
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

}
