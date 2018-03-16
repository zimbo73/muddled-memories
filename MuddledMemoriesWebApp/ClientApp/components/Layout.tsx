import * as React from 'react';
import { Beer } from './Beer';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-12'>
                    <Beer />
                </div>
            </div>
        </div>;
    }
}
