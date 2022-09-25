import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';
import {TarifChargeVo} from '../model/TarifCharge.model';


@Injectable({
    providedIn: 'root'
})
export class TarifChargeService {
    private API = ''

    constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl + role.toLowerCase() + '/tarifCharge/';
        // })
        this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/tarifCharge/';
    }

    private _tarifCharges: Array<TarifChargeVo>;
    private _selectedTarifCharge: TarifChargeVo;
    private _tarifChargeSelections: Array<TarifChargeVo>;
    private _createTarifChargeDialog: boolean;
    private _editTarifChargeDialog: boolean;
    private _viewTarifChargeDialog: boolean;
    public editTarifCharge$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchTarifCharge: TarifChargeVo;
    private _fixedCharges: number;

    // methods

    public findAll() {
        return this.http.get<Array<TarifChargeVo>>(this.API);
    }

    public save(): Observable<TarifChargeVo> {
        return this.http.post<TarifChargeVo>(this.API, {
            ...this.selectedTarifCharge,
        });
    }

    public chargesFixe(): Observable<number> {
        return this.http.get<number>(this.API + 'charges-fixes/');
    }

    public charges() {
        return this.http.get<Array<TarifChargeVo>>(this.API + 'charges/');
    }

    delete(tarifCharge: TarifChargeVo) {
        return this.http.delete<number>(this.API + 'id/' + tarifCharge.id);
    }

    public edit(): Observable<TarifChargeVo> {
        return this.http.put<TarifChargeVo>(this.API, this.selectedTarifCharge);
    }

    public findByCriteria(tarifCharge: TarifChargeVo): Observable<Array<TarifChargeVo>> {
        return this.http.post<Array<TarifChargeVo>>(this.API + 'search', tarifCharge);
    }

    public findByIdWithAssociatedList(tarifCharge: TarifChargeVo): Observable<TarifChargeVo> {
        return this.http.get<TarifChargeVo>(this.API + 'detail/id/' + tarifCharge.id);
    }

    // getters and setters

    get tarifCharges(): Array<TarifChargeVo> {
        if (this._tarifCharges == null) {
            this._tarifCharges = new Array<TarifChargeVo>();
        }
        return this._tarifCharges;
    }

    set tarifCharges(value: Array<TarifChargeVo>) {
        this._tarifCharges = value;
    }

    get selectedTarifCharge(): TarifChargeVo {
        if (this._selectedTarifCharge == null) {
            this._selectedTarifCharge = new TarifChargeVo();
        }
        return this._selectedTarifCharge;
    }

    set selectedTarifCharge(value: TarifChargeVo) {
        this._selectedTarifCharge = value;
    }

    get tarifChargeSelections(): Array<TarifChargeVo> {
        if (this._tarifChargeSelections == null) {
            this._tarifChargeSelections = new Array<TarifChargeVo>();
        }
        return this._tarifChargeSelections;
    }


    set tarifChargeSelections(value: Array<TarifChargeVo>) {
        this._tarifChargeSelections = value;
    }

    get createTarifChargeDialog(): boolean {
        return this._createTarifChargeDialog;
    }

    set createTarifChargeDialog(value: boolean) {
        this._createTarifChargeDialog = value;
    }

    get editTarifChargeDialog(): boolean {
        return this._editTarifChargeDialog;
    }

    set editTarifChargeDialog(value: boolean) {
        this._editTarifChargeDialog = value;
    }

    get viewTarifChargeDialog(): boolean {
        return this._viewTarifChargeDialog;
    }

    set viewTarifChargeDialog(value: boolean) {
        this._viewTarifChargeDialog = value;
    }

    get searchTarifCharge(): TarifChargeVo {
        if (this._searchTarifCharge == null) {
            this._searchTarifCharge = new TarifChargeVo();
        }
        return this._searchTarifCharge;
    }

    set searchTarifCharge(value: TarifChargeVo) {
        this._searchTarifCharge = value;
    }

    get fixedCharges(): number {
        return this._fixedCharges;
    }

    set fixedCharges(value: number) {
        this._fixedCharges = value;
    }
}
