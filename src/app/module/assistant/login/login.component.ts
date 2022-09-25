import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../controller/service/Auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
        this.authService.loginAssistant(username, passowrd);
    }

}
