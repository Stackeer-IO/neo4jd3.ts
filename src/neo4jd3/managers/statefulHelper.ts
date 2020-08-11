import * as d3 from "d3";
import NetworkState from "../state";

export default class StatefulHelper {
    private readonly state: NetworkState;

    constructor(state: NetworkState) {
        this.state = state;
    }

    dragEnded(d) {
        if (!d3.event.active) {
            this.state.simulation.alphaTarget(0);
        }

        if (typeof this.state.options.onNodeDragEnd === 'function') {
            this.state.options.onNodeDragEnd(d);
        }
    }

    static dragged(d) {
        StatefulHelper.stickNode(d);
    }

    dragStarted(d) {
        if (!d3.event.active) {
            this.state.simulation.alphaTarget(0.3).restart();
        }

        d.fx = d.x;
        d.fy = d.y;

        if (typeof this.state.options.onNodeDragStart === 'function') {
            this.state.options.onNodeDragStart(d);
        }
    }

    icon(d) {
        let code;

        if (this.state.options.iconMap && this.state.options.showIcons && this.state.options.icons) {
            if (this.state.options.icons[d.labels[0]] && this.state.options.iconMap[this.state.options.icons[d.labels[0]]]) {
                code = this.state.options.iconMap[this.state.options.icons[d.labels[0]]];
            } else if (this.state.options.iconMap[d.labels[0]]) {
                code = this.state.options.iconMap[d.labels[0]];
            } else if (this.state.options.icons[d.labels[0]]) {
                code = this.state.options.icons[d.labels[0]];
            }
        }

        return code;
    }

    image(d) {
        let imageKey = null;
        const labels = d.labels ?? [];
        const {images, imageMap} = this.state.options;

        for (const label of labels) {
            if (images && label in images) {
                const imageForLabel = images[label]
                if (imageForLabel instanceof Object) {
                    imageKey = imageForLabel['defaultImage']
                    if ('properties' in imageForLabel) {
                        imageForLabel['properties'].forEach(({name, value, image}) => {
                            if (name in d.properties && d.properties[name] === value) {
                                imageKey = image
                                return
                            }
                        })
                    }
                }

                imageKey = imageKey ?? imageForLabel
                const imageCode = imageMap[imageKey]
                return imageCode ? imageCode : null
            }
        }

        return null;
    }

    private static stickNode(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    toString(d) {
        const label = d.labels ? d.labels[0] : d.type;
        const properties = Object
            .entries(d.properties)
            .map(([prop, value]) => `${prop}: ${JSON.stringify(value)}`)

        const addInfo = []
        if (this.state.options.useId) {
            addInfo.push(`<id>: ${d.id}`)
        }
        if (properties.length > 0) {
            addInfo.push(properties.join(', '))
        }

        return addInfo.length
            ? `${label} (${addInfo.join(' ')})`
            : label
    }

    classToColor(cls) {
        let color = this.state.options.colors[cls];
        return color ?? this.defaultColor()
    }

    classToDarkenColor(cls) {
        return d3.rgb(this.classToColor(cls)).darker(1);
    }

    defaultColor() {
        return this.state.options.defaultColor;
    }

    defaultDarkenColor() {
        return d3.rgb(this.state.options.colors[this.state.options.colors.length - 1]).darker(1);
    }

    randomLabel() {
        const icons = Object.keys(this.state.options.iconMap);
        return icons[icons.length * Math.random() << 0];
    }
}
