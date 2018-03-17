import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Beer extends React.Component<any, any> {

    constructor() {
        super();
        this.state = {
            height: window.innerHeight,
        };
        this.startAnimation = this.startAnimation.bind(this);
        this.animate = this.animate.bind(this);
        this.initialiseWindowDimensions = this.initialiseWindowDimensions.bind(this);
    }

    raf: number | null;

    public componentWillMount() {
    }

    public componentDidMount() {
        this.initialiseWindowDimensions();
        window.addEventListener('resize', this.startAnimation);
        this.startAnimation
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.startAnimation);
        if(this.raf !== null) {
            window.cancelAnimationFrame(this.raf);
            this.raf = null;
        }
    }

    private animate() {
        if (this.componentRef !== null) {
            var rect = this.componentRef.getBoundingClientRect();

            if (rect.height > window.innerHeight || rect.width > window.innerWidth) {
                this.setState({
                    height: this.state.height - 5,
                    width: this.state.width - 5
                });
            }
            else if (rect.height < window.innerHeight - 5 && rect.width < window.innerWidth - 5) {
                this.setState({
                    height: this.state.height + 5,
                    width: this.state.width + 5
                });
            }
            else {
                this.raf = null;
                return;
            }
        }
        this.raf = window.requestAnimationFrame(this.animate);
    }

    private componentRef: HTMLDivElement | null;
    public render() {
        const css = {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
            flexWrap: "nowrap"
        } as React.CSSProperties;

        const imageCss = {
            height: this.state.height / 2,
            width: "auto"
        } as React.CSSProperties;
    
        const textCss = {
            fontSize: this.state.height / 5,
        } as React.CSSProperties;

        return <div style={css} ref={(comp) => { this.componentRef = comp; }}>
            <h1 style={textCss}>BECAUSE</h1>
            <img style={imageCss} src="../images/MuddledMemories.png" />
            <h1 style={textCss}>BEER</h1>
        </div>;
    }


    public startAnimation() {
        this.raf = window.requestAnimationFrame(this.animate);
    }

    public initialiseWindowDimensions() {
        this.setState({
            height: window.innerHeight * 2,
            width: window.innerWidth * 2
        });
    }
}
