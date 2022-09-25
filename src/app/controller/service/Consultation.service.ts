import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ConsultationVo} from '../model/Consultation.model';


@Injectable({
    providedIn: 'root'
})
export class ConsultationService {
    private API = ''

    constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl + role.toLowerCase() + '/consultation/';
        // })
        this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/consultation/';
    }

    private _consultations: Array<ConsultationVo>;
    private _selectedConsultation: ConsultationVo;
    private _consultationSelections: Array<ConsultationVo>;
    private _createConsultationDialog: boolean;
    private _editConsultationDialog: boolean;
    private _viewConsultationDialog: boolean;
    public editConsultation$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchConsultation: ConsultationVo;

    // methods
    public archiver(consultation: ConsultationVo): Observable<ConsultationVo> {
        return this.http.put<ConsultationVo>(this.API + 'archiver/', consultation);
    }

    public desarchiver(consultation: ConsultationVo): Observable<ConsultationVo> {
        return this.http.put<ConsultationVo>(this.API + 'desarchiver/', consultation);
    }

    public findAll() {
        return this.http.get<Array<ConsultationVo>>(this.API);
    }

    public save(): Observable<ConsultationVo> {
        return this.http.post<ConsultationVo>(this.API, {
            ...this.selectedConsultation,
            dateCreation: moment(this.selectedConsultation.dateCreation).format("YYYY-MM-DD")
        });
    }

    delete(consultation: ConsultationVo) {
        return this.http.delete<number>(this.API + 'id/' + consultation.id);
    }

    public edit(): Observable<ConsultationVo> {
        return this.http.put<ConsultationVo>(this.API, this.selectedConsultation);
    }

    public findByCriteria(consultation: ConsultationVo): Observable<Array<ConsultationVo>> {
        return this.http.post<Array<ConsultationVo>>(this.API + 'search', consultation);
    }

    public findByIdWithAssociatedList(consultation: ConsultationVo): Observable<ConsultationVo> {
        return this.http.get<ConsultationVo>(this.API + 'detail/id/' + consultation.id);
    }

    // getters and setters

    get consultations(): Array<ConsultationVo> {
        if (this._consultations == null) {
            this._consultations = new Array<ConsultationVo>();
        }
        return this._consultations;
    }

    set consultations(value: Array<ConsultationVo>) {
        this._consultations = value;
    }

    get selectedConsultation(): ConsultationVo {
        if (this._selectedConsultation == null) {
            this._selectedConsultation = new ConsultationVo();
        }
        return this._selectedConsultation;
    }

    set selectedConsultation(value: ConsultationVo) {
        this._selectedConsultation = value;
    }

    get consultationSelections(): Array<ConsultationVo> {
        if (this._consultationSelections == null) {
            this._consultationSelections = new Array<ConsultationVo>();
        }
        return this._consultationSelections;
    }


    set consultationSelections(value: Array<ConsultationVo>) {
        this._consultationSelections = value;
    }

    get createConsultationDialog(): boolean {
        return this._createConsultationDialog;
    }

    set createConsultationDialog(value: boolean) {
        this._createConsultationDialog = value;
    }

    get editConsultationDialog(): boolean {
        return this._editConsultationDialog;
    }

    set editConsultationDialog(value: boolean) {
        this._editConsultationDialog = value;
    }

    get viewConsultationDialog(): boolean {
        return this._viewConsultationDialog;
    }

    set viewConsultationDialog(value: boolean) {
        this._viewConsultationDialog = value;
    }

    get searchConsultation(): ConsultationVo {
        if (this._searchConsultation == null) {
            this._searchConsultation = new ConsultationVo();
        }
        return this._searchConsultation;
    }

    set searchConsultation(value: ConsultationVo) {
        this._searchConsultation = value;
    }

}
