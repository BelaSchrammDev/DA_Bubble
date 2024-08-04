import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../shared/service/users.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private formBuilder = inject(FormBuilder);
  private userservice = inject(UsersService);

  public signinForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });


  submitSignInForm(event: Event) {
    event.preventDefault();
    const rawValue = this.signinForm.getRawValue();
    if (rawValue.email && rawValue.password) {
      this.userservice
        .registerNewUser(rawValue.email, rawValue.password)
        .then(
          (user) => {
            console.log('User registered successfully:', user);
          }
        )
        .catch(
          (error) => {
            console.error('Error registering user:', error);
          });
    }
  }

}
