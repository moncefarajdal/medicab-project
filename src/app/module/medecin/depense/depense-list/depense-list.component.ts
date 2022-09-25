import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {PatientVo} from "../../../../controller/model/Patient.model";
import {MutuelleVo} from "../../../../controller/model/Mutuelle.model";
import {DatePipe} from "@angular/common";
import {DepenseService} from "../../../../controller/service/Depense.service";
import {RoleService} from "../../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../controller/service/Auth.service";
import {ExportService} from "../../../../controller/service/Export.service";
import {PatientService} from "../../../../controller/service/Patient.service";
import {MutuelleService} from "../../../../controller/service/Mutuelle.service";
import {DepenseVo} from "../../../../controller/model/Depense.model";
import {environment} from "../../../../../environments/environment";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";

@Component({
    selector: 'app-depense-list',
    templateUrl: './depense-list.component.html',
    styleUrls: ['./depense-list.component.scss']
})
export class DepenseListComponent implements OnInit {

    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Depense';
    patients: Array<PatientVo>;
    mutuelles: Array<MutuelleVo>;

    selectedDepenses: DepenseVo[];
    deleteDepensesDialog: boolean = false;

    constructor(private datePipe: DatePipe, private depenseService: DepenseService,
                private messageService: MessageService, private confirmationService: ConfirmationService,
                private roleService: RoleService, private router: Router, private authService: AuthService,
                private exportService: ExportService, private patientService: PatientService,
                private mutuelleService: MutuelleService) {
    }

    ngOnInit(): void {
        this.loadDepenses();
        this.initExport();
        this.initCol();
    }

    // methods
    public async loadDepenses() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Depense', 'list');
        isPermistted ? this.depenseService.findAll().subscribe(depenses => this.depenses = depenses, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.depenseService.findByCriteria(this.searchDepense).subscribe(depenses => {
            this.depenses = depenses;
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'dateDepense', header: 'Date depense'},
            {field: 'typeDepense?.libelle', header: 'Type depense'},
            {field: 'patient?.cin', header: 'Patient'},
            {field: 'tarif', header: 'Tarif'},
            {field: 'mutualise', header: 'Mutualise'},
            {field: 'mutuelle?.code', header: 'Mutuelle'},
            {field: 'archive', header: 'Archive'},
            {field: 'dateArchivage', header: 'Date archivage'},
            {field: 'dateCreation', header: 'Date creation'},
        ];
    }

    public async editDepense(depense: DepenseVo) {
        const isPermistted = await this.roleService.isPermitted('Depense', 'edit');
        if (isPermistted) {
            this.depenseService.findByIdWithAssociatedList(depense).subscribe(res => {
                this.selectedDepense = res;
                this.selectedDepense.date = new Date(depense.date);
                this.editDepenseDialog = true;
                this.selectedDepense.total = 0;
                console.log(this.selectedDepense.total);
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

    public async viewDepense(depense: DepenseVo) {
        const isPermistted = await this.roleService.isPermitted('Depense', 'view');
        if (isPermistted) {
            this.depenseService.findByIdWithAssociatedList(depense).subscribe(res => {
                this.selectedDepense = res;
                this.selectedDepense.date = new Date(depense.date);
                this.viewDepenseDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async openCreateDepense(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedDepense = new DepenseVo();
            this.createDepenseDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async deleteDepense(depense: DepenseVo) {
        const isPermistted = await this.roleService.isPermitted('Depense', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Depense) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.depenseService.delete(depense).subscribe(status => {
                        if (status > 0) {
                            const position = this.depenses.indexOf(depense);
                            position > -1 ? this.depenses.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Depense Supprimé',
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

    public async deleteSelectedDepenses() {
        const isPermistted = await this.roleService.isPermitted('Depense', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer ces depenes ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.selectedDepenses.forEach( (e) => {
                            this.depenseService.delete(e).subscribe(status => {
                                if (status > 0) {
                                    const position = this.depenses.indexOf(e);
                                    position > -1 ? this.depenses.splice(position, 1) : false;
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
        this.exportData = this.depenses.map(e => {
            return {
                'Reference': e.reference,
                'Date depense': this.datePipe.transform(e.date, 'dd-MM-yyyy'),
                'Tarif': e.total,
            };
        });

        this.criteriaData = [{
            'Reference': this.searchDepense.reference ? this.searchDepense.reference : environment.emptyForExport,
            'Date depense Min': this.searchDepense.dateMin ? this.datePipe.transform(this.searchDepense.dateMin, this.dateFormat) : environment.emptyForExport,
            'Date depense Max': this.searchDepense.dateMax ? this.datePipe.transform(this.searchDepense.dateMax, this.dateFormat) : environment.emptyForExport,
            'Tarif Min': this.searchDepense.totalMin ? this.searchDepense.totalMin : environment.emptyForExport,
            'Tarif Max': this.searchDepense.totalMax ? this.searchDepense.totalMax : environment.emptyForExport,
        }];

    }

    // getters and setters

    get depenses(): Array<DepenseVo> {
        return this.depenseService.depenses;
    }

    set depenses(value: Array<DepenseVo>) {
        this.depenseService.depenses = value;
    }

    get depenseSelections(): Array<DepenseVo> {
        return this.depenseService.depenseSelections;
    }

    set depenseSelections(value: Array<DepenseVo>) {
        this.depenseService.depenseSelections = value;
    }


    get selectedDepense(): DepenseVo {
        return this.depenseService.selectedDepense;
    }

    set selectedDepense(value: DepenseVo) {
        this.depenseService.selectedDepense = value;
    }

    get createDepenseDialog(): boolean {
        return this.depenseService.createDepenseDialog;
    }

    set createDepenseDialog(value: boolean) {
        this.depenseService.createDepenseDialog = value;
    }

    get editDepenseDialog(): boolean {
        return this.depenseService.editDepenseDialog;
    }

    set editDepenseDialog(value: boolean) {
        this.depenseService.editDepenseDialog = value;
    }

    get viewDepenseDialog(): boolean {
        return this.depenseService.viewDepenseDialog;
    }

    set viewDepenseDialog(value: boolean) {
        this.depenseService.viewDepenseDialog = value;
    }

    get searchDepense(): DepenseVo {
        return this.depenseService.searchDepense;
    }

    set searchDepense(value: DepenseVo) {
        this.depenseService.searchDepense = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
