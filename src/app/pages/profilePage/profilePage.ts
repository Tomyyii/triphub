import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profilePage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {}
