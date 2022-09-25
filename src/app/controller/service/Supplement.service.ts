import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import {SupplementVo} from '../model/Supplement.model';

@Injectable({
    providedIn: 'root'
})
export class SupplementService {
    private API = ''

    constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl + role.toLowerCase() + '/supplement/';
        // })
        this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/supplement/';
    }

    private _supplements: Array<SupplementVo>;
    private _selectedSupplement: SupplementVo;
    private _supplementSelections: Array<SupplementVo>;
    private _createSupplementDialog: boolean;
    private _editSupplementDialog: boolean;
    private _viewSupplementDialog: boolean;
    public editSupplement$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchSupplement: SupplementVo;

    // methods

    public findAll() {
        return this.http.get<Array<SupplementVo>>(this.API);
    }

    public save(): Observable<SupplementVo> {
        return this.http.post<SupplementVo>(this.API, {
            ...this.selectedSupplement,
        });
    }

    delete(supplement: SupplementVo) {
        return this.http.delete<number>(this.API + 'id/' + supplement.id);
    }

    public edit(): Observable<SupplementVo> {
        return this.http.put<SupplementVo>(this.API, this.selectedSupplement);
    }

    public findByCriteria(supplement: SupplementVo): Observable<Array<SupplementVo>> {
        return this.http.post<Array<SupplementVo>>(this.API + 'search', supplement);
    }

    public findByIdWithAssociatedList(supplement: SupplementVo): Observable<SupplementVo> {
        return this.http.get<SupplementVo>(this.API + 'detail/id/' + supplement.id);
    }

    // getters and setters

    get supplements(): Array<SupplementVo> {
        if (this._supplements == null) {
            this._supplements = new Array<SupplementVo>();
        }
        return this._supplements;
    }

    set supplements(value: Array<SupplementVo>) {
        this._supplements = value;
    }

    get selectedSupplement(): SupplementVo {
        if (this._selectedSupplement == null) {
            this._selectedSupplement = new SupplementVo();
        }
        return this._selectedSupplement;
    }

    set selectedSupplement(value: SupplementVo) {
        this._selectedSupplement = value;
    }

    get supplementSelections(): Array<SupplementVo> {
        if (this._supplementSelections == null) {
            this._supplementSelections = new Array<SupplementVo>();
        }
        return this._supplementSelections;
    }

    set supplementSelections(value: Array<SupplementVo>) {
        this._supplementSelections = value;
    }

    get createSupplementDialog(): boolean {
        return this._createSupplementDialog;
    }

    set createSupplementDialog(value: boolean) {
        this._createSupplementDialog = value;
    }

    get editSupplementDialog(): boolean {
        return this._editSupplementDialog;
    }

    set editSupplementDialog(value: boolean) {
        this._editSupplementDialog = value;
    }

    get viewSupplementDialog(): boolean {
        return this._viewSupplementDialog;
    }

    set viewSupplementDialog(value: boolean) {
        this._viewSupplementDialog = value;
    }

    get searchSupplement(): SupplementVo {
        if (this._searchSupplement == null) {
            this._searchSupplement = new SupplementVo();
        }
        return this._searchSupplement;
    }

    set searchSupplement(value: SupplementVo) {
        this._searchSupplement = value;
    }

}
