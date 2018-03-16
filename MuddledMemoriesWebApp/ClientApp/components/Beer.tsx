import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Beer extends React.Component<{}, {}> {

    constructor() {
        super();
        this.state = {
            height: window.innerHeight / 2,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    public render() {
        const css = {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
            flexWrap: "nowrap"
        } as React.CSSProperties;

        const imageCss = {
            height: window.innerHeight / 2,
            width: "auto"
        } as React.CSSProperties;
    
        const textCss = {
            fontSize: window.innerHeight / 5,
        } as React.CSSProperties;

        return <div style={css}>
            <h1 style={textCss}>BECAUSE</h1>
            <img style={imageCss} src="../images/MuddledMemories.png" />
            <h1 style={textCss}>BEER</h1>
        </div>;
    }

    public componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    public updateWindowDimensions() {
        this.setState({
            height: window.innerHeight / 2
        });
    }
}
