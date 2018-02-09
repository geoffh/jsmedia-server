/* jshint esversion: 6 */
class LocalService {
	constructor( inType, inVersion ) {
		this.mType = inType;
		this.mVersion = inVersion;
		this.mImplementations = {};
		this.mActions = {};
		this.mVariables = {};
		this.mServiceObject  = null;
		this.mNeedsNotify = false;
		
		setInterval( function() {
			if ( this.mNeedsNotify ) {
				this.mServiceObject.notify();
				this.mNeedsNotify = false;
			}
		}.bind( this ), 1000 );
	}

	addAction( inName, inInputs, inOutputs ) {
		this.mActions[ inName ] = {
			inputs: inInputs,
			outputs: inOutputs
		};
	}
		
	addImplementation( inObject, inUPNPActionName, inFunction, inCallback ) {
		this.mImplementations[ inUPNPActionName ] = function( inArgs, inCallback ) {
			return inFunction.call( inObject, inArgs, inCallback );
		};
	}
		
	addImplementations( inObject, inImplementations ) {
		for ( let theName in inImplementations ) {
			if ( inImplementations.hasOwnProperty( theName ) ) {
				this.addImplementation( inObject, theName, inImplementations[ theName ] );
			}
		}
	}
		
	addVariable( inName, inType ) {
		this.mVariables[ inName ] = inType;
	}
		
	addVariables( inVariables ) {
		for ( let theName in inVariables ) {
			if ( inVariables.hasOwnProperty( theName ) ) {
				this.addVariable( theName, inVariables[ theName ] );
			}
		}
	}
		
	getOptions() {
		return {
			domain: "schemas-upnp-org",
			type: this.mType,
			version: this.mVersion,
			implementation: this.mImplementations,
			description: {
				actions: this.mActions,
				variables: this.mVariables
			}
		};
	}
		
	getServiceObject() {
		return this.mServiceObject;
	}
		
	notify() {			
	}
	
	getType() {
		return this.mType;
	}
	
	getVersion() {
		return this.mVersion;
	}

	set( inName, inValue ) {
		const theServiceObject = this.getServiceObject();
		if ( theServiceObject &&  inValue !== theServiceObject.get( inName ) ) {
			theServiceObject.set( inName, inValue );
			this.mNeedsNotify = true;
		}
	}
	
	setServiceObject( inServiceObject ) {
		this.mServiceObject = inServiceObject;
	}
}

module.exports = LocalService;