import {ColumnHeader} from './Shared/column-header.decorator';

export class BaseEntity{
  id:string;
  @ColumnHeader('تاریخ ثبت',"",1000)
  shamsiInsertedDateTime:string;
  lastModifiedDateTime:string;
  lastModifiedUserId:string;
  categoryTitle:string;
  insertedDateTime:string;

}
