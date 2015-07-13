import { Application } from '../index';
import reqwest from 'reqwest';

export const DataEvents = {
    UPDATE: "dataevents:update",
    COMPLETE: "dataevents:complete",
    CONFIG: "dataevents:config"
}
export class Data  {
    constructor(){
          this.getData = _.bind(this.getData, this);
          reqwest({
              url: 'http://cdn.labs.theguardian.com/2015/meet-the-makers/config/config.json',
              method: 'GET',
              crossOrigin: true
          }).then(this.getData);
    }
    get config(){
        return this._config;
    }
    set config(c){
        this._config = c;
        Data.config = c;
    }
    get data(){
        return this._data;
    }
    set data(o){
        this._data = o;
        Application.pipe.emit(DataEvents.UPDATE, this._data);
        Data.result = this._data;
    }

    getData(config){
        this.config = config;
        config.dataUrl = "http://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/scratch/testing/data.json";
        Application.pipe.emit(DataEvents.CONFIG, this._data);
        if(config.dataUrl){
            reqwest({
                url: config.dataUrl,
                method: 'GET',
                crossOrigin: true
            }).then(_.bind(this.handleDataResponse,this))
            .fail(_.bind(this.handleDataFailure, this))
            .always(_.bind(this.handleRequest, this));

        }
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
