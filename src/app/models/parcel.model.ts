import {BaseEntity} from './base-entity.model';
import {IBaseEntity} from './ibase-entity';
import {ColumnHeader} from './Shared/column-header.decorator';

export class Parcel extends BaseEntity implements IBaseEntity {

  @ColumnHeader('بارکد', "", 1)
  barcode: string;
  @ColumnHeader('کد مقصد', "", 2)
  regionCode: string;
  @ColumnHeader('وضعیت', "boolean", 3)
  sorted: boolean;
  @ColumnHeader('خروجی', "", 4)
  gateNumber: number | null;
  @ColumnHeader('زمان سورت', "datetime", 5)
  sortedDateTime: string;
  @ColumnHeader('نام مقصد', "", 6)
  regionTitle: string;

  Validate(): string {
    throw new Error("Method not implemented.");
  }
}
