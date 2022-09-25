import { Component, OnInit } from '@angular/core';
import {OrdonnanceVo} from "../../../../controller/model/Ordonnance.model";
import {environment} from "../../../../../environments/environment";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";
import {DatePipe} from "@angular/common";
import {OrdonnanceService} from "../../../../controller/service/Ordonnance.service";
import {RoleService} from "../../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../controller/service/Auth.service";
import {ExportService} from "../../../../controller/service/Export.service";
import {ConsultationService} from "../../../../controller/service/Consultation.service";

@Component({
  selector: 'app-ordonnance-list',
  templateUrl: './ordonnance-list.component.html',
  styleUrls: ['./ordonnance-list.component.scss']
})
export class OrdonnanceListComponent implements OnInit {

    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Ordonnance';
    name = "Ordonnance";
    yesOrNoArchive: any[] = [];
    consultations: Array<ConsultationVo>;

    constructor(private datePipe: DatePipe, private ordonnanceService: OrdonnanceService,
                private messageService: MessageService, private confirmationService: ConfirmationService,
                private roleService: RoleService, private router: Router, private authService: AuthService,
                private exportService: ExportService, private consultationService: ConsultationService) {
    }

    ngOnInit(): void {
        this.loadOrdonnances();
        this.initExport();
        this.initCol();
        this.loadConsultation();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }


    public async loadOrdonnances() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Ordonnance', 'list');
        isPermistted ? this.ordonnanceService.findAll().subscribe(ordonnances => this.ordonnances = ordonnances, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.ordonnanceService.findByCriteria(this.searchOrdonnance).subscribe(ordonnances => {

            this.ordonnances = ordonnances;
            // this.searchOrdonnance = new OrdonnanceVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'dateOrdonnance', header: 'Date ordonnance'},
            {field: 'consultation?.reference', header: 'Consultation'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editOrdonnance(ordonnance: OrdonnanceVo) {
        const isPermistted = await this.roleService.isPermitted('Ordonnance', 'edit');
        if (isPermistted) {
            this.ordonnanceService.findByIdWithAssociatedList(ordonnance).subscribe(res => {
                this.selectedOrdonnance = res;
                this.selectedOrdonnance.dateOrdonnance = new Date(ordonnance.dateOrdonnance);
                this.selectedOrdonnance.dateArchivage = new Date(ordonnance.dateArchivage);
                this.selectedOrdonnance.dateCreation = new Date(ordonnance.dateCreation);
                this.editOrdonnanceDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewOrdonnance(ordonnance: OrdonnanceVo) {
        const isPermistted = await this.roleService.isPermitted('Ordonnance', 'view');
        if (isPermistted) {
            this.ordonnanceService.findByIdWithAssociatedList(ordonnance).subscribe(res => {
                this.selectedOrdonnance = res;
                this.selectedOrdonnance.dateOrdonnance = new Date(ordonnance.dateOrdonnance);
                this.selectedOrdonnance.dateArchivage = new Date(ordonnance.dateArchivage);
                this.selectedOrdonnance.dateCreation = new Date(ordonnance.dateCreation);
                this.viewOrdonnanceDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateOrdonnance(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedOrdonnance = new OrdonnanceVo();
            this.createOrdonnanceDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async archiverOrdonnance(ordonnance: OrdonnanceVo) {
        const isPermistted = await this.roleService.isPermitted('Ordonnance', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous archiver cet élément (Ordonnance) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.ordonnanceService.archiver(ordonnance).subscribe(status => {
                        const myIndex = this.ordonnances.indexOf(ordonnance);
                        this.ordonnances[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Ordonnance archivé',
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

    public async desarchiverOrdonnance(ordonnance: OrdonnanceVo) {
        const isPermistted = await this.roleService.isPermitted('Ordonnance', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous désarchiver cet élément (Ordonnance) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.ordonnanceService.desarchiver(ordonnance).subscribe(status => {
                        const myIndex = this.ordonnances.indexOf(ordonnance);
                        this.ordonnances[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Ordonnance désarchivé',
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


    public async deleteOrdonnance(ordonnance: OrdonnanceVo) {
        const isPermistted = await this.roleService.isPermitted('Ordonnance', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Ordonnance) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.ordonnanceService.delete(ordonnance).subscribe(status => {
                        if (status > 0) {
                            const position = this.ordonnances.indexOf(ordonnance);
                            position > -1 ? this.ordonnances.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Ordonnance Supprimé',
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

    public async loadConsultation() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Ordonnance', 'list');
        isPermistted ? this.consultationService.findAll().subscribe(consultations => this.consultations = consultations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateOrdonnance(ordonnance: OrdonnanceVo) {

        this.ordonnanceService.findByIdWithAssociatedList(ordonnance).subscribe(
            res => {
                this.initDuplicateOrdonnance(res);
                this.selectedOrdonnance = res;
                this.selectedOrdonnance.id = null;
                this.createOrdonnanceDialog = true;

            });

    }

    initDuplicateOrdonnance(res: OrdonnanceVo) {
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
        this.exportData = this.ordonnances.map(e => {
            return {
                'Reference': e.reference,
                'Description': e.description,
                'Date ordonnance': this.datePipe.transform(e.dateOrdonnance, 'dd-MM-yyyy'),
                'Consultation': e.consultationVo?.reference,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd-MM-yyyy'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd-MM-yyyy'),
            };
        });

        this.criteriaData = [{
            'Reference': this.searchOrdonnance.reference ? this.searchOrdonnance.reference : environment.emptyForExport,
            'Description': this.searchOrdonnance.description ? this.searchOrdonnance.description : environment.emptyForExport,
            'Date ordonnance Min': this.searchOrdonnance.dateOrdonnanceMin ? this.datePipe.transform(this.searchOrdonnance.dateOrdonnanceMin, this.dateFormat) : environment.emptyForExport,
            'Date ordonnance Max': this.searchOrdonnance.dateOrdonnanceMax ? this.datePipe.transform(this.searchOrdonnance.dateOrdonnanceMax, this.dateFormat) : environment.emptyForExport,
            'Consultation': this.searchOrdonnance.consultationVo?.reference ? this.searchOrdonnance.consultationVo?.reference : environment.emptyForExport,
            'Archive': this.searchOrdonnance.archive ? (this.searchOrdonnance.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchOrdonnance.dateArchivageMin ? this.datePipe.transform(this.searchOrdonnance.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchOrdonnance.dateArchivageMax ? this.datePipe.transform(this.searchOrdonnance.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchOrdonnance.dateCreationMin ? this.datePipe.transform(this.searchOrdonnance.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchOrdonnance.dateCreationMax ? this.datePipe.transform(this.searchOrdonnance.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get ordonnances(): Array<OrdonnanceVo> {
        return this.ordonnanceService.ordonnances;
    }

    set ordonnances(value: Array<OrdonnanceVo>) {
        this.ordonnanceService.ordonnances = value;
    }

    get ordonnanceSelections(): Array<OrdonnanceVo> {
        return this.ordonnanceService.ordonnanceSelections;
    }

    set ordonnanceSelections(value: Array<OrdonnanceVo>) {
        this.ordonnanceService.ordonnanceSelections = value;
    }


    get selectedOrdonnance(): OrdonnanceVo {
        return this.ordonnanceService.selectedOrdonnance;
    }

    set selectedOrdonnance(value: OrdonnanceVo) {
        this.ordonnanceService.selectedOrdonnance = value;
    }

    get createOrdonnanceDialog(): boolean {
        return this.ordonnanceService.createOrdonnanceDialog;
    }

    set createOrdonnanceDialog(value: boolean) {
        this.ordonnanceService.createOrdonnanceDialog = value;
    }

    get editOrdonnanceDialog(): boolean {
        return this.ordonnanceService.editOrdonnanceDialog;
    }

    set editOrdonnanceDialog(value: boolean) {
        this.ordonnanceService.editOrdonnanceDialog = value;
    }

    get viewOrdonnanceDialog(): boolean {
        return this.ordonnanceService.viewOrdonnanceDialog;
    }

    set viewOrdonnanceDialog(value: boolean) {
        this.ordonnanceService.viewOrdonnanceDialog = value;
    }

    get searchOrdonnance(): OrdonnanceVo {
        return this.ordonnanceService.searchOrdonnance;
    }

    set searchOrdonnance(value: OrdonnanceVo) {
        this.ordonnanceService.searchOrdonnance = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
