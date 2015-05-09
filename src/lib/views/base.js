import React from 'react';

export class BaseView extends React.Component {
    constructor(id){
        super();
        this.el = document.getElementById(id);
    }
}