import { PokemonCataloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { ProfilePage } from './pages/profile/profile.page';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import { LoginPage } from './pages/login/login.page';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login'
    },
    {
        path: 'login',
        component: LoginPage
    },
    {
        path:'profile',
        component: ProfilePage,
        canActivate: [AuthGuard]
    },
    {
        path:'pokemons',
        component: PokemonCataloguePage,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule{

}