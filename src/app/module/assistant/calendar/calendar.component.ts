import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/angular";
import {RdvVo} from "../../../controller/model/Rdv.model";
import {RdvService} from "../../../controller/service/Rdv.service";
import {RoleService} from "../../../controller/service/role.service";
import {MessageService} from "primeng/api";
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {environment} from "../../../../environments/environment";
import tippy from "tippy.js";
import {DatePipe} from "@angular/common";

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin
]);

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

    Events = [];
    options: any;
    header: any;
    event: any;

    constructor(private rdvService: RdvService, private roleService: RoleService, private messageService: MessageService,
                private datepipe: DatePipe) {
    }

    ngOnInit(): void {
        this.loadRdvs();
        this.addEvents();
        this.calendarOptions;
    }

    // methods

    public async loadRdvs() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Rdv', 'list');
        isPermistted ? this.rdvService.findAll().subscribe(rdvs => this.rdvs = rdvs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
        console.log(this.rdvs);
    }

    public async openCreateRdv(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedRdv = new RdvVo();
            this.createRdvDialog = true;
            // this.Events.push(this.selectedRdv);
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    public async viewRdv(rdv: RdvVo) {
        const isPermistted = await this.roleService.isPermitted('Rdv', 'view');
        if (isPermistted) {
            this.rdvService.findByIdWithAssociatedList(rdv).subscribe(res => {
                this.selectedRdv = res;
                // this.selectedRdv.dateRdv = new Date(rdv.dateRdv);
                this.selectedRdv.dateRdv = this.datepipe.transform(this.selectedRdv.dateRdv, 'yyyy-MM-dd HH:mm:ss');
                this.selectedRdv.dateArchivage = new Date(rdv.dateArchivage);
                this.selectedRdv.dateCreation = new Date(rdv.dateCreation);
                this.viewRdvDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
    }

    addEvents() {
        this.rdvs.forEach(e => {
            this.event = {
                title: e.patientVo.nom + ' ' + e.patientVo.prenom,
                start: e.dateRdv,
                end: e.dateRdv,
                displayEventTime: true,
            };
            this.Events.push(this.event);
            console.log(this.event);
        })
    }

    calendarOptions: CalendarOptions = {
        eventDidMount: this.handleEventHover.bind(this),
        initialView: 'dayGridMonth',
        timeZone: 'local', // the default (unnecessary to specify)
        dateClick: this.handleDateClick.bind(this), // bind is important!
        eventClick: this.handleEventClick.bind(this),
        // events: [
        //     { title: 'event 1', date: '2022-06-01' },
        //     { title: 'event 2', date: '2022-06-02' }
        // ]
        events: this.Events,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        eventTimeFormat: {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            meridiem: false
        }
    };

    handleDateClick(arg) {
        // alert('date click! ' + arg.dateStr)
        this.openCreateRdv('Rdv');
    }

    handleEventClick() {
        this.viewRdv(this.selectedRdv);
        console.log('click on event works');
    }

    handleEventHover(info) {
        tippy(info.el, {
            content: info.event.title,
        })
    }

    // getters and setters

    get rdvs(): Array<RdvVo> {
        return this.rdvService.rdvs;
    }

    set rdvs(value: Array<RdvVo>) {
        this.rdvService.rdvs = value;
    }

    get rdvSelections(): Array<RdvVo> {
        return this.rdvService.rdvSelections;
    }

    set rdvSelections(value: Array<RdvVo>) {
        this.rdvService.rdvSelections = value;
    }

    get selectedRdv(): RdvVo {
        return this.rdvService.selectedRdv;
    }

    set selectedRdv(value: RdvVo) {
        this.rdvService.selectedRdv = value;
    }

    get createRdvDialog(): boolean {
        return this.rdvService.createRdvDialog;
    }

    set createRdvDialog(value: boolean) {
        this.rdvService.createRdvDialog = value;
    }

    get editRdvDialog(): boolean {
        return this.rdvService.editRdvDialog;
    }

    set editRdvDialog(value: boolean) {
        this.rdvService.editRdvDialog = value;
    }

    get viewRdvDialog(): boolean {
        return this.rdvService.viewRdvDialog;
    }

    set viewRdvDialog(value: boolean) {
        this.rdvService.viewRdvDialog = value;
    }

    get searchRdv(): RdvVo {
        return this.rdvService.searchRdv;
    }

    set searchRdv(value: RdvVo) {
        this.rdvService.searchRdv = value;
    }

    get dateFormat() {
        return environment.dateFormatList;
    }


}
