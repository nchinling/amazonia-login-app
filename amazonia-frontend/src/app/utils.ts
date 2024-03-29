import { inject } from "@angular/core";
import { CanActivateFn, CanDeactivateFn, Router} from "@angular/router";
import { AccountService } from "./account.service";

export interface LeaveComponent {
  canExit(): boolean
  getMessage(): string
}


export const loginGuard: CanActivateFn = (route, state) => {

    const router = inject(Router)
    const accountSvc = inject(AccountService)

    if (accountSvc.hasLogin() || accountSvc.isAuthenticated())
        return true
    return router.createUrlTree(['/'])
}

export const loginGuardManager: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const accountSvc = inject(AccountService)

  if ((accountSvc.hasLogin() || accountSvc.isAuthenticated()) && accountSvc.role === 'Manager')
      return true
  return router.createUrlTree(['restricted-warning'])
}

export const leaveComp: CanDeactivateFn<LeaveComponent> = (comp, currRoute, currState, nextState) => {
  if (comp.canExit())
    return true

  return confirm(comp.getMessage())
}


