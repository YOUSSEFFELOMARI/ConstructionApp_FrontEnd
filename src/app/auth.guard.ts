import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./services/auth-service";

export const authGuard: CanActivateFn = (route, state) => {
    //injecting dependencies
    const authService = inject(AuthService);
    const router = inject(Router);

    //
    if (authService.isAuthenticated) {
        return true;
    } else {
        // Redirect the user to the login page
        router.navigateByUrl('/login');
        return false;
    }

};
