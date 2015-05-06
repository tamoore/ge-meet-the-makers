import register from './register'

const factory = () => {
	const registrar  = new Map()
	const accessor   = key => register( registrar, key, () => new Set() )

	return {
		on      : ( key, handler ) =>
			accessor( key ).add( handler ),

		off     : ( key, handler ) =>
			accessor( key ).delete( handler ),

		once    : ( key, handler ) =>
			accessor( key ).add( function occurence( ...args ){
				handler( ...args )
				accessor( key ).delete( occurence )
			} ),

		trigger : ( key, ...args ) =>
			registrar.get( key ).forEach( handler => handler( ...args ) )
	}
}

export default Object.assign( factory, factory() )
