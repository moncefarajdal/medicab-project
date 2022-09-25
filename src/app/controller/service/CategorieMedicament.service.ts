import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CategorieMedicamentVo} from '../model/CategorieMedicament.model';


@Injectable({
  providedIn: 'root'
})
export class CategorieMedicamentService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl  + role.toLowerCase() + '/categorieMedicament/';
        // })
         this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/categorieMedicament/';
    }
     private _categorieMedicaments: Array<CategorieMedicamentVo> ;
     private _selectedCategorieMedicament: CategorieMedicamentVo;
     private _categorieMedicamentSelections: Array<CategorieMedicamentVo>;
     private _createCategorieMedicamentDialog: boolean;
     private _editCategorieMedicamentDialog: boolean;
     private _viewCategorieMedicamentDialog: boolean;
     public editCategorieMedicament$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCategorieMedicament:CategorieMedicamentVo ;

    // methods
    public archiver(categorieMedicament: CategorieMedicamentVo): Observable<CategorieMedicamentVo> {
        return this.http.put<CategorieMedicamentVo>(this.API + 'archiver/' ,categorieMedicament);
    }
    public desarchiver(categorieMedicament: CategorieMedicamentVo): Observable<CategorieMedicamentVo> {
    return this.http.put<CategorieMedicamentVo>(this.API + 'desarchiver/' ,categorieMedicament);
    }

    public findAll(){
     return this.http.get<Array<CategorieMedicamentVo>>(this.API);
    }

    public save(): Observable<CategorieMedicamentVo> {
           return this.http.post<CategorieMedicamentVo>(this.API, {...this.selectedCategorieMedicament,dateCreation: moment(this.selectedCategorieMedicament.dateCreation).format("YYYY-MM-DD")});
    }

    delete(categorieMedicament: CategorieMedicamentVo) {
         return this.http.delete<number>(this.API + 'id/' + categorieMedicament.id);
    }


    public edit(): Observable<CategorieMedicamentVo> {
        return this.http.put<CategorieMedicamentVo>(this.API, this.selectedCategorieMedicament);
    }


     public findByCriteria(categorieMedicament:CategorieMedicamentVo):Observable<Array<CategorieMedicamentVo>>{
           return this.http.post<Array<CategorieMedicamentVo>>(this.API +'search', categorieMedicament);
    }

   public findByIdWithAssociatedList(categorieMedicament:CategorieMedicamentVo):Observable<CategorieMedicamentVo>{
         return this.http.get<CategorieMedicamentVo>(this.API + 'detail/id/' +categorieMedicament.id);
    }

    // getters and setters


    get categorieMedicaments(): Array<CategorieMedicamentVo> {
    if(this._categorieMedicaments==null){
    this._categorieMedicaments=new Array<CategorieMedicamentVo>();
    }
return this._categorieMedicaments;
       }

    set categorieMedicaments(value: Array<CategorieMedicamentVo>) {
        this._categorieMedicaments = value;
       }

    get selectedCategorieMedicament(): CategorieMedicamentVo {
    if(this._selectedCategorieMedicament==null){
    this._selectedCategorieMedicament=new CategorieMedicamentVo();
    }
           return this._selectedCategorieMedicament;
       }

    set selectedCategorieMedicament(value: CategorieMedicamentVo) {
        this._selectedCategorieMedicament = value;
       }

    get categorieMedicamentSelections(): Array<CategorieMedicamentVo> {
    if(this._categorieMedicamentSelections==null){
    this._categorieMedicamentSelections=new Array<CategorieMedicamentVo>();
    }
        return this._categorieMedicamentSelections;
       }


    set categorieMedicamentSelections(value: Array<CategorieMedicamentVo>) {
        this._categorieMedicamentSelections = value;
       }

    get createCategorieMedicamentDialog(): boolean {
        return this._createCategorieMedicamentDialog;
       }

    set createCategorieMedicamentDialog(value: boolean) {
        this._createCategorieMedicamentDialog = value;
       }

    get editCategorieMedicamentDialog(): boolean {
        return this._editCategorieMedicamentDialog;
       }

    set editCategorieMedicamentDialog(value: boolean) {
        this._editCategorieMedicamentDialog = value;
       }

    get viewCategorieMedicamentDialog(): boolean {
        return this._viewCategorieMedicamentDialog;
       }

    set viewCategorieMedicamentDialog(value: boolean) {
        this._viewCategorieMedicamentDialog = value;
       }

     get searchCategorieMedicament(): CategorieMedicamentVo {
     if(this._searchCategorieMedicament==null){
    this._searchCategorieMedicament=new CategorieMedicamentVo();
    }
        return this._searchCategorieMedicament;
    }

    set searchCategorieMedicament(value: CategorieMedicamentVo) {
        this._searchCategorieMedicament = value;
       }

}
