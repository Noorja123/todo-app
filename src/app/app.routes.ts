import { Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { LoginComponent } from './components/login/login.component';
import { LoadingComponent } from './components/loading/loading.component';


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
        path: 'loading',
        component: LoadingComponent,
    },

    {
        path:'app-todo',
        component:TodoComponent,
    },
];
