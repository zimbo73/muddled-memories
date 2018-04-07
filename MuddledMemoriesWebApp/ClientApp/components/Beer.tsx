import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router';

export class Beer extends React.Component<any, any> {

    constructor() {
        super();
        this.state = {
            height: window.innerHeight,
            width: window.innerWidth
        };
        this.startAnimation = this.startAnimation.bind(this);
        this.animate = this.animate.bind(this);
        this.initialiseWindowDimensions = this.initialiseWindowDimensions.bind(this);
    }

    raf: number | null;
    noChangeCount: number;

    public componentWillMount() {
        this.noChangeCount = 0;
    }

    public componentDidMount() {
        this.initialiseWindowDimensions();
        window.addEventListener('resize', this.startAnimation);
        this.startAnimation();
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.startAnimation);
        if(this.raf !== null) {
            window.cancelAnimationFrame(this.raf);
            this.raf = null;
        }
    }

    private getMaxWidth(parent: HTMLDivElement) {
        var maxWidth = 0;
        for (var i = 0; i < parent.children.length; i++) {
            var child = parent.children[i],
                rect = child.getBoundingClientRect();
            if (rect.width > maxWidth) {
                maxWidth = rect.width;
            }
        }
        return maxWidth;
    }

    private animate() {
        if (this.componentRef !== null) {
            var rect = this.componentRef.getBoundingClientRect(),
                maxWidth = this.getMaxWidth(this.componentRef);
            if (rect) {
                if (rect.height > window.innerHeight || maxWidth > window.innerWidth) {
                    this.setState({
                        height: this.state.height - 5,
                        width: this.state.width - 5
                    });
                    this.noChangeCount = 0;
                }
                else if (rect.height < window.innerHeight - 5 && maxWidth < window.innerWidth - 5) {
                    this.setState({
                        height: this.state.height + 5,
                        width: this.state.width + 5
                    });
                    this.noChangeCount = 0;
                }
                else {
                    this.noChangeCount = this.noChangeCount + 1;
                    if(this.noChangeCount > 10) {
                        this.raf = null;
                        return;
                    }
                }
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
        if(!this.raf) {
            this.noChangeCount = 0;
            this.raf = window.requestAnimationFrame(this.animate);
        }
    }

    public initialiseWindowDimensions() {
        this.setState({
            height: window.innerHeight * 2,
            width: window.innerWidth * 2
        });
    }
}
