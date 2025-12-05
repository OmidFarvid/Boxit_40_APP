import {BaseEntity} from '../../models/base-entity.model';

export class User extends BaseEntity{
  firstName: string;
  lastName: string;
  username: string;
  mobile: string;
}
