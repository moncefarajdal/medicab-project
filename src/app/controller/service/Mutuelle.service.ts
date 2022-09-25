import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {MutuelleVo} from '../model/Mutuelle.model';


@Injectable({
    providedIn: 'root'
})
export class MutuelleService {
    private API = ''

    constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl + role.toLowerCase() + '/mutuelle/';
        // })
        this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/mutuelle/';
    }

    private _mutuelles: Array<MutuelleVo>;
    private _selectedMutuelle: MutuelleVo;
    private _mutuelleSelections: Array<MutuelleVo>;
    private _createMutuelleDialog: boolean;
    private _editMutuelleDialog: boolean;
    private _viewMutuelleDialog: boolean;
    public editMutuelle$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchMutuelle: MutuelleVo;

    // methods
    public archiver(mutuelle: MutuelleVo): Observable<MutuelleVo> {
        return this.http.put<MutuelleVo>(this.API + 'archiver/', mutuelle);
    }

    public desarchiver(mutuelle: MutuelleVo): Observable<MutuelleVo> {
        return this.http.put<MutuelleVo>(this.API + 'desarchiver/', mutuelle);
    }

    public findAll() {
        return this.http.get<Array<MutuelleVo>>(this.API);
    }

    public save(): Observable<MutuelleVo> {
        return this.http.post<MutuelleVo>(this.API, {
            ...this.selectedMutuelle,
            dateCreation: moment(this.selectedMutuelle.dateCreation).format("YYYY-MM-DD")
        });
    }

    delete(mutuelle: MutuelleVo) {
        return this.http.delete<number>(this.API + 'id/' + mutuelle.id);
    }


    public edit(): Observable<MutuelleVo> {
        return this.http.put<MutuelleVo>(this.API, this.selectedMutuelle);
    }


    public findByCriteria(mutuelle: MutuelleVo): Observable<Array<MutuelleVo>> {
        return this.http.post<Array<MutuelleVo>>(this.API + 'search', mutuelle);
    }

    public findByIdWithAssociatedList(mutuelle: MutuelleVo): Observable<MutuelleVo> {
        return this.http.get<MutuelleVo>(this.API + 'detail/id/' + mutuelle.id);
    }

    // getters and setters


    get mutuelles(): Array<MutuelleVo> {
        if (this._mutuelles == null) {
            this._mutuelles = new Array<MutuelleVo>();
        }
        return this._mutuelles;
    }

    set mutuelles(value: Array<MutuelleVo>) {
        this._mutuelles = value;
    }

    get selectedMutuelle(): MutuelleVo {
        if (this._selectedMutuelle == null) {
            this._selectedMutuelle = new MutuelleVo();
        }
        return this._selectedMutuelle;
    }

    set selectedMutuelle(value: MutuelleVo) {
        this._selectedMutuelle = value;
    }

    get mutuelleSelections(): Array<MutuelleVo> {
        if (this._mutuelleSelections == null) {
            this._mutuelleSelections = new Array<MutuelleVo>();
        }
        return this._mutuelleSelections;
    }


    set mutuelleSelections(value: Array<MutuelleVo>) {
        this._mutuelleSelections = value;
    }

    get createMutuelleDialog(): boolean {
        return this._createMutuelleDialog;
    }

    set createMutuelleDialog(value: boolean) {
        this._createMutuelleDialog = value;
    }

    get editMutuelleDialog(): boolean {
        return this._editMutuelleDialog;
    }

    set editMutuelleDialog(value: boolean) {
        this._editMutuelleDialog = value;
    }

    get viewMutuelleDialog(): boolean {
        return this._viewMutuelleDialog;
    }

    set viewMutuelleDialog(value: boolean) {
        this._viewMutuelleDialog = value;
    }

    get searchMutuelle(): MutuelleVo {
        if (this._searchMutuelle == null) {
            this._searchMutuelle = new MutuelleVo();
        }
        return this._searchMutuelle;
    }

    set searchMutuelle(value: MutuelleVo) {
        this._searchMutuelle = value;
    }

}
