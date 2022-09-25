import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CertificatVo} from '../model/Certificat.model';


@Injectable({
  providedIn: 'root'
})
export class CertificatService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl  + role.toLowerCase() + '/certificat/';
        // })
         this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/certificat/';
    }
     private _certificats: Array<CertificatVo> ;
     private _selectedCertificat: CertificatVo;
     private _certificatSelections: Array<CertificatVo>;
     private _createCertificatDialog: boolean;
     private _editCertificatDialog: boolean;
     private _viewCertificatDialog: boolean;
     public editCertificat$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCertificat:CertificatVo ;

    // methods
    public archiver(certificat: CertificatVo): Observable<CertificatVo> {
        return this.http.put<CertificatVo>(this.API + 'archiver/' ,certificat);
    }
    public desarchiver(certificat: CertificatVo): Observable<CertificatVo> {
    return this.http.put<CertificatVo>(this.API + 'desarchiver/' ,certificat);
    }

    public findAll(){
     return this.http.get<Array<CertificatVo>>(this.API);
    }

    public save(): Observable<CertificatVo> {
           return this.http.post<CertificatVo>(this.API, {...this.selectedCertificat,dateCreation: moment(this.selectedCertificat.dateCreation).format("YYYY-MM-DD")});
    }

    delete(certificat: CertificatVo) {
         return this.http.delete<number>(this.API + 'id/' + certificat.id);
    }


    public edit(): Observable<CertificatVo> {
        return this.http.put<CertificatVo>(this.API, this.selectedCertificat);
    }


     public findByCriteria(certificat:CertificatVo):Observable<Array<CertificatVo>>{
           return this.http.post<Array<CertificatVo>>(this.API +'search', certificat);
    }

   public findByIdWithAssociatedList(certificat:CertificatVo):Observable<CertificatVo>{
         return this.http.get<CertificatVo>(this.API + 'detail/id/' +certificat.id);
    }

    // getters and setters


    get certificats(): Array<CertificatVo> {
    if(this._certificats==null){
    this._certificats=new Array<CertificatVo>();
    }
return this._certificats;
       }

    set certificats(value: Array<CertificatVo>) {
        this._certificats = value;
       }

    get selectedCertificat(): CertificatVo {
    if(this._selectedCertificat==null){
    this._selectedCertificat=new CertificatVo();
    }
           return this._selectedCertificat;
       }

    set selectedCertificat(value: CertificatVo) {
        this._selectedCertificat = value;
       }

    get certificatSelections(): Array<CertificatVo> {
    if(this._certificatSelections==null){
    this._certificatSelections=new Array<CertificatVo>();
    }
        return this._certificatSelections;
       }


    set certificatSelections(value: Array<CertificatVo>) {
        this._certificatSelections = value;
       }

    get createCertificatDialog(): boolean {
        return this._createCertificatDialog;
       }

    set createCertificatDialog(value: boolean) {
        this._createCertificatDialog = value;
       }

    get editCertificatDialog(): boolean {
        return this._editCertificatDialog;
       }

    set editCertificatDialog(value: boolean) {
        this._editCertificatDialog = value;
       }

    get viewCertificatDialog(): boolean {
        return this._viewCertificatDialog;
       }

    set viewCertificatDialog(value: boolean) {
        this._viewCertificatDialog = value;
       }

     get searchCertificat(): CertificatVo {
     if(this._searchCertificat==null){
    this._searchCertificat=new CertificatVo();
    }
        return this._searchCertificat;
    }

    set searchCertificat(value: CertificatVo) {
        this._searchCertificat = value;
       }

}
