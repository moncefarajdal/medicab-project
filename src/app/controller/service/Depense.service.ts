import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DepenseVo} from '../model/Depense.model';


@Injectable({
    providedIn: 'root'
})
export class DepenseService {
    private API = ''

    constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl + role.toLowerCase() + '/depense/';
        // })
        this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/depense/';
    }

    private _depenses: Array<DepenseVo>;
    private _selectedDepense: DepenseVo;
    private _depenseSelections: Array<DepenseVo>;
    private _createDepenseDialog: boolean;
    private _editDepenseDialog: boolean;
    private _viewDepenseDialog: boolean;
    public editDepense$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchDepense: DepenseVo;

    // methods

    public findAll() {
        return this.http.get<Array<DepenseVo>>(this.API);
    }

    public save(): Observable<DepenseVo> {
        return this.http.post<DepenseVo>(this.API, {
            ...this.selectedDepense,
        });
    }

    delete(depense: DepenseVo) {
        return this.http.delete<number>(this.API + 'id/' + depense.id);
    }

    public edit(): Observable<DepenseVo> {
        return this.http.put<DepenseVo>(this.API, this.selectedDepense);
    }

    public findByCriteria(depense: DepenseVo): Observable<Array<DepenseVo>> {
        return this.http.post<Array<DepenseVo>>(this.API + 'search', depense);
    }

    public findDepenseByDate(date: String): Observable<Array<DepenseVo>> {
        return this.http.post<Array<DepenseVo>>(this.API + 'depense', date);
    }

    public findByIdWithAssociatedList(depense: DepenseVo): Observable<DepenseVo> {
        return this.http.get<DepenseVo>(this.API + 'detail/id/' + depense.id);
    }

    // getters and setters

    get depenses(): Array<DepenseVo> {
        if (this._depenses == null) {
            this._depenses = new Array<DepenseVo>();
        }
        return this._depenses;
    }

    set depenses(value: Array<DepenseVo>) {
        this._depenses = value;
    }

    get selectedDepense(): DepenseVo {
        if (this._selectedDepense == null) {
            this._selectedDepense = new DepenseVo();
        }
        return this._selectedDepense;
    }

    set selectedDepense(value: DepenseVo) {
        this._selectedDepense = value;
    }

    get depenseSelections(): Array<DepenseVo> {
        if (this._depenseSelections == null) {
            this._depenseSelections = new Array<DepenseVo>();
        }
        return this._depenseSelections;
    }


    set depenseSelections(value: Array<DepenseVo>) {
        this._depenseSelections = value;
    }

    get createDepenseDialog(): boolean {
        return this._createDepenseDialog;
    }

    set createDepenseDialog(value: boolean) {
        this._createDepenseDialog = value;
    }

    get editDepenseDialog(): boolean {
        return this._editDepenseDialog;
    }

    set editDepenseDialog(value: boolean) {
        this._editDepenseDialog = value;
    }

    get viewDepenseDialog(): boolean {
        return this._viewDepenseDialog;
    }

    set viewDepenseDialog(value: boolean) {
        this._viewDepenseDialog = value;
    }

    get searchDepense(): DepenseVo {
        if (this._searchDepense == null) {
            this._searchDepense = new DepenseVo();
        }
        return this._searchDepense;
    }

    set searchDepense(value: DepenseVo) {
        this._searchDepense = value;
    }

}
