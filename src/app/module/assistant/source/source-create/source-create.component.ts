import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {SourceService} from "../../../../controller/service/Source.service";
import {StringUtilService} from "../../../../controller/service/StringUtil.service";
import {RoleService} from "../../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {SourceVo} from "../../../../controller/model/Source.model";
import {environment} from "../../../../../environments/environment";

@Component({
    selector: 'app-source-create',
    templateUrl: './source-create.component.html',
    styleUrls: ['./source-create.component.scss']
})

export class SourceCreateComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();
    _validSourceLibelle = true;
    _validSourceCode = true;

    constructor(private datePipe: DatePipe, private sourceService: SourceService,
                private stringUtilService: StringUtilService, private roleService: RoleService,
                private messageService: MessageService, private router: Router) {
    }

    ngOnInit(): void {
    }

    private setValidation(value: boolean) {
        this.validSourceLibelle = value;
        this.validSourceCode = value;
    }

    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs sur le formulaire'
            });
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.sourceService.save().subscribe(source => {
            this.sources.push({...source});
            this.createSourceDialog = false;
            this.submitted = false;
            this.selectedSource = new SourceVo();

        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();
        this.validateSourceLibelle();
        this.validateSourceCode();
    }

    private validateSourceLibelle() {
        if (this.stringUtilService.isEmpty(this.selectedSource.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validSourceLibelle = false;
        } else {
            this.validSourceLibelle = true;
        }
    }

    private validateSourceCode() {
        if (this.stringUtilService.isEmpty(this.selectedSource.code)) {
            this.errorMessages.push('Code non valide');
            this.validSourceCode = false;
        } else {
            this.validSourceCode = true;
        }
    }

    hideCreateDialog() {
        this.createSourceDialog = false;
        this.setValidation(true);
    }

    // getters and setters

    get sources(): Array<SourceVo> {
        return this.sourceService.sources;
    }

    set sources(value: Array<SourceVo>) {
        this.sourceService.sources = value;
    }

    get selectedSource(): SourceVo {
        return this.sourceService.selectedSource;
    }

    set selectedSource(value: SourceVo) {
        this.sourceService.selectedSource = value;
    }

    get createSourceDialog(): boolean {
        return this.sourceService.createSourceDialog;
    }

    set createSourceDialog(value: boolean) {
        this.sourceService.createSourceDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get errorMessages(): string[] {
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }

    get validSourceLibelle(): boolean {
        return this._validSourceLibelle;
    }

    set validSourceLibelle(value: boolean) {
        this._validSourceLibelle = value;
    }

    get validSourceCode(): boolean {
        return this._validSourceCode;
    }

    set validSourceCode(value: boolean) {
        this._validSourceCode = value;
    }

}
