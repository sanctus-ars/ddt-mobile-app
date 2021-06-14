import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { IPills } from 'src/app/pages/pills/interface/pills.interface';
import { PillsService } from 'src/app/pages/pills/services/pills.service';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PillsItemDialogComponent } from 'src/app/pages/pills/components/pills-item-dialog/pills-item-dialog.component';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-pills-drugs',
  templateUrl: './pills-drugs.component.html',
  styleUrls: ['./pills-drugs.component.scss'],
})
export class PillsDrugsComponent extends BaseComponent implements OnInit {
  public showSearch: boolean = false;
  public searchControl: FormControl = new FormControl();
  public pillsList: IPills[] = [];
  public pillListSearch: IPills[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private toastService: ToastService,
    private pillsService: PillsService,
  ) {
    super(cd);
  }

  public ngOnInit() {
    this.initData();
  }

  public toggleSearchBarAction() {
    this.showSearch = !this.showSearch;
    if (this.showSearch === false) {
      this.pillListSearch =  this.pillsList;
    } else {
      this.pillListSearch = this.pillsList.filter((item) => {
        return item.name.toLowerCase().indexOf( this.searchControl.value.toLowerCase()) !== -1;
      });
    }
  }
  public isDrugEnable(pill): boolean {
    return moment(pill.startDate) <= moment(new Date()) && pill.indefinite || moment(new Date()) <= moment(pill.endDate);
  }

  private initData(): void {
      this.subscriptions.add([
        this.pillsService.pillsList.subscribe((list: IPills[]) => {
          this.pillsList = list;
          this.pillListSearch = list;
        }),
        this.searchControl.valueChanges.subscribe((value) => {
          this.pillListSearch = this.pillsList.filter((item) => {
            return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
          });
        })
      ]);
  }

  public createPillsTakingAction(item: IPills): void {
    const dialogRef = this.dialog.open(PillsItemDialogComponent, {
      width: '100%',
      height: '100%',
      data: {
        item,
        mode: PopupModeEnum.create,
      }
    })

    this.subscriptions.add([
      dialogRef.afterClosed().subscribe(async (result) => {
        if (result && result.item && result.mode === PopupModeEnum.create) {
          await this.addPill(result.item);
        }
      })
    ])
  }

  private async addPill(item: IPills): Promise<void> {
    return this.pillsService.addPill(item)
      .then(async () => {
        await this.toastService.showSuccess('Прием лекарства успешно добавлен');
      }).catch(async (error) => {
        await this.toastService.showError(error);
      });
  }
}
