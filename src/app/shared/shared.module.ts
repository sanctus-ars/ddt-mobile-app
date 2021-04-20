import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogButtonsComponent } from 'src/app/shared/components/dialog-buttons/dialog-buttons.component';
import { InputNumberComponent } from 'src/app/shared/components/input-number/input-number.component';
import { CommentComponent } from 'src/app/shared/components/comment/comment.component';
import { InputDateComponent } from 'src/app/shared/components/input-date/input-date.component';
import { InputWellBeingComponent } from 'src/app/shared/components/input-well-being/input-well-being.component';
import { InputTimeComponent } from 'src/app/shared/components/input-time/input-time.component';
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component';

const declarations = [
	CommentComponent,
	InputTimeComponent,
	InputTextComponent,
	InputDateComponent,
	InputNumberComponent,
	DialogButtonsComponent,
	InputWellBeingComponent,
];

const modules = [
	ReactiveFormsModule,
	MatDatepickerModule,
	FontAwesomeModule,
	MatTableModule,
	MatAutocompleteModule,
	MatBadgeModule,
	MatBottomSheetModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCardModule,
	MatCheckboxModule,
	MatChipsModule,
	MatStepperModule,
	MatDialogModule,
	MatDividerModule,
	MatExpansionModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatNativeDateModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatRadioModule,
	MatRippleModule,
	MatSelectModule,
	MatSidenavModule,
	MatSliderModule,
	MatSlideToggleModule,
	MatSnackBarModule,
	MatSortModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatTooltipModule,
	MatTreeModule,
	CommonModule,
	Ng2GoogleChartsModule,
	AmazingTimePickerModule,
];
@NgModule({
	declarations: [
		...declarations,
	],
	imports: [
		...modules
	],
	exports: [
		...modules,
		...declarations
	]
})
export class SharedModule { }
