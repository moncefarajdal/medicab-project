import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import {SupplementConsultationVo} from '../model/SupplementConsultation.model';


@Injectable({
    providedIn: 'root'
})
export class SupplementConsultationService {
    private API = ''

    constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl + role.toLowerCase() + '/supplementConsultation/';
        // })
        this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/supplementConsultation/';
    }

    private _supplementConsultations: Array<SupplementConsultationVo>;
    private _selectedSupplementConsultation: SupplementConsultationVo;
    private _supplementConsultationSelections: Array<SupplementConsultationVo>;
    private _createSupplementConsultationDialog: boolean;
    private _editSupplementConsultationDialog: boolean;
    private _viewSupplementConsultationDialog: boolean;
    public editSupplementConsultation$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchSupplementConsultation: SupplementConsultationVo;

    // methods

    public findAll() {
        return this.http.get<Array<SupplementConsultationVo>>(this.API);
    }

    public save(): Observable<SupplementConsultationVo> {
        return this.http.post<SupplementConsultationVo>(this.API, {
            ...this.selectedSupplementConsultation,
        });
    }

    delete(supplementConsultation: SupplementConsultationVo) {
        return this.http.delete<number>(this.API + 'id/' + supplementConsultation.id);
    }

    public edit(): Observable<SupplementConsultationVo> {
        return this.http.put<SupplementConsultationVo>(this.API, this.selectedSupplementConsultation);
    }

    public findByCriteria(supplementConsultation: SupplementConsultationVo): Observable<Array<SupplementConsultationVo>> {
        return this.http.post<Array<SupplementConsultationVo>>(this.API + 'search', supplementConsultation);
    }

    public findByIdWithAssociatedList(supplementConsultation: SupplementConsultationVo): Observable<SupplementConsultationVo> {
        return this.http.get<SupplementConsultationVo>(this.API + 'detail/id/' + supplementConsultation.id);
    }

    // getters and setters

    get supplementConsultations(): Array<SupplementConsultationVo> {
        if (this._supplementConsultations == null) {
            this._supplementConsultations = new Array<SupplementConsultationVo>();
        }
        return this._supplementConsultations;
    }

    set supplementConsultations(value: Array<SupplementConsultationVo>) {
        this._supplementConsultations = value;
    }

    get selectedSupplementConsultation(): SupplementConsultationVo {
        if (this._selectedSupplementConsultation == null) {
            this._selectedSupplementConsultation = new SupplementConsultationVo();
        }
        return this._selectedSupplementConsultation;
    }

    set selectedSupplementConsultation(value: SupplementConsultationVo) {
        this._selectedSupplementConsultation = value;
    }

    get supplementConsultationSelections(): Array<SupplementConsultationVo> {
        if (this._supplementConsultationSelections == null) {
            this._supplementConsultationSelections = new Array<SupplementConsultationVo>();
        }
        return this._supplementConsultationSelections;
    }


    set supplementConsultationSelections(value: Array<SupplementConsultationVo>) {
        this._supplementConsultationSelections = value;
    }

    get createSupplementConsultationDialog(): boolean {
        return this._createSupplementConsultationDialog;
    }

    set createSupplementConsultationDialog(value: boolean) {
        this._createSupplementConsultationDialog = value;
    }

    get editSupplementConsultationDialog(): boolean {
        return this._editSupplementConsultationDialog;
    }

    set editSupplementConsultationDialog(value: boolean) {
        this._editSupplementConsultationDialog = value;
    }

    get viewSupplementConsultationDialog(): boolean {
        return this._viewSupplementConsultationDialog;
    }

    set viewSupplementConsultationDialog(value: boolean) {
        this._viewSupplementConsultationDialog = value;
    }

    get searchSupplementConsultation(): SupplementConsultationVo {
        if (this._searchSupplementConsultation == null) {
            this._searchSupplementConsultation = new SupplementConsultationVo();
        }
        return this._searchSupplementConsultation;
    }

    set searchSupplementConsultation(value: SupplementConsultationVo) {
        this._searchSupplementConsultation = value;
    }

}
