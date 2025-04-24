// Full set of questions user is asked. Seperated to a different file for readability can be placed into app.js if desired.


//order is important that it is same as questions and then final meta data order is (uid,ts,long,lat)
export const headers = ['compartment_id','compartment_name', 'subcompartment_id', 'subcompartment_name' , 'tree_id', 'species', 'social_class', 'crown_obs', 'crown_transpar', 'cross_miss', 'defoli', 'live_crown',
'tree_height', 'dbh', 'active_bleeds', 'bleed_length', 'staining', 'stain_length', 'fungal_growth', 'uid','ts','longitude', 'latitude']

export const questions = [
    {
        "id": 0,
        "label": "Compartment ID",
        "type": "select",
        "options": [1, 2, 3, 4, 5, 6, 7, 8, 9],
        "required": true,
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 1,
        "label": "Compartment Name",
        "type": "text",
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 2,
        "label": "Sub-compartment ID",
        "type": "select",
        "options": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        "required": true,
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 3,
        "label": "Sub-compartment Name",
        "type": "text",
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 4,
        "label": "Tree Identifier",
        "type": "text",
        "required": true,
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 5,
        "label": "Species",
        "type": "select",
        "options": ["Quercus robur", "Quercus petraea"],
        "required": true,
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 6,
        "label": "Social Class",
        "type": "radio",
        "options": ["1", "2", "3", "4", "5"],
        "required": true,
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 7,
        "label": "Where are you standing to collect your data ?",
        "type": "radio",
        "options": ["Under Tree", "Away from Tree"],
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 8,
        "label": "How much of the tree crown is transparent ?",
        "type": "range",
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 9,
        "label": "How much of tree crown is missing ?",
        "type": "range",
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 10,
        "label": "Are there signs of defoliation",
        "type": "radio",
        "options": ["Yes", "No"],
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 11,
        "label": "What is the height of the lowest living crown ?",
        "type": "text",
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 12,
        "label": "What is the height of the tree ?",
        "type": "text",
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 13,
        "label": "What is the circumference at your breast height ?",
        "type": "text",
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 14,
        "label": "What is the average number of active bleeds ?",
        "type": "text",
        "image": "graphics/bleed.webp",
        "info": null,
        "note": null
    },
    {
        "id": 15,
        "label": "What is the average length of the bleeds in centimetres ?",
        "type": "text",
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 16,
        "label": "What is the average number of black stains ?",
        "type": "text",
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 17,
        "label": "What is the average length of the stains in centimetres ?",
        "type": "text",
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 18,
        "label": "Is there evidence of fungal growth ?",
        "type": "radio",
        "options": ["Yes", "No"],
        "image": null,
        "info": null,
        "note": null
    }
];