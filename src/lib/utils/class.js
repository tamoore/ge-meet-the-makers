import register from './register'


const registrar = Symbol()
const accessor  = Symbol()

class observer {
	constructor(){
		this[ registrar ] = new Map()
		this[ accessor  ] = key => register( this[ registrar ], key, () => new Set() )
	}

	on( key, handler ){
		this[ accessor ]( key ).add( handler )
	}

	off( key, handler ){
		this[ accessor ]( key ).delete( handler )
	}

	once( key, handler ){
		this[ accessor ]( key ).add( function occurence( ...args ){
			handler( ...args )
			this[ accessor ]( key ).delete( occurence )
		} )
	}

	trigger( key, ...args ){
		if(this[ registrar ].get( key )){
			this[ registrar ].get( key ).forEach( handler => handler( ...args ) )
		}

	}
}

export default observer;