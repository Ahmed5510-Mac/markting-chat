import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegestrationComponent } from './regestration/regestration.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { whatsappChatComponent } from './whatsapp-chat/whatsapp-chat.component';
import { UsersComponent } from './users/users.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatContengComponent } from './chat-conteng/chat-conteng.component';
import { CommonModule } from '@angular/common';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { AudioRecordingComponent } from './audio-recording/audio-recording.component';
import {ToastrModule} from 'ngx-toastr';
import { CustomerComponent } from './customer/customer.component';
import { EditComponent } from './edit/edit.component';
import { UpdateComponent } from './update/update.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { CustomerUpdatComponent } from './customer-updat/customer-updat.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { SearchPipe } from './pipes/search.pipe';
import { MultiSearchPipe } from './pipes/multi-search.pipe';
import { MultiSearchCustomPipe } from './pipes/multi-search-custom.pipe'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegestrationComponent,
    AboutComponent,
    NavbarComponent,
    NotfoundComponent,
    whatsappChatComponent,
    UsersComponent,
    SidebarComponent,
    ChatContengComponent,
    AudioRecordingComponent,
    CustomerComponent,
    EditComponent,
    UpdateComponent,
    MainSidebarComponent,
    CustomerUpdatComponent,
    AddCustomerComponent,
    SearchPipe,
    MultiSearchPipe,
    MultiSearchCustomPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    PickerModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
