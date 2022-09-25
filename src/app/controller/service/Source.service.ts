import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {SourceVo} from '../model/Source.model';

@Injectable({
    providedIn: 'root'
})

export class SourceService {
    private API = ''

    constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl + role.toLowerCase() + '/source/';
        // })
        this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/source/';
    }

    private _sources: Array<SourceVo>;
    private _selectedSource: SourceVo;
    private _sourceSelections: Array<SourceVo>;
    private _createSourceDialog: boolean;
    private _editSourceDialog: boolean;
    private _viewSourceDialog: boolean;
    public editSource$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchSource: SourceVo;

    // methods

    public findAll() {
        return this.http.get<Array<SourceVo>>(this.API);
    }

    public save(): Observable<SourceVo> {
        return this.http.post<SourceVo>(this.API, {
            ...this.selectedSource,
        });
    }

    delete(source: SourceVo) {
        return this.http.delete<number>(this.API + 'id/' + source.id);
    }

    public edit(): Observable<SourceVo> {
        return this.http.put<SourceVo>(this.API, this.selectedSource);
    }

    public findByCriteria(source: SourceVo): Observable<Array<SourceVo>> {
        return this.http.post<Array<SourceVo>>(this.API + 'search', source);
    }

    public findByIdWithAssociatedList(source: SourceVo): Observable<SourceVo> {
        return this.http.get<SourceVo>(this.API + 'detail/id/' + source.id);
    }

    // getters and setters

    get sources(): Array<SourceVo> {
        if (this._sources == null) {
            this._sources = new Array<SourceVo>();
        }
        return this._sources;
    }

    set sources(value: Array<SourceVo>) {
        this._sources = value;
    }

    get selectedSource(): SourceVo {
        if (this._selectedSource == null) {
            this._selectedSource = new SourceVo();
        }
        return this._selectedSource;
    }

    set selectedSource(value: SourceVo) {
        this._selectedSource = value;
    }

    get sourceSelections(): Array<SourceVo> {
        if (this._sourceSelections == null) {
            this._sourceSelections = new Array<SourceVo>();
        }
        return this._sourceSelections;
    }


    set sourceSelections(value: Array<SourceVo>) {
        this._sourceSelections = value;
    }

    get createSourceDialog(): boolean {
        return this._createSourceDialog;
    }

    set createSourceDialog(value: boolean) {
        this._createSourceDialog = value;
    }

    get editSourceDialog(): boolean {
        return this._editSourceDialog;
    }

    set editSourceDialog(value: boolean) {
        this._editSourceDialog = value;
    }

    get viewSourceDialog(): boolean {
        return this._viewSourceDialog;
    }

    set viewSourceDialog(value: boolean) {
        this._viewSourceDialog = value;
    }

    get searchSource(): SourceVo {
        if (this._searchSource == null) {
            this._searchSource = new SourceVo();
        }
        return this._searchSource;
    }

    set searchSource(value: SourceVo) {
        this._searchSource = value;
    }

}
