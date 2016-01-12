<<<<<<< HEAD
export class BaseView {
    constructor(id){
=======
import React from 'react';

export class BaseView extends React.Component {
    constructor(id){
        super();
>>>>>>> 957e1911c6f61c0a16982467ca13029cb1c3e535
        this.el = document.getElementById(id);
    }
}