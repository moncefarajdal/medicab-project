import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {MutuelleService} from "../../../../controller/service/Mutuelle.service";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {ExportService} from "../../../../controller/service/Export.service";
import {AuthService} from "../../../../controller/service/Auth.service";
import {Router} from "@angular/router";
import {RoleService} from "../../../../controller/service/role.service";
import {MutuelleVo} from "../../../../controller/model/Mutuelle.model";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-mutuelle-list',
  templateUrl: './mutuelle-list.component.html',
  styleUrls: ['./mutuelle-list.component.scss']
})
export class MutuelleListComponent implements OnInit {

    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Mutuelle';
    yesOrNoArchive: any[] = [];


    constructor(private datePipe: DatePipe, private mutuelleService: MutuelleService,
                private messageService: MessageService, private confirmationService: ConfirmationService,
                private roleService: RoleService, private router: Router, private authService: AuthService,
                private exportService: ExportService) {
    }

    ngOnInit(): void {
        this.loadMutuelles();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadMutuelles() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Mutuelle', 'list');
        isPermistted ? this.mutuelleService.findAll().subscribe(mutuelles => this.mutuelles = mutuelles, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.mutuelleService.findByCriteria(this.searchMutuelle).subscribe(mutuelles => {

            this.mutuelles = mutuelles;
            // this.searchMutuelle = new MutuelleVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'code', header: 'Code'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editMutuelle(mutuelle: MutuelleVo) {
        const isPermistted = await this.roleService.isPermitted('Mutuelle', 'edit');
        if (isPermistted) {
            this.mutuelleService.findByIdWithAssociatedList(mutuelle).subscribe(res => {
                this.selectedMutuelle = res;
                this.selectedMutuelle.dateArchivage = new Date(mutuelle.dateArchivage);
                this.selectedMutuelle.dateCreation = new Date(mutuelle.dateCreation);
                this.editMutuelleDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }

    public async viewMutuelle(mutuelle: MutuelleVo) {
        const isPermistted = await this.roleService.isPermitted('Mutuelle', 'view');
        if (isPermistted) {
            this.mutuelleService.findByIdWithAssociatedList(mutuelle).subscribe(res => {
                this.selectedMutuelle = res;
                this.selectedMutuelle.dateArchivage = new Date(mutuelle.dateArchivage);
                this.selectedMutuelle.dateCreation = new Date(mutuelle.dateCreation);
                this.viewMutuelleDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async openCreateMutuelle(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedMutuelle = new MutuelleVo();
            this.createMutuelleDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async archiverMutuelle(mutuelle: MutuelleVo) {
        const isPermistted = await this.roleService.isPermitted('Mutuelle', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous archiver cet élément (Mutuelle) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.mutuelleService.archiver(mutuelle).subscribe(status => {
                        const myIndex = this.mutuelles.indexOf(mutuelle);
                        this.mutuelles[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Mutuelle archivé',
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

    public async desarchiverMutuelle(mutuelle: MutuelleVo) {
        const isPermistted = await this.roleService.isPermitted('Mutuelle', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous désarchiver cet élément (Mutuelle) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.mutuelleService.desarchiver(mutuelle).subscribe(status => {
                        const myIndex = this.mutuelles.indexOf(mutuelle);
                        this.mutuelles[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Mutuelle désarchivé',
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


    public async deleteMutuelle(mutuelle: MutuelleVo) {
        const isPermistted = await this.roleService.isPermitted('Mutuelle', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Mutuelle) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.mutuelleService.delete(mutuelle).subscribe(status => {
                        if (status > 0) {
                            const position = this.mutuelles.indexOf(mutuelle);
                            position > -1 ? this.mutuelles.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Mutuelle Supprimé',
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


    public async duplicateMutuelle(mutuelle: MutuelleVo) {

        this.mutuelleService.findByIdWithAssociatedList(mutuelle).subscribe(
            res => {
                this.initDuplicateMutuelle(res);
                this.selectedMutuelle = res;
                this.selectedMutuelle.id = null;
                this.createMutuelleDialog = true;

            });

    }

    initDuplicateMutuelle(res: MutuelleVo) {
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
        this.exportData = this.mutuelles.map(e => {
            return {
                'Libelle': e.libelle,
                'Code': e.code,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd-MM-yyyy'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd-MM-yyyy'),
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchMutuelle.libelle ? this.searchMutuelle.libelle : environment.emptyForExport,
            'Code': this.searchMutuelle.code ? this.searchMutuelle.code : environment.emptyForExport,
            'Archive': this.searchMutuelle.archive ? (this.searchMutuelle.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchMutuelle.dateArchivageMin ? this.datePipe.transform(this.searchMutuelle.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchMutuelle.dateArchivageMax ? this.datePipe.transform(this.searchMutuelle.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchMutuelle.dateCreationMin ? this.datePipe.transform(this.searchMutuelle.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchMutuelle.dateCreationMax ? this.datePipe.transform(this.searchMutuelle.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get mutuelles(): Array<MutuelleVo> {
        return this.mutuelleService.mutuelles;
    }

    set mutuelles(value: Array<MutuelleVo>) {
        this.mutuelleService.mutuelles = value;
    }

    get mutuelleSelections(): Array<MutuelleVo> {
        return this.mutuelleService.mutuelleSelections;
    }

    set mutuelleSelections(value: Array<MutuelleVo>) {
        this.mutuelleService.mutuelleSelections = value;
    }


    get selectedMutuelle(): MutuelleVo {
        return this.mutuelleService.selectedMutuelle;
    }

    set selectedMutuelle(value: MutuelleVo) {
        this.mutuelleService.selectedMutuelle = value;
    }

    get createMutuelleDialog(): boolean {
        return this.mutuelleService.createMutuelleDialog;
    }

    set createMutuelleDialog(value: boolean) {
        this.mutuelleService.createMutuelleDialog = value;
    }

    get editMutuelleDialog(): boolean {
        return this.mutuelleService.editMutuelleDialog;
    }

    set editMutuelleDialog(value: boolean) {
        this.mutuelleService.editMutuelleDialog = value;
    }

    get viewMutuelleDialog(): boolean {
        return this.mutuelleService.viewMutuelleDialog;
    }

    set viewMutuelleDialog(value: boolean) {
        this.mutuelleService.viewMutuelleDialog = value;
    }

    get searchMutuelle(): MutuelleVo {
        return this.mutuelleService.searchMutuelle;
    }

    set searchMutuelle(value: MutuelleVo) {
        this.mutuelleService.searchMutuelle = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
