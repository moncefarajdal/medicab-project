import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";
import {TypeConsultationVo} from "../../../../controller/model/TypeConsultation.model";
import {MutuelleVo} from "../../../../controller/model/Mutuelle.model";
import {DatePipe} from "@angular/common";
import {ConsultationService} from "../../../../controller/service/Consultation.service";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {RoleService} from "../../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../controller/service/Auth.service";
import {ExportService} from "../../../../controller/service/Export.service";
import {TypeConsultationService} from "../../../../controller/service/TypeConsultation.service";
import {PatientService} from "../../../../controller/service/Patient.service";
import {MutuelleService} from "../../../../controller/service/Mutuelle.service";

@Component({
    selector: 'app-consultation-medecin-list',
    templateUrl: './consultation-medecin-list.component.html',
    styleUrls: ['./consultation-medecin-list.component.scss']
})
export class ConsultationMedecinListComponent implements OnInit {

    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Consultation';
    yesOrNoMutualise: any[] = [];
    yesOrNoArchive: any[] = [];
    typeConsultations: Array<TypeConsultationVo>;
    patients: Array<PatientVo>;
    mutuelles: Array<MutuelleVo>;

    constructor(private datePipe: DatePipe, private consultationService: ConsultationService,
                private messageService: MessageService, private confirmationService: ConfirmationService,
                private roleService: RoleService, private router: Router, private authService: AuthService,
                private exportService: ExportService, private typeConsultationService: TypeConsultationService,
                private patientService: PatientService, private mutuelleService: MutuelleService) {
    }

    ngOnInit(): void {
        this.loadConsultations();
        this.initExport();
        this.initCol();
        this.loadTypeConsultation();
        this.loadPatient();
        this.loadMutuelle();
        this.yesOrNoMutualise = [{label: 'Mutualise', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadConsultations() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Consultation', 'list');
        isPermistted ? this.consultationService.findAll().subscribe(consultations => this.consultations = consultations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.consultationService.findByCriteria(this.searchConsultation).subscribe(consultations => {

            this.consultations = consultations;
            // this.searchConsultation = new ConsultationVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'dateConsultation', header: 'Date consultation'},
            {field: 'typeConsultation?.libelle', header: 'Type consultation'},
            {field: 'patient?.cin', header: 'Patient'},
            {field: 'tarif', header: 'Tarif'},
            {field: 'mutualise', header: 'Mutualise'},
            {field: 'mutuelle?.code', header: 'Mutuelle'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editConsultation(consultation: ConsultationVo) {
        const isPermistted = await this.roleService.isPermitted('Consultation', 'edit');
        if (isPermistted) {
            this.consultationService.findByIdWithAssociatedList(consultation).subscribe(res => {
                this.selectedConsultation = res;
                this.selectedConsultation.dateConsultation = new Date(consultation.dateConsultation);
                this.selectedConsultation.dateArchivage = new Date(consultation.dateArchivage);
                this.selectedConsultation.dateCreation = new Date(consultation.dateCreation);
                this.editConsultationDialog = true;
                this.selectedConsultation.tarif = 0;
                console.log(this.selectedConsultation.tarif);
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

    public async viewConsultation(consultation: ConsultationVo) {
        const isPermistted = await this.roleService.isPermitted('Consultation', 'view');
        if (isPermistted) {
            this.consultationService.findByIdWithAssociatedList(consultation).subscribe(res => {
                this.selectedConsultation = res;
                this.selectedConsultation.dateConsultation = new Date(consultation.dateConsultation);
                this.selectedConsultation.dateArchivage = new Date(consultation.dateArchivage);
                this.selectedConsultation.dateCreation = new Date(consultation.dateCreation);
                this.viewConsultationDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async openCreateConsultation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedConsultation = new ConsultationVo();
            this.createConsultationDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async archiverConsultation(consultation: ConsultationVo) {
        const isPermistted = await this.roleService.isPermitted('Consultation', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous archiver cet élément (Consultation) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.consultationService.archiver(consultation).subscribe(status => {
                        const myIndex = this.consultations.indexOf(consultation);
                        this.consultations[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Consultation archivé',
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

    public async desarchiverConsultation(consultation: ConsultationVo) {
        const isPermistted = await this.roleService.isPermitted('Consultation', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous désarchiver cet élément (Consultation) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.consultationService.desarchiver(consultation).subscribe(status => {
                        const myIndex = this.consultations.indexOf(consultation);
                        this.consultations[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Consultation désarchivé',
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


    public async deleteConsultation(consultation: ConsultationVo) {
        const isPermistted = await this.roleService.isPermitted('Consultation', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Consultation) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.consultationService.delete(consultation).subscribe(status => {
                        if (status > 0) {
                            const position = this.consultations.indexOf(consultation);
                            position > -1 ? this.consultations.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Consultation Supprimé',
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

    public async loadTypeConsultation() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Consultation', 'list');
        isPermistted ? this.typeConsultationService.findAll().subscribe(typeConsultations => this.typeConsultations = typeConsultations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadPatient() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Consultation', 'list');
        isPermistted ? this.patientService.findAll().subscribe(patients => this.patients = patients, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadMutuelle() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Consultation', 'list');
        isPermistted ? this.mutuelleService.findAll().subscribe(mutuelles => this.mutuelles = mutuelles, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateConsultation(consultation: ConsultationVo) {

        this.consultationService.findByIdWithAssociatedList(consultation).subscribe(
            res => {
                this.initDuplicateConsultation(res);
                this.selectedConsultation = res;
                this.selectedConsultation.id = null;
                this.createConsultationDialog = true;

            });

    }

    initDuplicateConsultation(res: ConsultationVo) {
        if (res.paiementsVo != null) {
            res.paiementsVo.forEach(d => {
                d.consultationVo = null;
                d.id = null;
            });
        }
        if (res.ordonnancesVo != null) {
            res.ordonnancesVo.forEach(d => {
                d.consultationVo = null;
                d.id = null;
            });
        }
        if (res.constanteConsultationsVo != null) {
            res.constanteConsultationsVo.forEach(d => {
                d.consultationVo = null;
                d.id = null;
            });
        }
        if (res.prescriptionsVo != null) {
            res.prescriptionsVo.forEach(d => {
                d.consultationVo = null;
                d.id = null;
            });
        }


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
        this.exportData = this.consultations.map(e => {
            return {
                'Reference': e.reference,
                'Date consultation': this.datePipe.transform(e.dateConsultation, 'dd-MM-yyyy'),
                'Type consultation': e.typeConsultationVo?.libelle,
                'Patient': e.patientVo?.cin,
                'Tarif': e.tarif,
                'Mutualise': e.mutualise ? 'Vrai' : 'Faux',
                'Mutuelle': e.mutuelleVo?.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd-MM-yyyy'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd-MM-yyyy'),
            };
        });

        this.criteriaData = [{
            'Reference': this.searchConsultation.reference ? this.searchConsultation.reference : environment.emptyForExport,
            'Date consultation Min': this.searchConsultation.dateConsultationMin ? this.datePipe.transform(this.searchConsultation.dateConsultationMin, this.dateFormat) : environment.emptyForExport,
            'Date consultation Max': this.searchConsultation.dateConsultationMax ? this.datePipe.transform(this.searchConsultation.dateConsultationMax, this.dateFormat) : environment.emptyForExport,
            'Type consultation': this.searchConsultation.typeConsultationVo?.libelle ? this.searchConsultation.typeConsultationVo?.libelle : environment.emptyForExport,
            'Patient': this.searchConsultation.patientVo?.cin ? this.searchConsultation.patientVo?.cin : environment.emptyForExport,
            'Tarif Min': this.searchConsultation.tarifMin ? this.searchConsultation.tarifMin : environment.emptyForExport,
            'Tarif Max': this.searchConsultation.tarifMax ? this.searchConsultation.tarifMax : environment.emptyForExport,
            'Mutualise': this.searchConsultation.mutualise ? (this.searchConsultation.mutualise ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Mutuelle': this.searchConsultation.mutuelleVo?.code ? this.searchConsultation.mutuelleVo?.code : environment.emptyForExport,
            'Archive': this.searchConsultation.archive ? (this.searchConsultation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchConsultation.dateArchivageMin ? this.datePipe.transform(this.searchConsultation.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchConsultation.dateArchivageMax ? this.datePipe.transform(this.searchConsultation.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchConsultation.dateCreationMin ? this.datePipe.transform(this.searchConsultation.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchConsultation.dateCreationMax ? this.datePipe.transform(this.searchConsultation.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get consultations(): Array<ConsultationVo> {
        return this.consultationService.consultations;
    }

    set consultations(value: Array<ConsultationVo>) {
        this.consultationService.consultations = value;
    }

    get consultationSelections(): Array<ConsultationVo> {
        return this.consultationService.consultationSelections;
    }

    set consultationSelections(value: Array<ConsultationVo>) {
        this.consultationService.consultationSelections = value;
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

    get editConsultationDialog(): boolean {
        return this.consultationService.editConsultationDialog;
    }

    set editConsultationDialog(value: boolean) {
        this.consultationService.editConsultationDialog = value;
    }

    get viewConsultationDialog(): boolean {
        return this.consultationService.viewConsultationDialog;
    }

    set viewConsultationDialog(value: boolean) {
        this.consultationService.viewConsultationDialog = value;
    }

    get searchConsultation(): ConsultationVo {
        return this.consultationService.searchConsultation;
    }

    set searchConsultation(value: ConsultationVo) {
        this.consultationService.searchConsultation = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
