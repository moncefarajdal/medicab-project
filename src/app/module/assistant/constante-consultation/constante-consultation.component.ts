import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ConstanteConsultationVo} from "../../../controller/model/ConstanteConsultation.model";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {ConstanteVo} from "../../../controller/model/Constante.model";
import {ConsultationVo} from "../../../controller/model/Consultation.model";
import {DatePipe} from "@angular/common";
import {ConstanteConsultationService} from "../../../controller/service/ConstanteConsultation.service";
import {RoleService} from "../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../controller/service/Auth.service";
import {ExportService} from "../../../controller/service/Export.service";
import {ConstanteService} from "../../../controller/service/Constante.service";
import {ConsultationService} from "../../../controller/service/Consultation.service";

@Component({
  selector: 'app-constante-consultation',
  templateUrl: './constante-consultation.component.html',
  styleUrls: ['./constante-consultation.component.scss']
})
export class ConstanteConsultationComponent implements OnInit {

    // Declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'ConstanteConsultation';
    yesOrNoArchive: any[] = [];
    constantes: Array<ConstanteVo>;
    consultations: Array<ConsultationVo>;

    constructor(private datePipe: DatePipe, private constanteConsultationService: ConstanteConsultationService,
                private messageService: MessageService, private confirmationService: ConfirmationService,
                private roleService: RoleService, private router: Router, private authService: AuthService,
                private exportService: ExportService, private constanteService: ConstanteService,
                private consultationService: ConsultationService) {
    }

    ngOnInit(): void {
        this.loadConstanteConsultations();
        this.initExport();
        this.initCol();
        this.loadConstante();
        this.loadConsultation();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadConstanteConsultations() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ConstanteConsultation', 'list');
        isPermistted ? this.constanteConsultationService.findAll().subscribe(constanteConsultations => this.constanteConsultations = constanteConsultations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.constanteConsultationService.findByCriteria(this.searchConstanteConsultation).subscribe(constanteConsultations => {

            this.constanteConsultations = constanteConsultations;
            // this.searchConstanteConsultation = new ConstanteConsultationVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'constante?.libelle', header: 'Constante'},
            {field: 'valeur', header: 'Valeur'},
            {field: 'consultation?.reference', header: 'Consultation'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editConstanteConsultation(constanteConsultation: ConstanteConsultationVo) {
        const isPermistted = await this.roleService.isPermitted('ConstanteConsultation', 'edit');
        if (isPermistted) {
            this.constanteConsultationService.findByIdWithAssociatedList(constanteConsultation).subscribe(res => {
                this.selectedConstanteConsultation = res;
                this.selectedConstanteConsultation.dateArchivage = new Date(constanteConsultation.dateArchivage);
                this.selectedConstanteConsultation.dateCreation = new Date(constanteConsultation.dateCreation);
                this.editConstanteConsultationDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewConstanteConsultation(constanteConsultation: ConstanteConsultationVo) {
        const isPermistted = await this.roleService.isPermitted('ConstanteConsultation', 'view');
        if (isPermistted) {
            this.constanteConsultationService.findByIdWithAssociatedList(constanteConsultation).subscribe(res => {
                this.selectedConstanteConsultation = res;
                this.selectedConstanteConsultation.dateArchivage = new Date(constanteConsultation.dateArchivage);
                this.selectedConstanteConsultation.dateCreation = new Date(constanteConsultation.dateCreation);
                this.viewConstanteConsultationDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateConstanteConsultation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedConstanteConsultation = new ConstanteConsultationVo();
            this.createConstanteConsultationDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async archiverConstanteConsultation(constanteConsultation: ConstanteConsultationVo) {
        const isPermistted = await this.roleService.isPermitted('ConstanteConsultation', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous archiver cet élément (Constante consultation) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.constanteConsultationService.archiver(constanteConsultation).subscribe(status => {
                        const myIndex = this.constanteConsultations.indexOf(constanteConsultation);
                        this.constanteConsultations[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Constante consultation archivé',
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

    public async desarchiverConstanteConsultation(constanteConsultation: ConstanteConsultationVo) {
        const isPermistted = await this.roleService.isPermitted('ConstanteConsultation', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous désarchiver cet élément (Constante consultation) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.constanteConsultationService.desarchiver(constanteConsultation).subscribe(status => {
                        const myIndex = this.constanteConsultations.indexOf(constanteConsultation);
                        this.constanteConsultations[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Constante consultation désarchivé',
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


    public async deleteConstanteConsultation(constanteConsultation: ConstanteConsultationVo) {
        const isPermistted = await this.roleService.isPermitted('ConstanteConsultation', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Constante consultation) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.constanteConsultationService.delete(constanteConsultation).subscribe(status => {
                        if (status > 0) {
                            const position = this.constanteConsultations.indexOf(constanteConsultation);
                            position > -1 ? this.constanteConsultations.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Constante consultation Supprimé',
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

    public async loadConstante() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ConstanteConsultation', 'list');
        isPermistted ? this.constanteService.findAll().subscribe(constantes => this.constantes = constantes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});
    }

    public async loadConsultation() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('ConstanteConsultation', 'list');
        isPermistted ? this.consultationService.findAll().subscribe(consultations => this.consultations = consultations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});
    }

    public async duplicateConstanteConsultation(constanteConsultation: ConstanteConsultationVo) {

        this.constanteConsultationService.findByIdWithAssociatedList(constanteConsultation).subscribe(
            res => {
                this.initDuplicateConstanteConsultation(res);
                this.selectedConstanteConsultation = res;
                this.selectedConstanteConsultation.id = null;
                this.createConstanteConsultationDialog = true;

            });
    }

    initDuplicateConstanteConsultation(res: ConstanteConsultationVo) {
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
        this.exportData = this.constanteConsultations.map(e => {
            return {
                'Constante': e.constanteVo?.libelle,
                'Valeur': e.valeur,
                'Consultation': e.consultationVo?.reference,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd-MM-yyyy'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd-MM-yyyy'),
            };
        });

        this.criteriaData = [{
            'Constante': this.searchConstanteConsultation.constanteVo?.libelle ? this.searchConstanteConsultation.constanteVo?.libelle : environment.emptyForExport,
            'Valeur': this.searchConstanteConsultation.valeur ? this.searchConstanteConsultation.valeur : environment.emptyForExport,
            'Consultation': this.searchConstanteConsultation.consultationVo?.reference ? this.searchConstanteConsultation.consultationVo?.reference : environment.emptyForExport,
            'Archive': this.searchConstanteConsultation.archive ? (this.searchConstanteConsultation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchConstanteConsultation.dateArchivageMin ? this.datePipe.transform(this.searchConstanteConsultation.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchConstanteConsultation.dateArchivageMax ? this.datePipe.transform(this.searchConstanteConsultation.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchConstanteConsultation.dateCreationMin ? this.datePipe.transform(this.searchConstanteConsultation.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchConstanteConsultation.dateCreationMax ? this.datePipe.transform(this.searchConstanteConsultation.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get constanteConsultations(): Array<ConstanteConsultationVo> {
        return this.constanteConsultationService.constanteConsultations;
    }

    set constanteConsultations(value: Array<ConstanteConsultationVo>) {
        this.constanteConsultationService.constanteConsultations = value;
    }

    get constanteConsultationSelections(): Array<ConstanteConsultationVo> {
        return this.constanteConsultationService.constanteConsultationSelections;
    }

    set constanteConsultationSelections(value: Array<ConstanteConsultationVo>) {
        this.constanteConsultationService.constanteConsultationSelections = value;
    }


    get selectedConstanteConsultation(): ConstanteConsultationVo {
        return this.constanteConsultationService.selectedConstanteConsultation;
    }

    set selectedConstanteConsultation(value: ConstanteConsultationVo) {
        this.constanteConsultationService.selectedConstanteConsultation = value;
    }

    get createConstanteConsultationDialog(): boolean {
        return this.constanteConsultationService.createConstanteConsultationDialog;
    }

    set createConstanteConsultationDialog(value: boolean) {
        this.constanteConsultationService.createConstanteConsultationDialog = value;
    }

    get editConstanteConsultationDialog(): boolean {
        return this.constanteConsultationService.editConstanteConsultationDialog;
    }

    set editConstanteConsultationDialog(value: boolean) {
        this.constanteConsultationService.editConstanteConsultationDialog = value;
    }

    get viewConstanteConsultationDialog(): boolean {
        return this.constanteConsultationService.viewConstanteConsultationDialog;
    }

    set viewConstanteConsultationDialog(value: boolean) {
        this.constanteConsultationService.viewConstanteConsultationDialog = value;
    }

    get searchConstanteConsultation(): ConstanteConsultationVo {
        return this.constanteConsultationService.searchConstanteConsultation;
    }

    set searchConstanteConsultation(value: ConstanteConsultationVo) {
        this.constanteConsultationService.searchConstanteConsultation = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
