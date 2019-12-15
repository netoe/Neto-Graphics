// The Definition of Builtin Applications to be Dynamically Loaded.

import React from 'react';

export interface IBuiltinApplication {
	default: React.FC;
	ApplicationHome?: React.FC;
}