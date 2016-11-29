import React from 'react';
import { button, primary, input } from 'glamor/ous';

export default function SignIn() {
    console.log('button', button);
    var a = new Object();
    a.name = 'test';

    return (
        <div>
            <button {...button} button {...primary}>
                SignIn
            </button>
            <input { ...input }/>
        </div>
    )
}