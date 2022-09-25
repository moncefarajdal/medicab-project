import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import {ConstanteVo} from '../model/Constante.model';


@Injectable({
    providedIn: 'root'
})
export class ConstanteService {
    private API = ''

    constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl + role.toLowerCase() + '/constante/';
        // })
        this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/constante/';
    }

    private _constantes: Array<ConstanteVo>;
    private _selectedConstante: ConstanteVo;
    private _constanteSelections: Array<ConstanteVo>;
    private _createConstanteDialog: boolean;
    private _editConstanteDialog: boolean;
    private _viewConstanteDialog: boolean;
    public editConstante$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchConstante: ConstanteVo;

    // methods
    public archiver(constante: ConstanteVo): Observable<ConstanteVo> {
        return this.http.put<ConstanteVo>(this.API + 'archiver/', constante);
    }

    public desarchiver(constante: ConstanteVo): Observable<ConstanteVo> {
        return this.http.put<ConstanteVo>(this.API + 'desarchiver/', constante);
    }

    public findAll() {
        return this.http.get<Array<ConstanteVo>>(this.API);
    }

    public save(): Observable<ConstanteVo> {
        return this.http.post<ConstanteVo>(this.API, {
            ...this.selectedConstante,
            dateCreation: moment(this.selectedConstante.dateCreation).format("YYYY-MM-DD")
        });
    }

    delete(constante: ConstanteVo) {
        return this.http.delete<number>(this.API + 'id/' + constante.id);
    }


    public edit(): Observable<ConstanteVo> {
        return this.http.put<ConstanteVo>(this.API, this.selectedConstante);
    }


    public findByCriteria(constante: ConstanteVo): Observable<Array<ConstanteVo>> {
        return this.http.post<Array<ConstanteVo>>(this.API + 'search', constante);
    }

    public findByIdWithAssociatedList(constante: ConstanteVo): Observable<ConstanteVo> {
        return this.http.get<ConstanteVo>(this.API + 'detail/id/' + constante.id);
    }

    // getters and setters


    get constantes(): Array<ConstanteVo> {
        if (this._constantes == null) {
            this._constantes = new Array<ConstanteVo>();
        }
        return this._constantes;
    }

    set constantes(value: Array<ConstanteVo>) {
        this._constantes = value;
    }

    get selectedConstante(): ConstanteVo {
        if (this._selectedConstante == null) {
            this._selectedConstante = new ConstanteVo();
        }
        return this._selectedConstante;
    }

    set selectedConstante(value: ConstanteVo) {
        this._selectedConstante = value;
    }

    get constanteSelections(): Array<ConstanteVo> {
        if (this._constanteSelections == null) {
            this._constanteSelections = new Array<ConstanteVo>();
        }
        return this._constanteSelections;
    }


    set constanteSelections(value: Array<ConstanteVo>) {
        this._constanteSelections = value;
    }

    get createConstanteDialog(): boolean {
        return this._createConstanteDialog;
    }

    set createConstanteDialog(value: boolean) {
        this._createConstanteDialog = value;
    }

    get editConstanteDialog(): boolean {
        return this._editConstanteDialog;
    }

    set editConstanteDialog(value: boolean) {
        this._editConstanteDialog = value;
    }

    get viewConstanteDialog(): boolean {
        return this._viewConstanteDialog;
    }

    set viewConstanteDialog(value: boolean) {
        this._viewConstanteDialog = value;
    }

    get searchConstante(): ConstanteVo {
        if (this._searchConstante == null) {
            this._searchConstante = new ConstanteVo();
        }
        return this._searchConstante;
    }

    set searchConstante(value: ConstanteVo) {
        this._searchConstante = value;
    }

}
