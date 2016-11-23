import React from 'react';
import { Link } from 'react-router';

export default function Lists() {
    return (
        <ul>
            <li>
                <Link to="list/1">List one</Link>
            </li>
            <li>
                <Link to="list/2">List two</Link>
            </li>
            <li>
                <Link to="list/3">List three</Link>
            </li>
            <li>
                <Link to="list/4">List four</Link>
            </li> 
        </ul>
    );
}