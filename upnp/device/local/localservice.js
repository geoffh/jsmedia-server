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
		
		this.addAction = ( inName, inInputs, inOutputs ) => {
			this.mActions[ inName ] = {
				inputs: inInputs,
				outputs: inOutputs
			};
		};
		
		this.addImplementation = ( inObject, inUPNPActionName, inFunction, inCallback ) => {
			this.mImplementations[ inUPNPActionName ] = function( inArgs, inCallback ) {
				return inFunction.call( inObject, inArgs, inCallback );
			};
		};
		
		this.addImplementations = ( inObject, inImplementations ) => {
			for ( let theName in inImplementations ) {
				if ( inImplementations.hasOwnProperty( theName ) ) {
				    this.addImplementation( inObject, theName, inImplementations[ theName ] );
				}
			}
		};
		
		this.addVariable = ( inName, inType ) => this.mVariables[ inName ] = inType;
		
		this.addVariables = inVariables => {
			for ( let theName in inVariables ) {
				if ( inVariables.hasOwnProperty( theName ) ) {
				    this.addVariable( theName, inVariables[ theName ] );
				}
			}
		};
		
		this.getOptions = () => {
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
		};
		
		this.getServiceObject = () => this.mServiceObject;
		
		this.notify = () => {			
		};
		
		setInterval( function() {
			if ( this.mNeedsNotify ) {
				this.mServiceObject.notify();
				this.mNeedsNotify = false;
			}
		}.bind( this ), 1000 );
		
		this.set = ( inName, inValue ) => {
			const theServiceObject = this.getServiceObject();
			if ( theServiceObject &&  inValue !== theServiceObject.get( inName ) ) {
				theServiceObject.set( inName, inValue );
				this.mNeedsNotify = true;
			}
		};
	}
	
	getType() {
		return this.mType;
	}
	
	getVersion() {
		return this.mVersion;
	}
	
	setServiceObject( inServiceObject ) {
		this.mServiceObject = inServiceObject;
	}
}

module.exports = LocalService;