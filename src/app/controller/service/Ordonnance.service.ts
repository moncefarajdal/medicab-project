import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {OrdonnanceVo} from '../model/Ordonnance.model';


@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl  + role.toLowerCase() + '/ordonnance/';
        // })
         this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/ordonnance/';
    }
     private _ordonnances: Array<OrdonnanceVo> ;
     private _selectedOrdonnance: OrdonnanceVo;
     private _ordonnanceSelections: Array<OrdonnanceVo>;
     private _createOrdonnanceDialog: boolean;
     private _editOrdonnanceDialog: boolean;
     private _viewOrdonnanceDialog: boolean;
     public editOrdonnance$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchOrdonnance:OrdonnanceVo ;

    // methods
    public archiver(ordonnance: OrdonnanceVo): Observable<OrdonnanceVo> {
        return this.http.put<OrdonnanceVo>(this.API + 'archiver/' ,ordonnance);
    }
    public desarchiver(ordonnance: OrdonnanceVo): Observable<OrdonnanceVo> {
    return this.http.put<OrdonnanceVo>(this.API + 'desarchiver/' ,ordonnance);
    }

    public findAll(){
     return this.http.get<Array<OrdonnanceVo>>(this.API);
    }

    public save(): Observable<OrdonnanceVo> {
           return this.http.post<OrdonnanceVo>(this.API, {...this.selectedOrdonnance,dateCreation: moment(this.selectedOrdonnance.dateCreation).format("YYYY-MM-DD")});
    }

    delete(ordonnance: OrdonnanceVo) {
         return this.http.delete<number>(this.API + 'id/' + ordonnance.id);
    }


    public edit(): Observable<OrdonnanceVo> {
        return this.http.put<OrdonnanceVo>(this.API, this.selectedOrdonnance);
    }


     public findByCriteria(ordonnance:OrdonnanceVo):Observable<Array<OrdonnanceVo>>{
           return this.http.post<Array<OrdonnanceVo>>(this.API +'search', ordonnance);
    }

   public findByIdWithAssociatedList(ordonnance:OrdonnanceVo):Observable<OrdonnanceVo>{
         return this.http.get<OrdonnanceVo>(this.API + 'detail/id/' +ordonnance.id);
    }

    // getters and setters


    get ordonnances(): Array<OrdonnanceVo> {
    if(this._ordonnances==null){
    this._ordonnances=new Array<OrdonnanceVo>();
    }
return this._ordonnances;
       }

    set ordonnances(value: Array<OrdonnanceVo>) {
        this._ordonnances = value;
       }

    get selectedOrdonnance(): OrdonnanceVo {
    if(this._selectedOrdonnance==null){
    this._selectedOrdonnance=new OrdonnanceVo();
    }
           return this._selectedOrdonnance;
       }

    set selectedOrdonnance(value: OrdonnanceVo) {
        this._selectedOrdonnance = value;
       }

    get ordonnanceSelections(): Array<OrdonnanceVo> {
    if(this._ordonnanceSelections==null){
    this._ordonnanceSelections=new Array<OrdonnanceVo>();
    }
        return this._ordonnanceSelections;
       }


    set ordonnanceSelections(value: Array<OrdonnanceVo>) {
        this._ordonnanceSelections = value;
       }

    get createOrdonnanceDialog(): boolean {
        return this._createOrdonnanceDialog;
       }

    set createOrdonnanceDialog(value: boolean) {
        this._createOrdonnanceDialog = value;
       }

    get editOrdonnanceDialog(): boolean {
        return this._editOrdonnanceDialog;
       }

    set editOrdonnanceDialog(value: boolean) {
        this._editOrdonnanceDialog = value;
       }

    get viewOrdonnanceDialog(): boolean {
        return this._viewOrdonnanceDialog;
       }

    set viewOrdonnanceDialog(value: boolean) {
        this._viewOrdonnanceDialog = value;
       }

     get searchOrdonnance(): OrdonnanceVo {
     if(this._searchOrdonnance==null){
    this._searchOrdonnance=new OrdonnanceVo();
    }
        return this._searchOrdonnance;
    }

    set searchOrdonnance(value: OrdonnanceVo) {
        this._searchOrdonnance = value;
       }

}
