import { Component, Injector, Inject } from "@angular/core";
import { DialogData } from "@shared/interfaces/interfaces";

@Component({
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

    public title: string;
    public message: string;

    constructor(
        // public dialogRef: MatDialogRef<DialogComponent>
    ) { }

    onCancelClick(): void {
        // this.dialogRef.close(false);
    }

    onOkClick(): void {
        // this.dialogRef.close(true);
    }
}