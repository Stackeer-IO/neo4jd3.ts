import Neo4jd3 from "../../../src/neo4jd3/neo4jd3";
import data from "./data";

const iconMap = {
    'home': 'F02DC',
    'gear': 'F0493',
    'birthday-cake': 'F00E9',
    'paw': 'F03E9',
    'credit-card': 'F0FEF',
    'laptop': 'F0322',
    'at': 'F01EE',
    'git': 'F02A2',
    'github': 'F02A4',
    'google': 'F02AD',
    'font-awesome': 'F003A',
    'map-marker': 'F034E',
    'exclamation': 'F0205',
    'language': 'F0672',
    'options': 'F0494',
    'lock': 'F08EB',
    'phone': 'F03F2',
    'folder-open': 'F0770',
    'comment': 'F017A',
    'user': 'F0004',
    'expand': 'F0616',
    'plus': 'F0415',
    'minus': 'F0374'
}
const imageMap = {
    'home': '1F3E0',
    'gear': '2699',
    'birthday-cake': '1F382',
    'cookie': '1F36A',
    'credit-card': '1F4B3',
    'file-cabinet': '1F5C4',
    'salute': '1F596',
    'floppy-disk': '1F4BE'
}

function init() {
    let neo4jd3 = new Neo4jd3('#neo4jd3', {
        highlight: [
            {
                class: 'Project',
                property: 'name',
                value: 'neo4jd3'
            }, {
                class: 'User',
                property: 'userId',
                value: 'eisman'
            }
        ],
        colors: {
            'Address': '#68bdf6',
            'Api': '#6dce9e',
            'BirthDate': '#faafc2',
            'Cookie': '#f2baf6',
            'CreditCard': '#ff928c',
            'Device': '#fcea7e',
            'Email': '#ffc766',
            'Git': '#405f9e',
            'Github': '#a5abb6',
            'Google': '#78cecb',
            'icons': '#b88cbb',
            'Ip': '#ced2d9',
            'Issues': '#e84646',
            'Language': '#fa5f86',
            'Options': '#ffab1a',
            'Password': '#fcda19',
            'Phone': '#797b80',
            'Project': '#c9d96f',
            'SecurityChallengeAnswer': '#47991f',
            'User': '#70edee',
            'zoomFit': '#ff75ea',
            'zoomIn': '#4eb800',
            'zoomOut': '#06203e'
        },
        iconMap: iconMap,
        icons: {
            'Address': 'home',
            'Api': 'gear',
            'BirthDate': 'birthday-cake',
            'Cookie': 'paw',
            'CreditCard': 'credit-card',
            'Device': 'laptop',
            'Email': 'at',
            'Git': 'git',
            'Github': 'github',
            'Google': 'google',
            'icons': 'font-awesome',
            'Ip': 'map-marker',
            'Issues': 'exclamation',
            'Language': 'language',
            'Options': 'options',
            'Password': 'lock',
            'Phone': 'phone',
            'Project': 'folder-open',
            'SecurityChallengeAnswer': 'comment',
            'User': 'user',
            'zoomFit': 'expand',
            'zoomIn': 'plus',
            'zoomOut': 'minus'
        },
        imageMap: imageMap,
        images: {
            'Address': 'home',
            'Api': 'gear',
            'BirthDate': 'birthday-cake',
            'Cookie': 'cookie',
            'CreditCard': 'credit-card',
            'Project': {
                properties: [{
                    name: 'name',
                    value: 'neo4jd3',
                    image: 'salute'
                }, {
                    name: 'name',
                    value: 'neo4j',
                    image: 'file-cabinet'
                }],
                defaultImage: 'floppy-disk'
            }
        },
        minCollision: 60,
        neo4jData: data,
        nodeRadius: 25,
        onNodeDoubleClick: function (node) {
            switch (node.id) {
                case '25':
                    // Google
                    window.open(node.properties.url, '_blank');
                    break;
                default:
                    var maxNodes = 5,
                    data = neo4jd3.randomD3Data(node, maxNodes);
                    neo4jd3.updateWithD3Data(data);
                    break;
            }
        },
        onRelationshipDoubleClick: function (relationship) {
            console.log('double click on relationship: ' + JSON.stringify(relationship));
        },
        zoomFit: false,
        useId: false
    });
}

window.onload = init;
