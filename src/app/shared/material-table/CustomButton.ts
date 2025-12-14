export class CustomButton {
  constructor(
    public button_icon: string,
    public click: (data: any) => void, // callback with data
    public show: (row:any) => boolean,
  ) {}
}
