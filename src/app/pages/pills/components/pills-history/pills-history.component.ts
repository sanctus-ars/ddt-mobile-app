import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IPills } from 'src/app/pages/pills/interface/pills.interface';
import { PillsService } from 'src/app/pages/pills/services/pills.service';
import * as moment from 'moment';
import { BaseComponent } from 'src/app/modules/base/components/base.component';
import { PopupModeEnum } from 'src/app/shared/enum/popup-mode.enum';
import { PillsItemDialogComponent } from 'src/app/pages/pills/components/pills-item-dialog/pills-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-pills-history',
  templateUrl: './pills-history.component.html',
  styleUrls: ['./pills-history.component.scss'],
})
export class PillsHistoryComponent extends BaseComponent implements OnInit {

  public pillsList: IPills[] = [];

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

  public isDrugEnable(pill): boolean {
    return moment(pill.startDate) <= moment(new Date()) && pill.indefinite || moment(new Date()) <= moment(pill.endDate);
  }

  public editAction(item: IPills): void {
    this.openDialog(PopupModeEnum.edit, item);
  }

  private initData(): void {
    this.subscriptions.add([
      this.pillsService.pillsList.subscribe((list: IPills[]) => {
        this.pillsList = list;
      })
    ]);
  }

  private openDialog(mode: PopupModeEnum, item?: IPills): void {
    const dialogRef = this.dialog.open(PillsItemDialogComponent, {
      width: '100%',
      height: '100%',
      data: {
        item,
        mode
      }
    });

    this.subscriptions.add([
      dialogRef.afterClosed().subscribe(async (result: { item: IPills, mode: PopupModeEnum }) => {
        if (result && result.item && result.mode === PopupModeEnum.edit){
          await this.editPill(result.item);
        } else if (result && result.item && result.mode === PopupModeEnum.remove) {
          await this.removePill(result.item.id);
        }
      })
    ]);
  }

  private removePill(id: string): Promise<void> {
    return this.pillsService.removePill(id)
      .then(async () => {
        await this.toastService.showSuccess('Лекарство успешно удалено');
      }).catch(async (error) => {
        await this.toastService.showError(error);
      });
  }

  private async editPill(item: IPills): Promise<void> {
    return this.pillsService.editPills(item)
      .then(async () => {
        await this.toastService.showSuccess('Прием лекарства успешно отредактирован');
      }).catch(async (error) => {
        await this.toastService.showError(error);
      });
  }


}
