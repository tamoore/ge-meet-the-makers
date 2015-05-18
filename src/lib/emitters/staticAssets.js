/**
 * Application Routing
 */
import { Application } from '../index';

/**
 * Vendor Dependencies
 */
import preloadjs from 'preload';
import config from "../config";

export const StaticAssetsStoreEvents = {
    PROGRESS: "staticassets:progress",
    COMPLETE: "staticassets:complete",
    FILELOADED: "staticassets:fileloaded",
    GET_RESULT: "staticassets:getresult",
    SEND_RESULT: "staticassets:sendresult"
}

export class StaticAssetsStore  {
    constructor(){

        this.config = config.preload;
        this.assets = [];
        this.progress = 0;

        // Preload the static assets
        this.preload = new createjs.LoadQueue();
        this.preload.setMaxConnections(10);
        this.preload.on("progress", this.handleProgress, this);
        this.preload.on("fileload", this.handleFileLoad, this);
        this.preload.on("complete", this.handleCompleteProgress, this);

        Application.pipe.on(StaticAssetsStoreEvents.GET_RESULT, _.bind(this.getResult, this))

        this.generateAssetsTokens();
        this.fetchAssets();
    }

    handleFileLoad(event){
        Application.pipe.emit(StaticAssetsStoreEvents.FILELOADED, event);
    }

    handleProgress(event){
        this.progress = Math.ceil(event.progress*100);
        Application.pipe.emit(StaticAssetsStoreEvents.PROGRESS, this.progress);
    }

    handleCompleteProgress(event){
        Application.pipe.emit(StaticAssetsStoreEvents.COMPLETE);
    }

    processType(makerprefix, assetprefix, makercount, assetcount){
        this.config.MAKER_AMBIENT_TYPES.forEach((type)=>{
            this.assets.push({
                "id": "maker"+makerprefix+makercount+"_"+assetprefix+assetcount+"_"+type,
                "type": type,
                "filename" : this.config.CDN_PROTOCOL + "://" + this.config.CDN_HOST + "/" + this.config.CDN_BUCKET +
                (type === "jpg" ? this.config.IMAGES_PREFIX : this.config.VIDEOS_PREFIX)
                + this.config.MAKER_AMBIENT_PREFIX + makerprefix+makercount +'_'+assetprefix+assetcount+'.'+type });
        });
    }

    getResult(id){
        Application.pipe.emit(StaticAssetsStoreEvents.SEND_RESULT, this.preload.getResult(id));
    }

    generateAssetsTokens(){
        for(var makercount =1; makercount <= this.config.MAKER_COUNT; makercount++){
            for(var assetcount=1; assetcount <= this.config.MAKER_AMBIENT_COUNT; assetcount++){
                if(assetcount < 10){
                    this.processType('0', '0', makercount, assetcount);

                }else{
                    this.processType('0','', makercount, assetcount);
                }
            }
        }
    }

    fetchAssets(){
        let jpgs = this.assets.filter((item)=>{
            return item.type == "jpg";
        });
        jpgs.forEach((item)=>{
            this.preload.loadFile({id: item.id, src: item.filename, crossOrigin: true });
        });
    }
}
