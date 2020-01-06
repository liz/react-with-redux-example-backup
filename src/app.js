import React from 'react';

import SaveKey from './save-key';
import Listing from './listing';

const App = (props) => {
    if (props.apiKey && props.apiKey.key) {
       return <Listing apiKey={props.apiKey.key} />;
    }

    return <SaveKey />;
}

export default App
