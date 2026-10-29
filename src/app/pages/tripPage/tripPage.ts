import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trip-page',
  imports: [RouterLink],
  templateUrl: './tripPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripPage {}
