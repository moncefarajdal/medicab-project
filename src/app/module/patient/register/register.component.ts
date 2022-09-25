import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../controller/service/Auth.service";
import {User} from "../../../controller/model/User.model";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm = new FormGroup({
        prenom: new FormControl('', Validators.required),
        nom: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        userName: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    submit() {
        const formValues = this.registerForm.value;
        const {prenom, nom, userName, password, email} = formValues;
        this.user.prenom = prenom;
        this.user.nom = nom;
        this.user.username = userName;
        this.user.password = password;
        this.user.email = email;
        this.authService.register();
    }

    get user(): User {
        return this.authService.user;
    }

    set user(value: User) {
        this.authService.user = value;
    }

}
