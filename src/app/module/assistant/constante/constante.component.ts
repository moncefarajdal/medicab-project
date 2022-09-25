import { Component, OnInit } from '@angular/core';
import {ConstanteVo} from "../../../controller/model/Constante.model";
import {environment} from "../../../../environments/environment";
import {DatePipe} from "@angular/common";
import {ConstanteService} from "../../../controller/service/Constante.service";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {RoleService} from "../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../controller/service/Auth.service";
import {ExportService} from "../../../controller/service/Export.service";
import {ConsultationVo} from "../../../controller/model/Consultation.model";

@Component({
  selector: 'app-constante',
  templateUrl: './constante.component.html',
  styleUrls: ['./constante.component.scss']
})
export class ConstanteComponent implements OnInit {

    // Declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Constante';
    yesOrNoArchive: any[] = [];
    deleteConstanteDialog: boolean = false;

    selectedConstantes: ConstanteVo[];
    deleteConstantesDialog: boolean = false;

    constructor(private datePipe: DatePipe, private constanteService: ConstanteService,
                private messageService: MessageService, private confirmationService: ConfirmationService,
                private roleService: RoleService, private router: Router, private authService: AuthService,
                private exportService: ExportService) {
    }

    ngOnInit(): void {
        this.loadConstantes();
        this.initExport();
        this.initCol();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadConstantes() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Constante', 'list');
        isPermistted ? this.constanteService.findAll().subscribe(constantes => this.constantes = constantes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.constanteService.findByCriteria(this.searchConstante).subscribe(constantes => {

            this.constantes = constantes;
            // this.searchConstante = new ConstanteVo();
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

    public async editConstante(constante: ConstanteVo) {
        const isPermistted = await this.roleService.isPermitted('Constante', 'edit');
        if (isPermistted) {
            this.constanteService.findByIdWithAssociatedList(constante).subscribe(res => {
                this.selectedConstante = res;
                this.selectedConstante.dateArchivage = new Date(constante.dateArchivage);
                this.selectedConstante.dateCreation = new Date(constante.dateCreation);
                this.editConstanteDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewConstante(constante: ConstanteVo) {
        const isPermistted = await this.roleService.isPermitted('Constante', 'view');
        if (isPermistted) {
            this.constanteService.findByIdWithAssociatedList(constante).subscribe(res => {
                this.selectedConstante = res;
                this.selectedConstante.dateArchivage = new Date(constante.dateArchivage);
                this.selectedConstante.dateCreation = new Date(constante.dateCreation);
                this.viewConstanteDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateConstante(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedConstante = new ConstanteVo();
            this.createConstanteDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async archiverConstante(constante: ConstanteVo) {
        const isPermistted = await this.roleService.isPermitted('Constante', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous archiver cet élément (Constante) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.constanteService.archiver(constante).subscribe(status => {
                        const myIndex = this.constantes.indexOf(constante);
                        this.constantes[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Constante archivé',
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

    public async desarchiverConstante(constante: ConstanteVo) {
        const isPermistted = await this.roleService.isPermitted('Constante', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous désarchiver cet élément (Constante) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.constanteService.desarchiver(constante).subscribe(status => {
                        const myIndex = this.constantes.indexOf(constante);
                        this.constantes[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Constante désarchivé',
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


    public async deleteConstante(constante: ConstanteVo) {
        // this.deleteConstanteDialog = true;
        const isPermistted = await this.roleService.isPermitted('Constante', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Constante) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.constanteService.delete(constante).subscribe(status => {
                        if (status > 0) {
                            const position = this.constantes.indexOf(constante);
                            position > -1 ? this.constantes.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Constante Supprimé',
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

    public async deleteSelectedConstantes() {
        const isPermistted = await this.roleService.isPermitted('Constante', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer ces constantes ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.selectedConstantes.forEach( (e) => {
                            this.constanteService.delete(e).subscribe(status => {
                                if (status > 0) {
                                    const position = this.constantes.indexOf(e);
                                    position > -1 ? this.constantes.splice(position, 1) : false;
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

    public async duplicateConstante(constante: ConstanteVo) {

        this.constanteService.findByIdWithAssociatedList(constante).subscribe(
            res => {
                this.initDuplicateConstante(res);
                this.selectedConstante = res;
                this.selectedConstante.id = null;
                this.createConstanteDialog = true;

            });
    }

    initDuplicateConstante(res: ConstanteVo) {
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
        this.exportData = this.constantes.map(e => {
            return {
                'Reference': e.reference,
                'Libelle': e.libelle,
                'Description': e.description,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd-MM-yyyy'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd-MM-yyyy'),
            };
        });

        this.criteriaData = [{
            'Reference': this.searchConstante.reference ? this.searchConstante.reference : environment.emptyForExport,
            'Libelle': this.searchConstante.libelle ? this.searchConstante.libelle : environment.emptyForExport,
            'Description': this.searchConstante.description ? this.searchConstante.description : environment.emptyForExport,
            'Archive': this.searchConstante.archive ? (this.searchConstante.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchConstante.dateArchivageMin ? this.datePipe.transform(this.searchConstante.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchConstante.dateArchivageMax ? this.datePipe.transform(this.searchConstante.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchConstante.dateCreationMin ? this.datePipe.transform(this.searchConstante.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchConstante.dateCreationMax ? this.datePipe.transform(this.searchConstante.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get constantes(): Array<ConstanteVo> {
        return this.constanteService.constantes;
    }

    set constantes(value: Array<ConstanteVo>) {
        this.constanteService.constantes = value;
    }

    get constanteSelections(): Array<ConstanteVo> {
        return this.constanteService.constanteSelections;
    }

    set constanteSelections(value: Array<ConstanteVo>) {
        this.constanteService.constanteSelections = value;
    }


    get selectedConstante(): ConstanteVo {
        return this.constanteService.selectedConstante;
    }

    set selectedConstante(value: ConstanteVo) {
        this.constanteService.selectedConstante = value;
    }

    get createConstanteDialog(): boolean {
        return this.constanteService.createConstanteDialog;
    }

    set createConstanteDialog(value: boolean) {
        this.constanteService.createConstanteDialog = value;
    }

    get editConstanteDialog(): boolean {
        return this.constanteService.editConstanteDialog;
    }

    set editConstanteDialog(value: boolean) {
        this.constanteService.editConstanteDialog = value;
    }

    get viewConstanteDialog(): boolean {
        return this.constanteService.viewConstanteDialog;
    }

    set viewConstanteDialog(value: boolean) {
        this.constanteService.viewConstanteDialog = value;
    }

    get searchConstante(): ConstanteVo {
        return this.constanteService.searchConstante;
    }

    set searchConstante(value: ConstanteVo) {
        this.constanteService.searchConstante = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
