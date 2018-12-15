import { Injectable } from "@angular/core";
import { DialogComponent } from "@shared/components/dialog/dialog.component";


@Injectable()
export class Dialog {

    // dialogRef: MatDialogRef<DialogComponent>;

    constructor(
        // private dialog: MatDialog
    ) { }

    public confirm(title: string, message: string) {

        // this.dialogRef = this.dialog.open(DialogComponent);
        // this.dialogRef.componentInstance.title = title;
        // this.dialogRef.componentInstance.message = message;

        // var promise = new Promise((resolve, reject) => {

        //     this.dialogRef.afterClosed().subscribe(result => {
                
        //         if (result) {
        //             resolve();
        //         } else {
        //             reject();
        //         }
        //     });
        // });

        // return promise;
    }
}