import { Application } from '../index';
import config from '../config';
import reqwest from 'reqwest';

export const DataEvents = {
    UPDATE: "dataevents:update",
    COMPLETE: "dataevents:complete"
}
export class Data  {
    constructor(){
        this.config = config.data;
        if(config.data && config.data.url){
            reqwest({
                url: this.config.url,
                method: 'GET',
                crossOrigin: true
            }).then(_.bind(this.handleDataResponse,this))
            .fail(_.bind(this.handleDataFailure, this))
            .always(_.bind(this.handleRequest, this));

        }
    }
    get data(){
        return this._data;
    }
    set data(o){
        this._data = o;
        Application.pipe.emit(DataEvents.UPDATE, this._data);
        Data.result = this._data;
    }

    handleDataResponse(resp){
        this.data = resp;
    }

    handleDataFailure(error, msg){
        throw new Error(msg);
    }
    handleRequest(){
        Application.pipe.emit(DataEvents.COMPLETE);
    }

}
