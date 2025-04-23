// Full set of questions user is asked. Seperated to a different file for readability can be placed into app.js if desired.


//order is important that it is same as questions and then final meta data order is (uid,ts,long,lat)
export const headers = ['compartment_id','compartment name', 'subcompartment_id', 'subcompartment_name' , 'tree_id', 'species', 'social_class', 'crown_obs', 'crown_transpar', 'cross_miss', 'defoli', 'live_crown',
'tree_height', 'dbh', 'active_bleeds', 'bleed_length', 'staining', 'stain_length', 'fungal_growth', 'uid','ts','longitude', 'latitude']

export const questions = [
    {
        "label": "Compartment ID",
        "type": "select",
        "options": [
            1,2,3,4,5,6,7,8,9
        ],
        "required": true
    },
    {
        "label": "Compartment Name",
        "type": "text"
    },
    {
        "label": "Sub-compartment ID",
        "type": "select",
        "options": [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
            "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
        ],
        "required": true
    },
    {
        "label": "Sub-compartment Name",
        "type": "text"
    },
    {
        "label": "Tree Identifier",
        "type": "text",
        "required": true
    },
    {
        "label": "Species",
        "type": "select",
        "options": [
            "Quercus robur",
            "Quercus petraea"
        ],
        "required": true
    },
    {
        "label": "Social Class",
        "type": "radio",
        "options": [
            "1",
            "2",
            "3",
            "4",
            "5"
        ],
        "required": true
    },
    {
        "label": "Where are you standing to collect your data ?",
        "type": "radio",
        "options": [
            "Under Tree",
            "Away from Tree"
        ]
    },
    {
        "label": "How much of the tree crown is transparent ?",
        "type": "range",
        "note": ""
    },
    {
        "label": "How much of tree crown is missing ?",
        "type": "range",
        "note": ""
    },
    {
        "label": "Are there signs of defoliation",
        "type": "radio",
        "options": [
            "Yes",
            "No"
        ]
    },
    {
        "label": "What is the height of the lowest living crown ?",
        "type": "text"
    },
    {
        "label": "What is the height of the tree ?",
        "type": "text"
    },
    {
        "label": "What is the circumference at your breast height ?",
        "type": "text"
    },
    {
        "label": "What is the average number of active bleeds ?",
        "type": "text"
    },
    {
        "label": "What is the average length of the bleeds in centimetres ?",
        "type": "text"
    },
    {
        "label": "What is the average number of black stains ?",
        "type": "text"
    },
    {
        "label": "What is the average length of the stains in centimetres ?",
        "type": "text"
    },
    {
        "label": "Is there evidence of fungal growth ?",
        "type": "radio",
        "options": [
            "Yes",
            "No"
        ]
    }
];