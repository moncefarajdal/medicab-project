import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {CertificatVo} from "../../../../controller/model/Certificat.model";
import {PatientService} from "../../../../controller/service/Patient.service";
import {ExportService} from "../../../../controller/service/Export.service";
import {AuthService} from "../../../../controller/service/Auth.service";
import {Router} from "@angular/router";
import {RoleService} from "../../../../controller/service/role.service";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {CertificatService} from "../../../../controller/service/Certificat.service";
import {DatePipe} from "@angular/common";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";

@Component({
    selector: 'app-certificat-list',
    templateUrl: './certificat-list.component.html',
    styleUrls: ['./certificat-list.component.scss']
})
export class CertificatListComponent implements OnInit {

    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Certificat';
    yesOrNoArchive: any[] = [];
    patients: Array<PatientVo>;

    selectedCertificats: CertificatVo[];
    deleteCertificatsDialog: boolean = false;


    constructor(private datePipe: DatePipe, private certificatService: CertificatService,
                private messageService: MessageService, private confirmationService: ConfirmationService,
                private roleService: RoleService, private router: Router, private authService: AuthService,
                private exportService: ExportService, private patientService: PatientService) {
    }

    ngOnInit(): void {
        this.loadCertificats();
        this.initExport();
        this.initCol();
        this.loadPatient();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    public async loadCertificats() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Certificat', 'list');
        isPermistted ? this.certificatService.findAll().subscribe(certificats => this.certificats = certificats, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public async deleteSelectedCertificats() {
        const isPermistted = await this.roleService.isPermitted('Certificat', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer ces certificats ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.selectedCertificats.forEach( (e) => {
                            this.certificatService.delete(e).subscribe(status => {
                                if (status > 0) {
                                    const position = this.certificats.indexOf(e);
                                    position > -1 ? this.certificats.splice(position, 1) : false;
                                }
                            }, error => console.log(error));
                        }
                    )
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }


    public searchRequest() {
        this.certificatService.findByCriteria(this.searchCertificat).subscribe(certificats => {

            this.certificats = certificats;
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'commentaire', header: 'Commentaire'},
            {field: 'nbreJours', header: 'Nbre jours'},
            {field: 'dateDebut', header: 'Date debut'},
            {field: 'dateFin', header: 'Date fin'},
            {field: 'patient?.cin', header: 'Patient'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editCertificat(certificat: CertificatVo) {
        const isPermistted = await this.roleService.isPermitted('Certificat', 'edit');
        if (isPermistted) {
            this.certificatService.findByIdWithAssociatedList(certificat).subscribe(res => {
                this.selectedCertificat = res;
                this.selectedCertificat.dateDebut = new Date(certificat.dateDebut);
                this.selectedCertificat.dateFin = new Date(certificat.dateFin);
                this.selectedCertificat.dateArchivage = new Date(certificat.dateArchivage);
                this.selectedCertificat.dateCreation = new Date(certificat.dateCreation);
                this.editCertificatDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }


    public async viewCertificat(certificat: CertificatVo) {
        const isPermistted = await this.roleService.isPermitted('Certificat', 'view');
        if (isPermistted) {
            this.certificatService.findByIdWithAssociatedList(certificat).subscribe(res => {
                this.selectedCertificat = res;
                this.selectedCertificat.dateDebut = new Date(certificat.dateDebut);
                this.selectedCertificat.dateFin = new Date(certificat.dateFin);
                this.selectedCertificat.dateArchivage = new Date(certificat.dateArchivage);
                this.selectedCertificat.dateCreation = new Date(certificat.dateCreation);
                this.viewCertificatDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateCertificat(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedCertificat = new CertificatVo();
            this.createCertificatDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async archiverCertificat(certificat: CertificatVo) {
        const isPermistted = await this.roleService.isPermitted('Certificat', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous archiver cet élément (Certificat) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.certificatService.archiver(certificat).subscribe(status => {
                        const myIndex = this.certificats.indexOf(certificat);
                        this.certificats[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Certificat archivé',
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

    public async desarchiverCertificat(certificat: CertificatVo) {
        const isPermistted = await this.roleService.isPermitted('Certificat', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous désarchiver cet élément (Certificat) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.certificatService.desarchiver(certificat).subscribe(status => {
                        const myIndex = this.certificats.indexOf(certificat);
                        this.certificats[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Certificat désarchivé',
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


    public async deleteCertificat(certificat: CertificatVo) {
        const isPermistted = await this.roleService.isPermitted('Certificat', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Certificat) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.certificatService.delete(certificat).subscribe(status => {
                        if (status > 0) {
                            const position = this.certificats.indexOf(certificat);
                            position > -1 ? this.certificats.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Certificat Supprimé',
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

    public async loadPatient() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Certificat', 'list');
        isPermistted ? this.patientService.findAll().subscribe(patients => this.patients = patients, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateCertificat(certificat: CertificatVo) {

        this.certificatService.findByIdWithAssociatedList(certificat).subscribe(
            res => {
                this.initDuplicateCertificat(res);
                this.selectedCertificat = res;
                this.selectedCertificat.id = null;
                this.createCertificatDialog = true;

            });

    }

    initDuplicateCertificat(res: CertificatVo) {


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
        this.exportData = this.certificats.map(e => {
            return {
                'Reference': e.reference,
                'Commentaire': e.commentaire,
                'Nbre jours': e.nbreJours,
                'Date debut': this.datePipe.transform(e.dateDebut, 'dd-MM-yyyy'),
                'Date fin': this.datePipe.transform(e.dateFin, 'dd-MM-yyyy'),
                'Patient': e.patientVo?.cin,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd-MM-yyyy'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd-MM-yyyy'),
            };
        });

        this.criteriaData = [{
            'Reference': this.searchCertificat.reference ? this.searchCertificat.reference : environment.emptyForExport,
            'Commentaire': this.searchCertificat.commentaire ? this.searchCertificat.commentaire : environment.emptyForExport,
            'Nbre jours Min': this.searchCertificat.nbreJoursMin ? this.searchCertificat.nbreJoursMin : environment.emptyForExport,
            'Nbre jours Max': this.searchCertificat.nbreJoursMax ? this.searchCertificat.nbreJoursMax : environment.emptyForExport,
            'Date debut Min': this.searchCertificat.dateDebutMin ? this.datePipe.transform(this.searchCertificat.dateDebutMin, this.dateFormat) : environment.emptyForExport,
            'Date debut Max': this.searchCertificat.dateDebutMax ? this.datePipe.transform(this.searchCertificat.dateDebutMax, this.dateFormat) : environment.emptyForExport,
            'Date fin Min': this.searchCertificat.dateFinMin ? this.datePipe.transform(this.searchCertificat.dateFinMin, this.dateFormat) : environment.emptyForExport,
            'Date fin Max': this.searchCertificat.dateFinMax ? this.datePipe.transform(this.searchCertificat.dateFinMax, this.dateFormat) : environment.emptyForExport,
            'Patient': this.searchCertificat.patientVo?.cin ? this.searchCertificat.patientVo?.cin : environment.emptyForExport,
            'Archive': this.searchCertificat.archive ? (this.searchCertificat.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchCertificat.dateArchivageMin ? this.datePipe.transform(this.searchCertificat.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchCertificat.dateArchivageMax ? this.datePipe.transform(this.searchCertificat.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchCertificat.dateCreationMin ? this.datePipe.transform(this.searchCertificat.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchCertificat.dateCreationMax ? this.datePipe.transform(this.searchCertificat.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get certificats(): Array<CertificatVo> {
        return this.certificatService.certificats;
    }

    set certificats(value: Array<CertificatVo>) {
        this.certificatService.certificats = value;
    }

    get certificatSelections(): Array<CertificatVo> {
        return this.certificatService.certificatSelections;
    }

    set certificatSelections(value: Array<CertificatVo>) {
        this.certificatService.certificatSelections = value;
    }


    get selectedCertificat(): CertificatVo {
        return this.certificatService.selectedCertificat;
    }

    set selectedCertificat(value: CertificatVo) {
        this.certificatService.selectedCertificat = value;
    }

    get createCertificatDialog(): boolean {
        return this.certificatService.createCertificatDialog;
    }

    set createCertificatDialog(value: boolean) {
        this.certificatService.createCertificatDialog = value;
    }

    get editCertificatDialog(): boolean {
        return this.certificatService.editCertificatDialog;
    }

    set editCertificatDialog(value: boolean) {
        this.certificatService.editCertificatDialog = value;
    }

    get viewCertificatDialog(): boolean {
        return this.certificatService.viewCertificatDialog;
    }

    set viewCertificatDialog(value: boolean) {
        this.certificatService.viewCertificatDialog = value;
    }

    get searchCertificat(): CertificatVo {
        return this.certificatService.searchCertificat;
    }

    set searchCertificat(value: CertificatVo) {
        this.certificatService.searchCertificat = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
