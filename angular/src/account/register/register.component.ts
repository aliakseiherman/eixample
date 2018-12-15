import { Component, AfterViewInit, Injector } from "@angular/core";
import { ComponentBase } from "@shared/component-base";
import { AccountServiceProxy, RegisterOutput, RegisterInput } from "@shared/service-proxies/service-proxies";
import { AppConsts } from "@shared/AppConsts";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent extends ComponentBase implements AfterViewInit {

    registerForm: FormGroup;
    submitted = false;

    public input: RegisterInput;

    constructor(
        injector: Injector,
        private accountService: AccountServiceProxy,
        private formBuilder: FormBuilder
    ) {
        super(injector);
        this.clear();
    }

    get f() { return this.registerForm.controls; }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            userName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(): void {

        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.accountService.register(this.input)
            .finally(() => {

            })
            .subscribe((result: RegisterOutput) => {

                localStorage.setItem(AppConsts.auth.token, result.token);
                location.href = '/';
            });
    }
    ngAfterViewInit(): void {

    }

    private clear(): void {
        this.input = new RegisterInput();
    }
}