/**
 * Application Routing
 */
import { Application } from '../index';

/**
 * Vendor Dependencies
 */
import { Data } from '../data/data';
import preloadjs from 'preload';

export const StaticAssetsStoreEvents = {
    PROGRESS: "staticassets:progress",
    COMPLETE: "staticassets:complete",
    FILELOADED: "staticassets:fileloaded",
    GET_RESULT: "staticassets:getresult",
    SEND_RESULT: "staticassets:sendresult"
}

export const PreloadConst = {
    HOST: "http://s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com/2015/meet-the-makers/images/"
}

export const PreloadEvents = {
    COMPLETE: "preloadAssets:complete"
}

export class Preload {
    constructor(){
        this.progress = 0;
        this.preload = new createjs.LoadQueue();
        this.preload.setMaxConnections(10);
        this.preload.on("progress", this.handleProgress, this);
        this.preload.on("fileload", this.handleFileLoad, this);
        this.preload.on("complete", this.handleCompleteProgress, this);
    }
    handleFileLoad(event){
    }

    handleProgress(event){
        this.progress = Math.ceil(event.progress*100);
        console.log(this.progress);
    }

    handleCompleteProgress(event){
        console.log('complete');
        Application.pipe.emit(PreloadEvents.COMPLETE);
    }

    loadAssets(array){
        array.forEach((item)=>{
            this.preload.loadFile({id: item.src, src: PreloadConst.HOST + item.src + '.jpg', crossOrigin: true });
        });
    }

}


export class StaticAssetsStore  {
    constructor(){
        this.maker = Application.maker;
        this.config = Data.config;
        this.assets = [];
        this.progress = 0;
        this.index = 0;

        // Preload the static assets
        this.preload = new createjs.LoadQueue();
        this.preload.setMaxConnections(10);
        this.preload.on("progress", this.handleProgress, this);
        this.preload.on("fileload", this.handleFileLoad, this);
        this.preload.on("complete", this.handleCompleteProgress, this);

        Application.pipe.on(StaticAssetsStoreEvents.GET_RESULT, _.bind(this.getResult, this))

        this.generateAssetsTokens();
        this.fetchMakerAssets();
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
        this.initialAssets = false;
    }

    processType(makerprefix, assetprefix, makercount, assetcount){
        this.config.makerAmbientTypes.forEach((type)=>{
            this.assets.push({
                "maker": makercount,
                "id": "maker"+makerprefix+makercount+"_"+assetprefix+assetcount+"_"+type,
                "type": type,
                "filename" : this.config.cdnProtocol + "://" + this.config.cdnHost + "/" + this.config.cdnBucket +
                (type === "jpg" ? this.config.imagesPrefix : this.config.videosPrefix)
                + this.config.makerAmbientPrefix + makerprefix+makercount +'_'+assetprefix+assetcount+'.'+type });
        });
    }

    getResult(id){
        Application.pipe.emit(StaticAssetsStoreEvents.SEND_RESULT, this.preload.getResult(id));
    }

    generateAssetsTokens(){
        for(var makercount = 1; makercount <= this.config.makercount; makercount++){
            for(var assetcount=1; assetcount <= this.config.ambientcount; assetcount++){
                if(assetcount < 10){
                    this.processType('0', '0', makercount, assetcount);

                }else{
                    this.processType('0','', makercount, assetcount);
                }
            }
        }
    }

    fetchMakerAssets(maker){
        let jpgs = this.assets.filter((item)=>{
            return item.type == "jpg";
        });
        jpgs.forEach((item)=>{
            this.preload.loadFile({id: item.id, src: item.filename, crossOrigin: true });
        });

    }

}
