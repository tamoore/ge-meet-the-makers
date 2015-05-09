import events from 'event-emitter';

export class Base {
    constructor(){
        this.events = events(this);
    }
}





