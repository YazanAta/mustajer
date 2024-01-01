import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user.service';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { switchMap } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

export const adminGuard: CanActivateFn = (route, state) => {
  return new Promise(resolve => {
    const us = inject(UserService)
    const as = inject(AuthService);
    const router = inject(Router);
    
    as.user.pipe(switchMap((user) => us.userInfo(user?.uid))).subscribe((user: User) => {
      console.log(user);
      if (user.role !== 'admin') {
        router.navigate(['/']);
        resolve(false);
      }
      resolve(true);
    });
  })

};
