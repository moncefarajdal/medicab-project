import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {TypeConsultationVo} from "../../../controller/model/TypeConsultation.model";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";
import {TypeConsultationService} from "../../../controller/service/TypeConsultation.service";
import {AuthService} from "../../../controller/service/Auth.service";
import {ExportService} from "../../../controller/service/Export.service";
import {Router} from "@angular/router";
import {RoleService} from "../../../controller/service/role.service";

@Component({
    selector: 'app-type-consultation',
    templateUrl: './type-consultation.component.html',
    styleUrls: ['./type-consultation.component.scss']
})
export class TypeConsultationComponent implements OnInit {

    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeConsultation';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private typeConsultationService: TypeConsultationService,
                private messageService: MessageService, private confirmationService: ConfirmationService,
                private roleService: RoleService, private router: Router, private authService: AuthService,
                private exportService: ExportService) {
    }

    ngOnInit(): void {
        this.loadTypeConsultations();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    public async loadTypeConsultations() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeConsultation', 'list');
        isPermistted ? this.typeConsultationService.findAll().subscribe(typeConsultations => this.typeConsultations = typeConsultations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.typeConsultationService.findByCriteria(this.searchTypeConsultation).subscribe(typeConsultations => {

            this.typeConsultations = typeConsultations;
            // this.searchTypeConsultation = new TypeConsultationVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'code', header: 'Code'},
            {field: 'tarif', header: 'Tarif'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editTypeConsultation(typeConsultation: TypeConsultationVo) {
        const isPermistted = await this.roleService.isPermitted('TypeConsultation', 'edit');
        if (isPermistted) {
            this.typeConsultationService.findByIdWithAssociatedList(typeConsultation).subscribe(res => {
                this.selectedTypeConsultation = res;
                this.selectedTypeConsultation.dateArchivage = new Date(typeConsultation.dateArchivage);
                this.selectedTypeConsultation.dateCreation = new Date(typeConsultation.dateCreation);
                this.editTypeConsultationDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

    public async viewTypeConsultation(typeConsultation: TypeConsultationVo) {
        const isPermistted = await this.roleService.isPermitted('TypeConsultation', 'view');
        if (isPermistted) {
            this.typeConsultationService.findByIdWithAssociatedList(typeConsultation).subscribe(res => {
                this.selectedTypeConsultation = res;
                this.selectedTypeConsultation.dateArchivage = new Date(typeConsultation.dateArchivage);
                this.selectedTypeConsultation.dateCreation = new Date(typeConsultation.dateCreation);
                this.viewTypeConsultationDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async openCreateTypeConsultation(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedTypeConsultation = new TypeConsultationVo();
            this.createTypeConsultationDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async archiverTypeConsultation(typeConsultation: TypeConsultationVo) {
        const isPermistted = await this.roleService.isPermitted('TypeConsultation', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous archiver cet élément (Type consultation) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.typeConsultationService.archiver(typeConsultation).subscribe(status => {
                        const myIndex = this.typeConsultations.indexOf(typeConsultation);
                        this.typeConsultations[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Type consultation archivé',
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

    public async desarchiverTypeConsultation(typeConsultation: TypeConsultationVo) {
        const isPermistted = await this.roleService.isPermitted('TypeConsultation', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous désarchiver cet élément (Type consultation) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.typeConsultationService.desarchiver(typeConsultation).subscribe(status => {
                        const myIndex = this.typeConsultations.indexOf(typeConsultation);
                        this.typeConsultations[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Type consultation désarchivé',
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

    public async deleteTypeConsultation(typeConsultation: TypeConsultationVo) {
        const isPermistted = await this.roleService.isPermitted('TypeConsultation', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Type consultation) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.typeConsultationService.delete(typeConsultation).subscribe(status => {
                        if (status > 0) {
                            const position = this.typeConsultations.indexOf(typeConsultation);
                            position > -1 ? this.typeConsultations.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Type consultation Supprimé',
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

    public async duplicateTypeConsultation(typeConsultation: TypeConsultationVo) {

        this.typeConsultationService.findByIdWithAssociatedList(typeConsultation).subscribe(
            res => {
                this.initDuplicateTypeConsultation(res);
                this.selectedTypeConsultation = res;
                this.selectedTypeConsultation.id = null;
                this.createTypeConsultationDialog = true;

            });
    }

    initDuplicateTypeConsultation(res: TypeConsultationVo) {
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
        this.exportData = this.typeConsultations.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Tarif': e.tarif,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd-MM-yyyy'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd-MM-yyyy'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchTypeConsultation.libelle ? this.searchTypeConsultation.libelle : environment.emptyForExport,
            'Code': this.searchTypeConsultation.code ? this.searchTypeConsultation.code : environment.emptyForExport,
            'Tarif Min': this.searchTypeConsultation.tarifMin ? this.searchTypeConsultation.tarifMin : environment.emptyForExport,
            'Tarif Max': this.searchTypeConsultation.tarifMax ? this.searchTypeConsultation.tarifMax : environment.emptyForExport,
            'Archive': this.searchTypeConsultation.archive ? (this.searchTypeConsultation.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchTypeConsultation.dateArchivageMin ? this.datePipe.transform(this.searchTypeConsultation.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchTypeConsultation.dateArchivageMax ? this.datePipe.transform(this.searchTypeConsultation.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchTypeConsultation.dateCreationMin ? this.datePipe.transform(this.searchTypeConsultation.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchTypeConsultation.dateCreationMax ? this.datePipe.transform(this.searchTypeConsultation.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];
    }

    // getters and setters

    get typeConsultations(): Array<TypeConsultationVo> {
        return this.typeConsultationService.typeConsultations;
    }

    set typeConsultations(value: Array<TypeConsultationVo>) {
        this.typeConsultationService.typeConsultations = value;
    }

    get typeConsultationSelections(): Array<TypeConsultationVo> {
        return this.typeConsultationService.typeConsultationSelections;
    }

    set typeConsultationSelections(value: Array<TypeConsultationVo>) {
        this.typeConsultationService.typeConsultationSelections = value;
    }


    get selectedTypeConsultation(): TypeConsultationVo {
        return this.typeConsultationService.selectedTypeConsultation;
    }

    set selectedTypeConsultation(value: TypeConsultationVo) {
        this.typeConsultationService.selectedTypeConsultation = value;
    }

    get createTypeConsultationDialog(): boolean {
        return this.typeConsultationService.createTypeConsultationDialog;
    }

    set createTypeConsultationDialog(value: boolean) {
        this.typeConsultationService.createTypeConsultationDialog = value;
    }

    get editTypeConsultationDialog(): boolean {
        return this.typeConsultationService.editTypeConsultationDialog;
    }

    set editTypeConsultationDialog(value: boolean) {
        this.typeConsultationService.editTypeConsultationDialog = value;
    }

    get viewTypeConsultationDialog(): boolean {
        return this.typeConsultationService.viewTypeConsultationDialog;
    }

    set viewTypeConsultationDialog(value: boolean) {
        this.typeConsultationService.viewTypeConsultationDialog = value;
    }

    get searchTypeConsultation(): TypeConsultationVo {
        return this.typeConsultationService.searchTypeConsultation;
    }

    set searchTypeConsultation(value: TypeConsultationVo) {
        this.typeConsultationService.searchTypeConsultation = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }
}
