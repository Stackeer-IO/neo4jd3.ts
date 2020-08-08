export default class NetworkState {
    container;
    info;

    node;
    nodes = [];

    relationship;
    relationshipOutline;
    relationshipOverlay;
    relationshipText;
    relationships = [];

    simulation;

    svg;
    svgNodes;
    svgRelationships;
    svgScale;
    svgTranslate;

    justLoaded = false;

    listeners: Map<string, Array<(any) => void>>;

    options: any = {
        arrowSize: 4,
        colors: {},
        highlight: undefined,
        iconMap: {},
        icons: undefined,
        imageMap: {},
        images: undefined,
        infoPanel: true,
        minCollision: undefined,
        neo4jData: undefined,
        neo4jDataUrl: undefined,
        nodeOutlineFillColor: undefined,
        nodeRadius: 25,
        defaultColor: '#a5abb6',
        zoomFit: false,
        useId: true,
    };
}
