import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {UploadService} from "../../shared/services/upload.service";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    MainComponent
  ],
    imports: [
        CommonModule,
        MainRoutingModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatMenuModule,
        FlexLayoutModule
    ],
  providers: [
    DatePipe,
    UploadService
  ]

})
export class MainModule { }
