import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";
import {SupplementService} from "../../../../controller/service/Supplement.service";
import {RoleService} from "../../../../controller/service/role.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../controller/service/Auth.service";
import {ExportService} from "../../../../controller/service/Export.service";
import {SupplementVo} from "../../../../controller/model/Supplement.model";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-supplement-list',
  templateUrl: './supplement-list.component.html',
  styleUrls: ['./supplement-list.component.scss']
})
export class SupplementListComponent implements OnInit {

    // Declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Supplement';
    yesOrNoArchive: any[] = [];
    deleteSupplementDialog: boolean = false;

    constructor(private datePipe: DatePipe, private supplementService: SupplementService,
                private messageService: MessageService, private confirmationService: ConfirmationService,
                private roleService: RoleService, private router: Router, private authService: AuthService,
                private exportService: ExportService) {
    }

    ngOnInit(): void {
        this.loadSupplements();
        this.initExport();
        this.initCol();
    }

    // methods
    public async loadSupplements() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Supplement', 'list');
        isPermistted ? this.supplementService.findAll().subscribe(supplements => this.supplements = supplements, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }

    public searchRequest() {
        this.supplementService.findByCriteria(this.searchSupplement).subscribe(supplements => {
            this.supplements = supplements;
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'libelle', header: 'Libelle'},
        ];
    }

    public async editSupplement(supplement: SupplementVo) {
        const isPermistted = await this.roleService.isPermitted('Supplement', 'edit');
        if (isPermistted) {
            this.supplementService.findByIdWithAssociatedList(supplement).subscribe(res => {
                this.selectedSupplement = res;
                this.editSupplementDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }
    }

    public async viewSupplement(supplement: SupplementVo) {
        const isPermistted = await this.roleService.isPermitted('Supplement', 'view');
        if (isPermistted) {
            this.supplementService.findByIdWithAssociatedList(supplement).subscribe(res => {
                this.selectedSupplement = res;
                this.viewSupplementDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async openCreateSupplement(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedSupplement = new SupplementVo();
            this.createSupplementDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async deleteSupplement(supplement: SupplementVo) {
        const isPermistted = await this.roleService.isPermitted('Supplement', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Supplement) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.supplementService.delete(supplement).subscribe(status => {
                        if (status > 0) {
                            const position = this.supplements.indexOf(supplement);
                            position > -1 ? this.supplements.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Supplement Supprimé',
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

    public async duplicateSupplement(supplement: SupplementVo) {
        this.supplementService.findByIdWithAssociatedList(supplement).subscribe(
            res => {
                this.initDuplicateSupplement(res);
                this.selectedSupplement = res;
                this.selectedSupplement.id = null;
                this.createSupplementDialog = true;

            });
    }

    initDuplicateSupplement(res: SupplementVo) {
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
        this.exportData = this.supplements.map(e => {
            return {
                'Reference': e.reference,
                'Libelle': e.libelle,
                'Description': e.description,
            };
        });

        this.criteriaData = [{
            'Reference': this.searchSupplement.reference ? this.searchSupplement.reference : environment.emptyForExport,
            'Libelle': this.searchSupplement.libelle ? this.searchSupplement.libelle : environment.emptyForExport,
            'Description': this.searchSupplement.description ? this.searchSupplement.description : environment.emptyForExport,
        }];

    }

    // getters and setters

    get supplements(): Array<SupplementVo> {
        return this.supplementService.supplements;
    }

    set supplements(value: Array<SupplementVo>) {
        this.supplementService.supplements = value;
    }

    get supplementSelections(): Array<SupplementVo> {
        return this.supplementService.supplementSelections;
    }

    set supplementSelections(value: Array<SupplementVo>) {
        this.supplementService.supplementSelections = value;
    }


    get selectedSupplement(): SupplementVo {
        return this.supplementService.selectedSupplement;
    }

    set selectedSupplement(value: SupplementVo) {
        this.supplementService.selectedSupplement = value;
    }

    get createSupplementDialog(): boolean {
        return this.supplementService.createSupplementDialog;
    }

    set createSupplementDialog(value: boolean) {
        this.supplementService.createSupplementDialog = value;
    }

    get editSupplementDialog(): boolean {
        return this.supplementService.editSupplementDialog;
    }

    set editSupplementDialog(value: boolean) {
        this.supplementService.editSupplementDialog = value;
    }

    get viewSupplementDialog(): boolean {
        return this.supplementService.viewSupplementDialog;
    }

    set viewSupplementDialog(value: boolean) {
        this.supplementService.viewSupplementDialog = value;
    }

    get searchSupplement(): SupplementVo {
        return this.supplementService.searchSupplement;
    }

    set searchSupplement(value: SupplementVo) {
        this.supplementService.searchSupplement = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }

}
