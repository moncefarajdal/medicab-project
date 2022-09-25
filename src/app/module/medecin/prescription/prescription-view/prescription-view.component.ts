import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {OrdonnanceVo} from "../../../../controller/model/Ordonnance.model";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";
import {MedicamentVo} from "../../../../controller/model/Medicament.model";
import {PrescriptionVo} from "../../../../controller/model/Prescription.model";
import {MedicamentService} from "../../../../controller/service/Medicament.service";
import {ConsultationService} from "../../../../controller/service/Consultation.service";
import {OrdonnanceService} from "../../../../controller/service/Ordonnance.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {PrescriptionService} from "../../../../controller/service/Prescription.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-prescription-view',
  templateUrl: './prescription-view.component.html',
  styleUrls: ['./prescription-view.component.scss']
})
export class PrescriptionViewComponent implements OnInit {

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

    hideViewDialog() {
        this.viewPrescriptionDialog = false;
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

    get viewPrescriptionDialog(): boolean {
        return this.prescriptionService.viewPrescriptionDialog;

    }

    set viewPrescriptionDialog(value: boolean) {
        this.prescriptionService.viewPrescriptionDialog = value;
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

    get editConsultationDialog(): boolean {
        return this.consultationService.editConsultationDialog;
    }

    set editConsultationDialog(value: boolean) {
        this.consultationService.editConsultationDialog = value;
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

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

}
