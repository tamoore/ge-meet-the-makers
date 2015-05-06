import $ from 'jquery';
import preloadjs from 'preload';
import config from "../config";
import { Base } from './Base'

export class Preload extends Base {
    constructor(){
        super();

        this.config = config.preload;
        this.assets = [];
        this.progress = 0;
        this.preload = new createjs.LoadQueue();
        this.preload.setMaxConnections(10);
        this.preload.on("progress", this.handleProgress, this);
        this.preload.on("fileload", this.handleFileLoad, this);
        this.preload.on("complete", this.handleCompleteProgress, this);

        this.generateAssetsTokens();
        this.fetchAssets();

    }

    handleFileLoad(event){
        this.trigger(Preload.FILELOADED, event);
    }

    handleProgress(event){
        this.progress = Math.ceil(event.progress*100);
        this.trigger(Preload.PROGRESS, this.progress);
    }

    handleCompleteProgress(event){
        this.trigger(Preload.COMPLETE);
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
        return this.preload.getResult(id);
    }

    generateAssetsTokens(){
        var makercount = 1;
        var assetcount = 1;


        while(makercount <= this.config.MAKER_COUNT){
            while(assetcount <= this.config.MAKER_AMBIENT_COUNT){
                if(assetcount < 10){
                    this.processType('0', '0', makercount, assetcount);

                }else{
                    this.processType('0','', makercount, assetcount);
                }
                assetcount++;
            }
            makercount++;
        }
    }

    getAmbientVideoSrc(makerid, videoid){
        return this.config.CDN_PROTOCOL +
            "://" + this.config.CDN_HOST +
            "/" + this.config.CDN_BUCKET +
            this.config.VIDEOS_PREFIX +
            this.config.MAKER_AMBIENT_PREFIX
            + makerid + '_' + videoid + '.mp4';
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

Preload.PROGRESS = "preload:progress";
Preload.COMPLETE = "preload:complete";
Preload.FILELOADED = "preload:fileloaded";

let preload;
export class PreloadFactory {
    constructor(){
        if(!preload){
            preload = new Preload();
            return preload;
        }else{
            return preload;
        }
    }
}