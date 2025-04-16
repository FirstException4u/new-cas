import {FieldOptionInterfaces} from './FieldOption';
export interface FieldGroupInterfaces {
    fields: FieldOptionInterfaces[];
    register: any;
    errors: any;
    gridClasses?: string;
}