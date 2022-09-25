import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {PaiementVo} from "../../../controller/model/Paiement.model";
import {DatePipe} from "@angular/common";
import {ConsultationVo} from "../../../controller/model/Consultation.model";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {PaiementService} from "../../../controller/service/Paiement.service";
import {RoleService} from "../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../controller/service/Auth.service";
import {ExportService} from "../../../controller/service/Export.service";
import {ConsultationService} from "../../../controller/service/Consultation.service";

@Component({
    selector: 'app-paiement',
    templateUrl: './paiement.component.html',
    styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Paiement';
    yesOrNoArchive: any[] = [];
    consultations: Array<ConsultationVo>;

    selectedPaiements: PaiementVo[];
    deletePaiementsDialog: boolean = false;


    constructor(private datePipe: DatePipe, private paiementService: PaiementService,
                private messageService: MessageService, private confirmationService: ConfirmationService,
                private roleService: RoleService, private router: Router, private authService: AuthService,
                private exportService: ExportService, private consultationService: ConsultationService) {
    }

    ngOnInit(): void {
        this.loadPaiements();
        this.initExport();
        this.initCol();
        this.loadConsultation();
        this.yesOrNoArchive = [{label: 'Archive', value: null}, {label: 'Oui', value: 1}, {label: 'Non', value: 0}];
    }

    // methods
    public async loadPaiements() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Paiement', 'list');
        isPermistted ? this.paiementService.findAll().subscribe(paiements => this.paiements = paiements, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        console.log(this.paiements);
    }

    public async deleteSelectedPaiements() {
        const isPermistted = await this.roleService.isPermitted('Paiement', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer ces paiements ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.selectedPaiements.forEach( (e) => {
                            this.paiementService.delete(e).subscribe(status => {
                                if (status > 0) {
                                    const position = this.paiements.indexOf(e);
                                    position > -1 ? this.paiements.splice(position, 1) : false;
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
        this.paiementService.findByCriteria(this.searchPaiement).subscribe(paiements => {

            this.paiements = paiements;
            // this.searchPaiement = new PaiementVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'datePaiement', header: 'Date paiement'},
            {field: 'montant', header: 'Montant'},
            {field: 'consultation?.reference', header: 'Consultation'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editPaiement(paiement: PaiementVo) {
        const isPermistted = await this.roleService.isPermitted('Paiement', 'edit');
        if (isPermistted) {
            this.paiementService.findByIdWithAssociatedList(paiement).subscribe(res => {
                this.selectedPaiement = res;
                this.selectedPaiement.datePaiement = new Date(paiement.datePaiement);
                this.selectedPaiement.dateArchivage = new Date(paiement.dateArchivage);
                this.selectedPaiement.dateCreation = new Date(paiement.dateCreation);
                this.editPaiementDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewPaiement(paiement: PaiementVo) {
        const isPermistted = await this.roleService.isPermitted('Paiement', 'view');
        if (isPermistted) {
            this.paiementService.findByIdWithAssociatedList(paiement).subscribe(res => {
                this.selectedPaiement = res;
                this.selectedPaiement.datePaiement = new Date(paiement.datePaiement);
                this.selectedPaiement.dateArchivage = new Date(paiement.dateArchivage);
                this.selectedPaiement.dateCreation = new Date(paiement.dateCreation);
                this.viewPaiementDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreatePaiement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedPaiement = new PaiementVo();
            this.createPaiementDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async archiverPaiement(paiement: PaiementVo) {
        const isPermistted = await this.roleService.isPermitted('Paiement', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous archiver cet élément (Paiement) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.paiementService.archiver(paiement).subscribe(status => {
                        const myIndex = this.paiements.indexOf(paiement);
                        this.paiements[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Paiement archivé',
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

    public async desarchiverPaiement(paiement: PaiementVo) {
        const isPermistted = await this.roleService.isPermitted('Paiement', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous désarchiver cet élément (Paiement) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.paiementService.desarchiver(paiement).subscribe(status => {
                        const myIndex = this.paiements.indexOf(paiement);
                        this.paiements[myIndex] = status;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Paiement désarchivé',
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


    public async deletePaiement(paiement: PaiementVo) {
        const isPermistted = await this.roleService.isPermitted('Paiement', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Paiement) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.paiementService.delete(paiement).subscribe(status => {
                        if (status > 0) {
                            const position = this.paiements.indexOf(paiement);
                            position > -1 ? this.paiements.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Paiement Supprimé',
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
        const isPermistted = await this.roleService.isPermitted('Paiement', 'list');
        isPermistted ? this.consultationService.findAll().subscribe(consultations => this.consultations = consultations, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicatePaiement(paiement: PaiementVo) {

        this.paiementService.findByIdWithAssociatedList(paiement).subscribe(
            res => {
                this.initDuplicatePaiement(res);
                this.selectedPaiement = res;
                this.selectedPaiement.id = null;
                this.createPaiementDialog = true;

            });

    }

    initDuplicatePaiement(res: PaiementVo) {


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
        this.exportData = this.paiements.map(e => {
            return {
                'Reference': e.reference,
                'Date paiement': this.datePipe.transform(e.datePaiement, 'dd-MM-yyyy'),
                'Montant': e.montant,
                'Consultation': e.consultationVo?.reference,
                'Archive': e.archive ? 'Vrai' : 'Faux',
                'Date archivage': this.datePipe.transform(e.dateArchivage, 'dd-MM-yyyy'),
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd-MM-yyyy'),
            };
        });

        this.criteriaData = [{
            'Reference': this.searchPaiement.reference ? this.searchPaiement.reference : environment.emptyForExport,
            'Date paiement Min': this.searchPaiement.datePaiementMin ? this.datePipe.transform(this.searchPaiement.datePaiementMin, this.dateFormat) : environment.emptyForExport,
            'Date paiement Max': this.searchPaiement.datePaiementMax ? this.datePipe.transform(this.searchPaiement.datePaiementMax, this.dateFormat) : environment.emptyForExport,
            'Montant Min': this.searchPaiement.montantMin ? this.searchPaiement.montantMin : environment.emptyForExport,
            'Montant Max': this.searchPaiement.montantMax ? this.searchPaiement.montantMax : environment.emptyForExport,
            'Consultation': this.searchPaiement.consultationVo?.reference ? this.searchPaiement.consultationVo?.reference : environment.emptyForExport,
            'Archive': this.searchPaiement.archive ? (this.searchPaiement.archive ? environment.trueValue : environment.falseValue) : environment.emptyForExport,
            'Date archivage Min': this.searchPaiement.dateArchivageMin ? this.datePipe.transform(this.searchPaiement.dateArchivageMin, this.dateFormat) : environment.emptyForExport,
            'Date archivage Max': this.searchPaiement.dateArchivageMax ? this.datePipe.transform(this.searchPaiement.dateArchivageMax, this.dateFormat) : environment.emptyForExport,
            'Date creation Min': this.searchPaiement.dateCreationMin ? this.datePipe.transform(this.searchPaiement.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchPaiement.dateCreationMax ? this.datePipe.transform(this.searchPaiement.dateCreationMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get paiements(): Array<PaiementVo> {
        return this.paiementService.paiements;
    }

    set paiements(value: Array<PaiementVo>) {
        this.paiementService.paiements = value;
    }

    get paiementSelections(): Array<PaiementVo> {
        return this.paiementService.paiementSelections;
    }

    set paiementSelections(value: Array<PaiementVo>) {
        this.paiementService.paiementSelections = value;
    }


    get selectedPaiement(): PaiementVo {
        return this.paiementService.selectedPaiement;
    }

    set selectedPaiement(value: PaiementVo) {
        this.paiementService.selectedPaiement = value;
    }

    get createPaiementDialog(): boolean {
        return this.paiementService.createPaiementDialog;
    }

    set createPaiementDialog(value: boolean) {
        this.paiementService.createPaiementDialog = value;
    }

    get editPaiementDialog(): boolean {
        return this.paiementService.editPaiementDialog;
    }

    set editPaiementDialog(value: boolean) {
        this.paiementService.editPaiementDialog = value;
    }

    get viewPaiementDialog(): boolean {
        return this.paiementService.viewPaiementDialog;
    }

    set viewPaiementDialog(value: boolean) {
        this.paiementService.viewPaiementDialog = value;
    }

    get searchPaiement(): PaiementVo {
        return this.paiementService.searchPaiement;
    }

    set searchPaiement(value: PaiementVo) {
        this.paiementService.searchPaiement = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
