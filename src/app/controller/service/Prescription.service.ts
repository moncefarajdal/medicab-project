import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PrescriptionVo} from '../model/Prescription.model';


@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        // this.role$ = this.roleService.role$;
        // this.role$.subscribe(role => {
        //     this.API = environment.apiUrl  + role.toLowerCase() + '/prescription/';
        // })
         this.API = environment.apiUrl + localStorage.getItem('role').substr(5, 20).toLocaleLowerCase() + '/prescription/';
    }
     private _prescriptions: Array<PrescriptionVo> ;
     private _selectedPrescription: PrescriptionVo;
     private _prescriptionSelections: Array<PrescriptionVo>;
     private _createPrescriptionDialog: boolean;
     private _editPrescriptionDialog: boolean;
     private _viewPrescriptionDialog: boolean;
     public editPrescription$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPrescription:PrescriptionVo ;

    // methods
    public archiver(prescription: PrescriptionVo): Observable<PrescriptionVo> {
        return this.http.put<PrescriptionVo>(this.API + 'archiver/' ,prescription);
    }
    public desarchiver(prescription: PrescriptionVo): Observable<PrescriptionVo> {
    return this.http.put<PrescriptionVo>(this.API + 'desarchiver/' ,prescription);
    }

    public findAll(){
     return this.http.get<Array<PrescriptionVo>>(this.API);
    }

    public save(): Observable<PrescriptionVo> {
           return this.http.post<PrescriptionVo>(this.API, {...this.selectedPrescription,dateCreation: moment(this.selectedPrescription.dateCreation).format("YYYY-MM-DD")});
    }

    delete(prescription: PrescriptionVo) {
         return this.http.delete<number>(this.API + 'id/' + prescription.id);
    }


    public edit(): Observable<PrescriptionVo> {
        return this.http.put<PrescriptionVo>(this.API, this.selectedPrescription);
    }


     public findByCriteria(prescription:PrescriptionVo):Observable<Array<PrescriptionVo>>{
           return this.http.post<Array<PrescriptionVo>>(this.API +'search', prescription);
    }

   public findByIdWithAssociatedList(prescription:PrescriptionVo):Observable<PrescriptionVo>{
         return this.http.get<PrescriptionVo>(this.API + 'detail/id/' +prescription.id);
    }

    // getters and setters


    get prescriptions(): Array<PrescriptionVo> {
    if(this._prescriptions==null){
    this._prescriptions=new Array<PrescriptionVo>();
    }
return this._prescriptions;
       }

    set prescriptions(value: Array<PrescriptionVo>) {
        this._prescriptions = value;
       }

    get selectedPrescription(): PrescriptionVo {
    if(this._selectedPrescription==null){
    this._selectedPrescription=new PrescriptionVo();
    }
           return this._selectedPrescription;
       }

    set selectedPrescription(value: PrescriptionVo) {
        this._selectedPrescription = value;
       }

    get prescriptionSelections(): Array<PrescriptionVo> {
    if(this._prescriptionSelections==null){
    this._prescriptionSelections=new Array<PrescriptionVo>();
    }
        return this._prescriptionSelections;
       }


    set prescriptionSelections(value: Array<PrescriptionVo>) {
        this._prescriptionSelections = value;
       }

    get createPrescriptionDialog(): boolean {
        return this._createPrescriptionDialog;
       }

    set createPrescriptionDialog(value: boolean) {
        this._createPrescriptionDialog = value;
       }

    get editPrescriptionDialog(): boolean {
        return this._editPrescriptionDialog;
       }

    set editPrescriptionDialog(value: boolean) {
        this._editPrescriptionDialog = value;
       }

    get viewPrescriptionDialog(): boolean {
        return this._viewPrescriptionDialog;
       }

    set viewPrescriptionDialog(value: boolean) {
        this._viewPrescriptionDialog = value;
       }

     get searchPrescription(): PrescriptionVo {
     if(this._searchPrescription==null){
    this._searchPrescription=new PrescriptionVo();
    }
        return this._searchPrescription;
    }

    set searchPrescription(value: PrescriptionVo) {
        this._searchPrescription = value;
       }

}
