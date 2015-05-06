// If map has key, return value.
// Otherwise use factory to set and return the value.
export default ( map, key, factory ) =>
	map.has( key )
	? map.get( key )
	: map
		.set( key, factory() )
		.get( key )
