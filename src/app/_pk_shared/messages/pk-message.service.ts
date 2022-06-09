import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PKMessageService {

  constructor(
    private messageService: MessageService,
    private translate: TranslateService)
    { }

    clearMessages() {
      this.messageService.clear();
    }

  showSuccessSaveMessage(){
    this.messageService.add({severity:'success', detail: this.translate.instant('sms.message.saveSuccess')});
  }

  showSuccessDeleteMessage(){
    this.messageService.add({severity:'success', detail: this.translate.instant('sms.message.deleteSuccess')});
  }

  showErrorMessage(message: string){
    this.messageService.add({severity:'error', detail: message});
  }
}
