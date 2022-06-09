import { PKBlockUIService } from './_pk_shared/pk-block-UI/pk-block-ui.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Storehouse-Management-System';

  blockedDocument : boolean;

  constructor(
    private pkBlockUIService : PKBlockUIService
  ){}

  ngOnInit(): void {
    this.pkBlockUIService.blockSubject.subscribe(
      emitedValue => {this.blockedDocument = Boolean(emitedValue)}
    )
  }


}
