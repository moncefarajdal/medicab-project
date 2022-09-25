import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import {RdvVo} from '../model/Rdv.model';


@Injectable({
    providedIn: 'root'
})
export class RdvService {
    private API = ''

    constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl + role.toLowerCase() + '/rdv/';
        // })
        this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/rdv/';
    }

    private _rdvs: Array<RdvVo>;
    private _selectedRdv: RdvVo;
    private _rdvSelections: Array<RdvVo>;
    private _createRdvDialog: boolean;
    private _editRdvDialog: boolean;
    private _viewRdvDialog: boolean;
    public editRdv$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchRdv: RdvVo;

    // methods
    public archiver(rdv: RdvVo): Observable<RdvVo> {
        return this.http.put<RdvVo>(this.API + 'archiver/', rdv);
    }

    public desarchiver(rdv: RdvVo): Observable<RdvVo> {
        return this.http.put<RdvVo>(this.API + 'desarchiver/', rdv);
    }

    public findAll() {
        return this.http.get<Array<RdvVo>>(this.API);
    }

    public save(): Observable<RdvVo> {
        return this.http.post<RdvVo>(this.API, {
            ...this.selectedRdv,
            dateCreation: moment(this.selectedRdv.dateCreation).format("YYYY-MM-DD")
        });
    }

    delete(rdv: RdvVo) {
        return this.http.delete<number>(this.API + 'id/' + rdv.id);
    }

    public edit(): Observable<RdvVo> {
        return this.http.put<RdvVo>(this.API, this.selectedRdv);
    }

    public findByCriteria(rdv: RdvVo): Observable<Array<RdvVo>> {
        return this.http.post<Array<RdvVo>>(this.API + 'search', rdv);
    }

    public findByIdWithAssociatedList(rdv: RdvVo): Observable<RdvVo> {
        return this.http.get<RdvVo>(this.API + 'detail/id/' + rdv.id);
    }

    // getters and setters

    get rdvs(): Array<RdvVo> {
        if (this._rdvs == null) {
            this._rdvs = new Array<RdvVo>();
        }
        return this._rdvs;
    }

    set rdvs(value: Array<RdvVo>) {
        this._rdvs = value;
    }

    get selectedRdv(): RdvVo {
        if (this._selectedRdv == null) {
            this._selectedRdv = new RdvVo();
        }
        return this._selectedRdv;
    }

    set selectedRdv(value: RdvVo) {
        this._selectedRdv = value;
    }

    get rdvSelections(): Array<RdvVo> {
        if (this._rdvSelections == null) {
            this._rdvSelections = new Array<RdvVo>();
        }
        return this._rdvSelections;
    }


    set rdvSelections(value: Array<RdvVo>) {
        this._rdvSelections = value;
    }

    get createRdvDialog(): boolean {
        return this._createRdvDialog;
    }

    set createRdvDialog(value: boolean) {
        this._createRdvDialog = value;
    }

    get editRdvDialog(): boolean {
        return this._editRdvDialog;
    }

    set editRdvDialog(value: boolean) {
        this._editRdvDialog = value;
    }

    get viewRdvDialog(): boolean {
        return this._viewRdvDialog;
    }

    set viewRdvDialog(value: boolean) {
        this._viewRdvDialog = value;
    }

    get searchRdv(): RdvVo {
        if (this._searchRdv == null) {
            this._searchRdv = new RdvVo();
        }
        return this._searchRdv;
    }

    set searchRdv(value: RdvVo) {
        this._searchRdv = value;
    }

}
