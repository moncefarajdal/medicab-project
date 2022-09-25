import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ConsultationVo} from "../../../../controller/model/Consultation.model";
import {OrdonnanceVo} from "../../../../controller/model/Ordonnance.model";
import {ConsultationService} from "../../../../controller/service/Consultation.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {RoleService} from "../../../../controller/service/role.service";
import {OrdonnanceService} from "../../../../controller/service/Ordonnance.service";
import {DatePipe} from "@angular/common";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import jsPDF from "jspdf";

@Component({
  selector: 'app-ordonnance-view',
  templateUrl: './ordonnance-view.component.html',
  styleUrls: ['./ordonnance-view.component.scss']
})
export class OrdonnanceViewComponent implements OnInit {

    constructor(private datePipe: DatePipe, private ordonnanceService: OrdonnanceService,
                private roleService: RoleService, private messageService: MessageService, private router: Router,
                private consultationService: ConsultationService) {
    }

    ngOnInit(): void {
        this.selectedConsultation = new ConsultationVo();
        this.consultationService.findAll().subscribe((data) => this.consultations = data);
    }

    hideViewDialog() {
        this.viewOrdonnanceDialog = false;
    }

    title = 'htmltopdf';

    @ViewChild('pdfTable') pdfTable: ElementRef;

    public downloadAsPDF() {
        const doc = new jsPDF();

        const pdfTable = this.pdfTable.nativeElement;

        var html = htmlToPdfmake(pdfTable.innerHTML);

        const documentDefinition = { content: html };
        pdfMake.createPdf(documentDefinition).open();

    }

    // getters and setters

    get ordonnances(): Array<OrdonnanceVo> {
        return this.ordonnanceService.ordonnances;
    }

    set ordonnances(value: Array<OrdonnanceVo>) {
        this.ordonnanceService.ordonnances = value;
    }

    get selectedOrdonnance(): OrdonnanceVo {
        return this.ordonnanceService.selectedOrdonnance;
    }

    set selectedOrdonnance(value: OrdonnanceVo) {
        this.ordonnanceService.selectedOrdonnance = value;
    }

    get viewOrdonnanceDialog(): boolean {
        return this.ordonnanceService.viewOrdonnanceDialog;

    }

    set viewOrdonnanceDialog(value: boolean) {
        this.ordonnanceService.viewOrdonnanceDialog = value;
    }

    get selectedConsultation(): ConsultationVo {
        return this.consultationService.selectedConsultation;
    }

    set selectedConsultation(value: ConsultationVo) {
        this.consultationService.selectedConsultation = value;
    }

    get consultations(): Array<ConsultationVo> {
        return this.consultationService.consultations;
    }

    set consultations(value: Array<ConsultationVo>) {
        this.consultationService.consultations = value;
    }

    get editConsultationDialog(): boolean {
        return this.consultationService.editConsultationDialog;
    }

    set editConsultationDialog(value: boolean) {
        this.consultationService.editConsultationDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }

}
