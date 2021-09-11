import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';
import {ReactiveFormsModule} from "@angular/forms";


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {environment} from '../environments/environment';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DBConfig, NgxIndexedDBModule} from 'ngx-indexed-db';

import {TodoComponent} from './components/todo/todo.component';
import {EditableTextComponent} from './components/editable-text/editable-text.component';
import {TodoContainerComponent} from './components/todo-container/todo-container.component';
import {CreateTodoFormComponent} from './components/create-todo-form/create-todo-form.component';

import {AutoResizeTextareaDirective} from './directives/auto-resize-textarea.directive';

const dbConfig: DBConfig = {
  name: 'todo-angular-pwa',
  version: 1,
  objectStoresMeta: [{
    store: 'todos',
    storeConfig: {keyPath: 'id', autoIncrement: true},
    storeSchema: [
      {name: 'name', keypath: 'name', options: {unique: false}},
      {name: 'email', keypath: 'email', options: {unique: false}}
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    EditableTextComponent,
    AutoResizeTextareaDirective,
    CreateTodoFormComponent,
    TodoContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FontAwesomeModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
