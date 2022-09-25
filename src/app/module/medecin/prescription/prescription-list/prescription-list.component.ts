import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {PrescriptionVo} from "../../../../controller/model/Prescription.model";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {OrdonnanceVo} from "../../../../controller/model/Ordonnance.model";
import {MedicamentVo} from "../../../../controller/model/Medicament.model";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";
import {DatePipe} from "@angular/common";
import {PrescriptionService} from "../../../../controller/service/Prescription.service";
import {RoleService} from "../../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../controller/service/Auth.service";
import {ExportService} from "../../../../controller/service/Export.service";
import {OrdonnanceService} from "../../../../controller/service/Ordonnance.service";
import {MedicamentService} from "../../../../controller/service/Medicament.service";
import {ConsultationService} from "../../../../controller/service/Consultation.service";

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.scss']
})
export class PrescriptionListComponent implements OnInit {

    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Prescription';
    yesOrNoArchive: any[] = [];
    ordonnances: Array<OrdonnanceVo>;
    medicaments: Array<MedicamentVo>;
    consultations: Array<ConsultationVo>;

    constructor(private datePipe: DatePipe, private prescriptionService: PrescriptionService,
                private messageService: MessageService, private confirmationService: ConfirmationService,
                private roleService: RoleService, private router: Router, private authService: AuthService,
                private exportService: ExportService, private ordonnanceService: OrdonnanceService,
                private medicamentService: MedicamentService, private consultationService: ConsultationService) {
    }

    ngOnInit(): void {
        this.loadPrescriptions();
        this.initExport();
        this.initCol();
        this.loadOrdonnance();
        this.loadMedicament();
        this.loadConsultation();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadPrescriptions() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Prescription', 'list');
        isPermistted ? this.prescriptionService.findAll().subscribe(prescriptions => this.prescriptions = prescriptions, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.prescriptionService.findByCriteria(this.searchPrescription).subscribe(prescriptions => {

            this.prescriptions = prescriptions;
            // this.searchPrescription = new PrescriptionVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'ordonnance?.reference', header: 'Ordonnance'},
            {field: 'medicament?.codeMedicament', header: 'Medicament'},
            {field: 'nbreFois', header: 'Nbre fois'},
            {field: 'qteMedicament', header: 'Qte medicament'},
            {field: 'formeMedicament', header: 'Forme medicament'},
            {field: 'consultation?.reference', header: 'Consultation'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editPrescription(prescription: PrescriptionVo) {
        const isPermistted = await this.roleService.isPermitted('Prescription', 'edit');
        if (isPermistted) {
            this.prescriptionService.findByIdWithAssociatedList(prescription).subscribe(res => {
                this.selectedPrescription = res;
                this.selectedPrescription.dateArchivage = new Date(prescription.dateArchivage);
                this.selectedPrescription.dateCreation = new Date(prescription.dateCreation);
                this.editPrescriptionDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewPrescription(prescription: PrescriptionVo) {
        const isPermistted = await this.roleService.isPermitted('Prescription', 'view');
        if (isPermistted) {
            this.prescriptionService.findByIdWithAssociatedList(prescription).subscribe(res => {
                this.selectedPrescription = res;
                this.selectedPrescription.dateArchivage = new Date(prescription.dateArchivage);
                this.selectedPrescription.dateCreation = new Date(prescription.dateCreation);
                this.viewPrescriptionDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreatePrescription(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedPrescription = new PrescriptionVo();
            this.createPrescriptionDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async archiverPrescription(prescription: PrescriptionVo) {
        const isPermistted = await this.roleService.isPermitted('Prescription', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous archiver cet élément (Prescription) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.prescriptionService.archiver(prescription).subscribe(status => {
                        const myIndex = this.prescriptions.indexOf(prescription);
                        this.prescriptions[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Prescription archivé',
                            life: 3000
                        });
                    }, error => console.log(error));
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public async desarchiverPrescription(prescription: PrescriptionVo) {
        const isPermistted = await this.roleService.isPermitted('Prescription', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous désarchiver cet élément (Prescription) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.prescriptionService.desarchiver(prescription).subscribe(status => {
                        const myIndex = this.prescriptions.indexOf(prescription);
                        this.prescriptions[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Prescription désarchivé',
                            life: 3000
                        });
                    }, error => console.log(error));
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }


    public async deletePrescription(prescription: PrescriptionVo) {
        const isPermistted = await this.roleService.isPermitted('Prescription', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Prescription) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.prescriptionService.delete(prescription).subscribe(status => {
                        if (status > 0) {
                            const position = this.prescriptions.indexOf(prescription);
                            position > -1 ? this.prescriptions.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Prescription Supprimé',
                                life: 3000
                            });
                        }

                    }, error => console.log(error));
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public async loadOrdonnance() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Prescription', 'list');
        isPermistted ? this.ordonnanceService.findAll().subscribe(ordonnances => this.ordonnances = ordonnances, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadMedicament() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Prescription', 'list');
        isPermistted ? this.medicamentService.findAll().subscribe(medicaments => this.medicaments = medicaments, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadConsultation() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Prescription', 'list');
        isPermistted ? this.consultationService.findAll().subscribe(consultations => this.consultations = consultations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicatePrescription(prescription: PrescriptionVo) {

        this.prescriptionService.findByIdWithAssociatedList(prescription).subscribe(
            res => {
                this.initDuplicatePrescription(res);
                this.selectedPrescription = res;
                this.selectedPrescription.id = null;
                this.createPrescriptionDialog = true;

            });

    }

    initDuplicatePrescription(res: PrescriptionVo) {


    }

    initExport(): void {
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportCSV(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportExcel(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportPdf(this.criteriaData, this.exportData, this.fileName);
                }
            }
        ];
    }


    prepareColumnExport(): void {
        this.exportData = this.prescriptions.map(e => {
            return {
                'Reference': e.reference,
                'Ordonnance': e.ordonnanceVo?.reference,
                'Medicament': e.medicamentVo?.codeMedicament,
                'Nbre fois': e.nbreFois,
                'Qte medicament': e.qteMedicament,
                'Forme medicament': e.formeMedicament,
                'Consultation': e.consultationVo?.reference,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd-MM-yyyy'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd-MM-yyyy'),
            };
        });

        this.criteriaData = [{
            'Reference': this.searchPrescription.reference ? this.searchPrescription.reference : environment.emptyForExport,
            'Ordonnance': this.searchPrescription.ordonnanceVo?.reference ? this.searchPrescription.ordonnanceVo?.reference : environment.emptyForExport,
            'Medicament': this.searchPrescription.medicamentVo?.codeMedicament ? this.searchPrescription.medicamentVo?.codeMedicament : environment.emptyForExport,
            'Nbre fois Min': this.searchPrescription.nbreFoisMin ? this.searchPrescription.nbreFoisMin : environment.emptyForExport,
            'Nbre fois Max': this.searchPrescription.nbreFoisMax ? this.searchPrescription.nbreFoisMax : environment.emptyForExport,
            'Qte medicament Min': this.searchPrescription.qteMedicamentMin ? this.searchPrescription.qteMedicamentMin : environment.emptyForExport,
            'Qte medicament Max': this.searchPrescription.qteMedicamentMax ? this.searchPrescription.qteMedicamentMax : environment.emptyForExport,
            'Forme medicament Min': this.searchPrescription.formeMedicamentMin ? this.searchPrescription.formeMedicamentMin : environment.emptyForExport,
            'Forme medicament Max': this.searchPrescription.formeMedicamentMax ? this.searchPrescription.formeMedicamentMax : environment.emptyForExport,
            'Consultation': this.searchPrescription.consultationVo?.reference ? this.searchPrescription.consultationVo?.reference : environment.emptyForExport,
            'Archive': this.searchPrescription.archive ? (this.searchPrescription.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchPrescription.dateArchivageMin ? this.datePipe.transform(this.searchPrescription.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchPrescription.dateArchivageMax ? this.datePipe.transform(this.searchPrescription.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchPrescription.dateCreationMin ? this.datePipe.transform(this.searchPrescription.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchPrescription.dateCreationMax ? this.datePipe.transform(this.searchPrescription.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get prescriptions(): Array<PrescriptionVo> {
        return this.prescriptionService.prescriptions;
    }

    set prescriptions(value: Array<PrescriptionVo>) {
        this.prescriptionService.prescriptions = value;
    }

    get prescriptionSelections(): Array<PrescriptionVo> {
        return this.prescriptionService.prescriptionSelections;
    }

    set prescriptionSelections(value: Array<PrescriptionVo>) {
        this.prescriptionService.prescriptionSelections = value;
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

    get editPrescriptionDialog(): boolean {
        return this.prescriptionService.editPrescriptionDialog;
    }

    set editPrescriptionDialog(value: boolean) {
        this.prescriptionService.editPrescriptionDialog = value;
    }

    get viewPrescriptionDialog(): boolean {
        return this.prescriptionService.viewPrescriptionDialog;
    }

    set viewPrescriptionDialog(value: boolean) {
        this.prescriptionService.viewPrescriptionDialog = value;
    }

    get searchPrescription(): PrescriptionVo {
        return this.prescriptionService.searchPrescription;
    }

    set searchPrescription(value: PrescriptionVo) {
        this.prescriptionService.searchPrescription = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
