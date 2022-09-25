import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {CategorieMedicamentVo} from "../../../../controller/model/CategorieMedicament.model";
import {DatePipe} from "@angular/common";
import {CategorieMedicamentService} from "../../../../controller/service/CategorieMedicament.service";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../controller/service/Auth.service";
import {ExportService} from "../../../../controller/service/Export.service";

@Component({
  selector: 'app-categorie-medicament-list',
  templateUrl: './categorie-medicament-list.component.html',
  styleUrls: ['./categorie-medicament-list.component.scss']
})
export class CategorieMedicamentListComponent implements OnInit {

    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CategorieMedicament';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private categorieMedicamentService: CategorieMedicamentService,
                private messageService: MessageService, private confirmationService: ConfirmationService,
                private roleService: RoleService, private router: Router, private authService: AuthService,
                private exportService: ExportService) {
    }

    ngOnInit(): void {
        this.loadCategorieMedicaments();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    public async loadCategorieMedicaments() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CategorieMedicament', 'list');
        isPermistted ? this.categorieMedicamentService.findAll().subscribe(categorieMedicaments => this.categorieMedicaments = categorieMedicaments, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.categorieMedicamentService.findByCriteria(this.searchCategorieMedicament).subscribe(categorieMedicaments => {

            this.categorieMedicaments = categorieMedicaments;
            // this.searchCategorieMedicament = new CategorieMedicamentVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'libelle', header: 'Libelle'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editCategorieMedicament(categorieMedicament: CategorieMedicamentVo) {
        const isPermistted = await this.roleService.isPermitted('CategorieMedicament', 'edit');
        if (isPermistted) {
            this.categorieMedicamentService.findByIdWithAssociatedList(categorieMedicament).subscribe(res => {
                this.selectedCategorieMedicament = res;
                this.selectedCategorieMedicament.dateArchivage = new Date(categorieMedicament.dateArchivage);
                this.selectedCategorieMedicament.dateCreation = new Date(categorieMedicament.dateCreation);
                this.editCategorieMedicamentDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }


    public async viewCategorieMedicament(categorieMedicament: CategorieMedicamentVo) {
        const isPermistted = await this.roleService.isPermitted('CategorieMedicament', 'view');
        if (isPermistted) {
            this.categorieMedicamentService.findByIdWithAssociatedList(categorieMedicament).subscribe(res => {
                this.selectedCategorieMedicament = res;
                this.selectedCategorieMedicament.dateArchivage = new Date(categorieMedicament.dateArchivage);
                this.selectedCategorieMedicament.dateCreation = new Date(categorieMedicament.dateCreation);
                this.viewCategorieMedicamentDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateCategorieMedicament(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedCategorieMedicament = new CategorieMedicamentVo();
            this.createCategorieMedicamentDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async archiverCategorieMedicament(categorieMedicament: CategorieMedicamentVo) {
        const isPermistted = await this.roleService.isPermitted('CategorieMedicament', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous archiver cet élément (Categorie medicament) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.categorieMedicamentService.archiver(categorieMedicament).subscribe(status => {
                        const myIndex = this.categorieMedicaments.indexOf(categorieMedicament);
                        this.categorieMedicaments[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Categorie medicament archivé',
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

    public async desarchiverCategorieMedicament(categorieMedicament: CategorieMedicamentVo) {
        const isPermistted = await this.roleService.isPermitted('CategorieMedicament', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous désarchiver cet élément (Categorie medicament) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.categorieMedicamentService.desarchiver(categorieMedicament).subscribe(status => {
                        const myIndex = this.categorieMedicaments.indexOf(categorieMedicament);
                        this.categorieMedicaments[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Categorie medicament désarchivé',
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

    public async deleteCategorieMedicament(categorieMedicament: CategorieMedicamentVo) {
        const isPermistted = await this.roleService.isPermitted('CategorieMedicament', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Categorie medicament) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.categorieMedicamentService.delete(categorieMedicament).subscribe(status => {
                        if (status > 0) {
                            const position = this.categorieMedicaments.indexOf(categorieMedicament);
                            position > -1 ? this.categorieMedicaments.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Categorie medicament Supprimé',
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


    public async duplicateCategorieMedicament(categorieMedicament: CategorieMedicamentVo) {

        this.categorieMedicamentService.findByIdWithAssociatedList(categorieMedicament).subscribe(
            res => {
                this.initDuplicateCategorieMedicament(res);
                this.selectedCategorieMedicament = res;
                this.selectedCategorieMedicament.id = null;
                this.createCategorieMedicamentDialog = true;
            });
    }

    initDuplicateCategorieMedicament(res: CategorieMedicamentVo) {
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
        this.exportData = this.categorieMedicaments.map(e => {
            return {
                'Reference': e.reference,
                'Libelle': e.libelle,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd-MM-yyyy'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd-MM-yyyy'),
            };
        });

        this.criteriaData = [{
            'Reference': this.searchCategorieMedicament.reference ? this.searchCategorieMedicament.reference : environment.emptyForExport,
            'Libelle': this.searchCategorieMedicament.libelle ? this.searchCategorieMedicament.libelle : environment.emptyForExport,
            'Archive': this.searchCategorieMedicament.archive ? (this.searchCategorieMedicament.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchCategorieMedicament.dateArchivageMin ? this.datePipe.transform(this.searchCategorieMedicament.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchCategorieMedicament.dateArchivageMax ? this.datePipe.transform(this.searchCategorieMedicament.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchCategorieMedicament.dateCreationMin ? this.datePipe.transform(this.searchCategorieMedicament.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchCategorieMedicament.dateCreationMax ? this.datePipe.transform(this.searchCategorieMedicament.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get categorieMedicaments(): Array<CategorieMedicamentVo> {
        return this.categorieMedicamentService.categorieMedicaments;
    }

    set categorieMedicaments(value: Array<CategorieMedicamentVo>) {
        this.categorieMedicamentService.categorieMedicaments = value;
    }

    get categorieMedicamentSelections(): Array<CategorieMedicamentVo> {
        return this.categorieMedicamentService.categorieMedicamentSelections;
    }

    set categorieMedicamentSelections(value: Array<CategorieMedicamentVo>) {
        this.categorieMedicamentService.categorieMedicamentSelections = value;
    }

    get selectedCategorieMedicament(): CategorieMedicamentVo {
        return this.categorieMedicamentService.selectedCategorieMedicament;
    }

    set selectedCategorieMedicament(value: CategorieMedicamentVo) {
        this.categorieMedicamentService.selectedCategorieMedicament = value;
    }

    get createCategorieMedicamentDialog(): boolean {
        return this.categorieMedicamentService.createCategorieMedicamentDialog;
    }

    set createCategorieMedicamentDialog(value: boolean) {
        this.categorieMedicamentService.createCategorieMedicamentDialog = value;
    }

    get editCategorieMedicamentDialog(): boolean {
        return this.categorieMedicamentService.editCategorieMedicamentDialog;
    }

    set editCategorieMedicamentDialog(value: boolean) {
        this.categorieMedicamentService.editCategorieMedicamentDialog = value;
    }

    get viewCategorieMedicamentDialog(): boolean {
        return this.categorieMedicamentService.viewCategorieMedicamentDialog;
    }

    set viewCategorieMedicamentDialog(value: boolean) {
        this.categorieMedicamentService.viewCategorieMedicamentDialog = value;
    }

    get searchCategorieMedicament(): CategorieMedicamentVo {
        return this.categorieMedicamentService.searchCategorieMedicament;
    }

    set searchCategorieMedicament(value: CategorieMedicamentVo) {
        this.categorieMedicamentService.searchCategorieMedicament = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
