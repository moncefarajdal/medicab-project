import {Component, OnInit} from '@angular/core';
import {PatientVo} from "../../../controller/model/Patient.model";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";
import {RdvService} from "../../../controller/service/Rdv.service";
import {RoleService} from "../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../controller/service/Auth.service";
import {ExportService} from "../../../controller/service/Export.service";
import {PatientService} from "../../../controller/service/Patient.service";
import {environment} from "../../../../environments/environment";
import {RdvVo} from "../../../controller/model/Rdv.model";
import {ConsultationVo} from "../../../controller/model/Consultation.model";

@Component({
    selector: 'app-rdv',
    templateUrl: './rdv.component.html',
    styleUrls: ['./rdv.component.scss']
})
export class RdvComponent implements OnInit {

    // Declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Rdv';
    yesOrNoPresence: any[] = [];
    yesOrNoArchive: any[] = [];
    patients: Array<PatientVo>;

    selectedRdvs: RdvVo[];
    deleteRdvsDialog: boolean = false;

    constructor(private datePipe: DatePipe, private rdvService: RdvService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private patientService: PatientService) {
    }

    ngOnInit(): void {
        this.loadRdvs();
        this.initExport();
        this.initCol();
        this.loadPatient();
        this.yesOrNoPresence = [{label: 'Presence', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods

    public async loadRdvs() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Rdv', 'list');
        isPermistted ? this.rdvService.findAll().subscribe(rdvs => this.rdvs = rdvs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public async deleteSelectedRdvs() {
        const isPermistted = await this.roleService.isPermitted('Consultation', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer ces consultations ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.selectedRdvs.forEach( (e) => {
                            this.rdvService.delete(e).subscribe(status => {
                                if (status > 0) {
                                    const position = this.rdvs.indexOf(e);
                                    position > -1 ? this.rdvs.splice(position, 1) : false;
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
        this.rdvService.findByCriteria(this.searchRdv).subscribe(rdvs => {
            this.rdvs = rdvs;
            // this.searchRdv = new RdvVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'numeroRdv', header: 'Numero rdv'},
            {field: 'dateRdv', header: 'Date rdv'},
            {field: 'patient?.cin', header: 'Patient'},
            {field: 'presence', header: 'Presence'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editRdv(rdv: RdvVo) {
        const isPermistted = await this.roleService.isPermitted('Rdv', 'edit');
        if (isPermistted) {
            this.rdvService.findByIdWithAssociatedList(rdv).subscribe(res => {
                this.selectedRdv = res;
                // this.selectedRdv.dateRdv = new Date(rdv.dateRdv);
                this.selectedRdv.dateArchivage = new Date(rdv.dateArchivage);
                this.selectedRdv.dateCreation = new Date(rdv.dateCreation);
                this.editRdvDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

    public async viewRdv(rdv: RdvVo) {
        const isPermistted = await this.roleService.isPermitted('Rdv', 'view');
        if (isPermistted) {
            this.rdvService.findByIdWithAssociatedList(rdv).subscribe(res => {
                this.selectedRdv = res;
                // this.selectedRdv.dateRdv = new Date(rdv.dateRdv);
                this.selectedRdv.dateArchivage = new Date(rdv.dateArchivage);
                this.selectedRdv.dateCreation = new Date(rdv.dateCreation);
                this.viewRdvDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async openCreateRdv(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedRdv = new RdvVo();
            this.createRdvDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async archiverRdv(rdv: RdvVo) {
        const isPermistted = await this.roleService.isPermitted('Rdv', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous archiver cet élément (Rdv) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.rdvService.archiver(rdv).subscribe(status => {
                        const myIndex = this.rdvs.indexOf(rdv);
                        this.rdvs[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Rdv archivé',
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

    public async desarchiverRdv(rdv: RdvVo) {
        const isPermistted = await this.roleService.isPermitted('Rdv', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous désarchiver cet élément (Rdv) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.rdvService.desarchiver(rdv).subscribe(status => {
                        const myIndex = this.rdvs.indexOf(rdv);
                        this.rdvs[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Rdv désarchivé',
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

    public async deleteRdv(rdv: RdvVo) {
        const isPermistted = await this.roleService.isPermitted('Rdv', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Rdv) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.rdvService.delete(rdv).subscribe(status => {
                        if (status > 0) {
                            const position = this.rdvs.indexOf(rdv);
                            position > -1 ? this.rdvs.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Rdv Supprimé',
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
        const isPermistted = await this.roleService.isPermitted('Rdv', 'list');
        isPermistted ? this.patientService.findAll().subscribe(patients => this.patients = patients, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});
    }

    public async duplicateRdv(rdv: RdvVo) {

        this.rdvService.findByIdWithAssociatedList(rdv).subscribe(
            res => {
                this.initDuplicateRdv(res);
                this.selectedRdv = res;
                this.selectedRdv.id = null;
                this.createRdvDialog = true;
            });
    }

    initDuplicateRdv(res: RdvVo) {
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
        this.exportData = this.rdvs.map(e => {
            return {
                'Numero rdv': e.numeroRdv,
                'Date rdv': this.datePipe.transform(e.dateRdv, 'dd-MM-yyyy'),
                'Patient': e.patientVo?.cin,
                // 'Presence': e.presence ? 'Vrai' : 'Faux',
                // 'Archive': e.archive ? 'Vrai' : 'Faux',
                // 'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd-MM-yyyy'),
                // 'Date creation': this.datePipe.transform(e.dateCreation, 'dd-MM-yyyy'),
            };
        });

        this.criteriaData = [{
            'Numero rdv': this.searchRdv.numeroRdv ? this.searchRdv.numeroRdv : environment.emptyForExport,
            'Date rdv Min': this.searchRdv.dateRdvMin ? this.datePipe.transform(this.searchRdv.dateRdvMin, this.dateFormat) : environment.emptyForExport,
            'Date rdv Max': this.searchRdv.dateRdvMax ? this.datePipe.transform(this.searchRdv.dateRdvMax, this.dateFormat) : environment.emptyForExport,
            'Patient': this.searchRdv.patientVo?.cin ? this.searchRdv.patientVo?.cin : environment.emptyForExport,
            'Presence': this.searchRdv.presence ? (this.searchRdv.presence ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Archive': this.searchRdv.archive ? (this.searchRdv.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchRdv.dateArchivageMin ? this.datePipe.transform(this.searchRdv.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchRdv.dateArchivageMax ? this.datePipe.transform(this.searchRdv.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchRdv.dateCreationMin ? this.datePipe.transform(this.searchRdv.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchRdv.dateCreationMax ? this.datePipe.transform(this.searchRdv.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get rdvs(): Array<RdvVo> {
        return this.rdvService.rdvs;
    }

    set rdvs(value: Array<RdvVo>) {
        this.rdvService.rdvs = value;
    }

    get rdvSelections(): Array<RdvVo> {
        return this.rdvService.rdvSelections;
    }

    set rdvSelections(value: Array<RdvVo>) {
        this.rdvService.rdvSelections = value;
    }

    get selectedRdv(): RdvVo {
        return this.rdvService.selectedRdv;
    }

    set selectedRdv(value: RdvVo) {
        this.rdvService.selectedRdv = value;
    }

    get createRdvDialog(): boolean {
        return this.rdvService.createRdvDialog;
    }

    set createRdvDialog(value: boolean) {
        this.rdvService.createRdvDialog = value;
    }

    get editRdvDialog(): boolean {
        return this.rdvService.editRdvDialog;
    }

    set editRdvDialog(value: boolean) {
        this.rdvService.editRdvDialog = value;
    }

    get viewRdvDialog(): boolean {
        return this.rdvService.viewRdvDialog;
    }

    set viewRdvDialog(value: boolean) {
        this.rdvService.viewRdvDialog = value;
    }

    get searchRdv(): RdvVo {
        return this.rdvService.searchRdv;
    }

    set searchRdv(value: RdvVo) {
        this.rdvService.searchRdv = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
