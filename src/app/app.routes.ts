import { Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'login',
        pathMatch: 'full',
        
    },
    {
        path:'login',
        component:LoginComponent,
    },
    {
        path:'app-todo',
        component:TodoComponent,
    },
    // {
    //     path:'',
    //     component:Component

    // },
];
