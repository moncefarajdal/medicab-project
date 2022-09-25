import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {TypeConsultationVo} from "../../../../controller/model/TypeConsultation.model";
import {DateUtils} from "../../../../utils/DateUtils";
import {TypeConsultationService} from "../../../../controller/service/TypeConsultation.service";
import {RoleService} from "../../../../controller/service/role.service";
import {DatePipe} from "@angular/common";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-type-consultation-edit',
  templateUrl: './type-consultation-edit.component.html',
  styleUrls: ['./type-consultation-edit.component.scss']
})
export class TypeConsultationEditComponent implements OnInit {

    constructor(private datePipe: DatePipe, private typeConsultationService: TypeConsultationService,
                private roleService: RoleService, private messageService: MessageService, private router: Router) {
    }

    ngOnInit(): void {
    }

    public edit() {
        this.editWithShowOption(false);
    }

    public editWithShowOption(showList: boolean) {
        this.selectedTypeConsultation.dateArchivage = DateUtils.toDate(this.selectedTypeConsultation.dateArchivage);
        this.selectedTypeConsultation.dateCreation = DateUtils.toDate(this.selectedTypeConsultation.dateCreation);
        this.typeConsultationService.edit().subscribe(typeConsultation => {
            const myIndex = this.typeConsultations.findIndex(e => e.id === this.selectedTypeConsultation.id);
            this.typeConsultations[myIndex] = this.selectedTypeConsultation;
            this.editTypeConsultationDialog = false;
            this.selectedTypeConsultation = new TypeConsultationVo();


        }, error => {
            console.log(error);
        });
    }

    hideEditDialog() {
        this.editTypeConsultationDialog = false;
    }

    // getters and setters

    get typeConsultations(): Array<TypeConsultationVo> {
        return this.typeConsultationService.typeConsultations;
    }

    set typeConsultations(value: Array<TypeConsultationVo>) {
        this.typeConsultationService.typeConsultations = value;
    }

    get selectedTypeConsultation(): TypeConsultationVo {
        return this.typeConsultationService.selectedTypeConsultation;
    }

    set selectedTypeConsultation(value: TypeConsultationVo) {
        this.typeConsultationService.selectedTypeConsultation = value;
    }

    get editTypeConsultationDialog(): boolean {
        return this.typeConsultationService.editTypeConsultationDialog;

    }

    set editTypeConsultationDialog(value: boolean) {
        this.typeConsultationService.editTypeConsultationDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

}
