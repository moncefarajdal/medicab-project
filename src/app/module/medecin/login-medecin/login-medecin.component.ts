import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../controller/service/Auth.service";

@Component({
  selector: 'app-login-medecin',
  templateUrl: './login-medecin.component.html',
  styleUrls: ['./login-medecin.component.scss']
})
export class LoginMedecinComponent implements OnInit {

    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    submit() {
        const formValues = this.loginForm.value;
        const username = formValues.username;
        const passowrd = formValues.password;
        this.authService.loginMedecin(username, passowrd);
    }

}
