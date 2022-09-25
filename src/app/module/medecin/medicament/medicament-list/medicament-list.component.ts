import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {MedicamentVo} from "../../../../controller/model/Medicament.model";
import {CategorieMedicamentVo} from "../../../../controller/model/CategorieMedicament.model";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";
import {MedicamentService} from "../../../../controller/service/Medicament.service";
import {RoleService} from "../../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../controller/service/Auth.service";
import {ExportService} from "../../../../controller/service/Export.service";
import {CategorieMedicamentService} from "../../../../controller/service/CategorieMedicament.service";

@Component({
  selector: 'app-medicament-list',
  templateUrl: './medicament-list.component.html',
  styleUrls: ['./medicament-list.component.scss']
})
export class MedicamentListComponent implements OnInit {

    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Medicament';
    yesOrNoArchive: any[] = [];
    categorieMedicaments: Array<CategorieMedicamentVo>;

    constructor(private datePipe: DatePipe, private medicamentService: MedicamentService,
                private messageService: MessageService, private confirmationService: ConfirmationService,
                private roleService: RoleService, private router: Router, private authService: AuthService,
                private exportService: ExportService, private categorieMedicamentService: CategorieMedicamentService) {
    }

    ngOnInit(): void {
        this.loadMedicaments();
        this.initExport();
        this.initCol();
        this.loadCategorieMedicament();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadMedicaments() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Medicament', 'list');
        isPermistted ? this.medicamentService.findAll().subscribe(medicaments => this.medicaments = medicaments, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.medicamentService.findByCriteria(this.searchMedicament).subscribe(medicaments => {

            this.medicaments = medicaments;
            // this.searchMedicament = new MedicamentVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'codeMedicament', header: 'Code medicament'},
            {field: 'libelle', header: 'Libelle'},
            {field: 'categorieMedicament?.libelle', header: 'Categorie medicament'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editMedicament(medicament: MedicamentVo) {
        const isPermistted = await this.roleService.isPermitted('Medicament', 'edit');
        if (isPermistted) {
            this.medicamentService.findByIdWithAssociatedList(medicament).subscribe(res => {
                this.selectedMedicament = res;
                this.selectedMedicament.dateArchivage = new Date(medicament.dateArchivage);
                this.selectedMedicament.dateCreation = new Date(medicament.dateCreation);
                this.editMedicamentDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }


    public async viewMedicament(medicament: MedicamentVo) {
        const isPermistted = await this.roleService.isPermitted('Medicament', 'view');
        if (isPermistted) {
            this.medicamentService.findByIdWithAssociatedList(medicament).subscribe(res => {
                this.selectedMedicament = res;
                this.selectedMedicament.dateArchivage = new Date(medicament.dateArchivage);
                this.selectedMedicament.dateCreation = new Date(medicament.dateCreation);
                this.viewMedicamentDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateMedicament(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedMedicament = new MedicamentVo();
            this.createMedicamentDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async archiverMedicament(medicament: MedicamentVo) {
        const isPermistted = await this.roleService.isPermitted('Medicament', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous archiver cet élément (Medicament) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.medicamentService.archiver(medicament).subscribe(status => {
                        const myIndex = this.medicaments.indexOf(medicament);
                        this.medicaments[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Medicament archivé',
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

    public async desarchiverMedicament(medicament: MedicamentVo) {
        const isPermistted = await this.roleService.isPermitted('Medicament', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous désarchiver cet élément (Medicament) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.medicamentService.desarchiver(medicament).subscribe(status => {
                        const myIndex = this.medicaments.indexOf(medicament);
                        this.medicaments[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Medicament désarchivé',
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


    public async deleteMedicament(medicament: MedicamentVo) {
        const isPermistted = await this.roleService.isPermitted('Medicament', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Medicament) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.medicamentService.delete(medicament).subscribe(status => {
                        if (status > 0) {
                            const position = this.medicaments.indexOf(medicament);
                            position > -1 ? this.medicaments.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Medicament Supprimé',
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

    public async loadCategorieMedicament() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Medicament', 'list');
        isPermistted ? this.categorieMedicamentService.findAll().subscribe(categorieMedicaments => this.categorieMedicaments = categorieMedicaments, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateMedicament(medicament: MedicamentVo) {

        this.medicamentService.findByIdWithAssociatedList(medicament).subscribe(
            res => {
                this.initDuplicateMedicament(res);
                this.selectedMedicament = res;
                this.selectedMedicament.id = null;
                this.createMedicamentDialog = true;

            });

    }

    initDuplicateMedicament(res: MedicamentVo) {


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
        this.exportData = this.medicaments.map(e => {
            return {
                'Code medicament': e.codeMedicament,
                'Libelle': e.libelle,
                'Categorie medicament': e.categorieMedicamentVo?.libelle,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd-MM-yyyy'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd-MM-yyyy'),
            };
        });

        this.criteriaData = [{
            'Code medicament': this.searchMedicament.codeMedicament ? this.searchMedicament.codeMedicament : environment.emptyForExport,
            'Libelle': this.searchMedicament.libelle ? this.searchMedicament.libelle : environment.emptyForExport,
            'Categorie medicament': this.searchMedicament.categorieMedicamentVo?.libelle ? this.searchMedicament.categorieMedicamentVo?.libelle : environment.emptyForExport,
            'Archive': this.searchMedicament.archive ? (this.searchMedicament.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchMedicament.dateArchivageMin ? this.datePipe.transform(this.searchMedicament.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchMedicament.dateArchivageMax ? this.datePipe.transform(this.searchMedicament.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchMedicament.dateCreationMin ? this.datePipe.transform(this.searchMedicament.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchMedicament.dateCreationMax ? this.datePipe.transform(this.searchMedicament.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get medicaments(): Array<MedicamentVo> {
        return this.medicamentService.medicaments;
    }

    set medicaments(value: Array<MedicamentVo>) {
        this.medicamentService.medicaments = value;
    }

    get medicamentSelections(): Array<MedicamentVo> {
        return this.medicamentService.medicamentSelections;
    }

    set medicamentSelections(value: Array<MedicamentVo>) {
        this.medicamentService.medicamentSelections = value;
    }

    get selectedMedicament(): MedicamentVo {
        return this.medicamentService.selectedMedicament;
    }

    set selectedMedicament(value: MedicamentVo) {
        this.medicamentService.selectedMedicament = value;
    }

    get createMedicamentDialog(): boolean {
        return this.medicamentService.createMedicamentDialog;
    }

    set createMedicamentDialog(value: boolean) {
        this.medicamentService.createMedicamentDialog = value;
    }

    get editMedicamentDialog(): boolean {
        return this.medicamentService.editMedicamentDialog;
    }

    set editMedicamentDialog(value: boolean) {
        this.medicamentService.editMedicamentDialog = value;
    }

    get viewMedicamentDialog(): boolean {
        return this.medicamentService.viewMedicamentDialog;
    }

    set viewMedicamentDialog(value: boolean) {
        this.medicamentService.viewMedicamentDialog = value;
    }

    get searchMedicament(): MedicamentVo {
        return this.medicamentService.searchMedicament;
    }

    set searchMedicament(value: MedicamentVo) {
        this.medicamentService.searchMedicament = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
