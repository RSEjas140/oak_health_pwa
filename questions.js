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
        "required": true,
        "image": null, 
        "info": null,
        "note": null,
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
        "required": true,
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
        "info": "This question is asking you to consider what is the stature of the tree in relation to its neighbours? A dominant tree (Score: 1) will rise above the average canopy height. A suppressed tree (Score: 5) will be overshadowed by other trees and may have a weak, poorly formed crown.",
        "note": "Score the tree's stature from dominant(1) to suppressed(5)"
    },
    {
        "id": 7,
        "label": "Where are you standing to collect your data?",
        "type": "radio",
        "options": ["Under Tree", "Away from Tree"],
        "required": true,
        "image": null,
        "info": null,
        "note": "Your position is important for the next question on crown transparency. Please stay in place until it’s completed.",
    },
    {
        "id": 8,
        "label": "How much of the tree crown is transparent ?",
        "type": "range",
        "required": true,
        "image": null,
        "info": "Select a representative area of foliage in the crown. Treat the foliage as opaque and everything else (including the branches, sky, etc.) is treated as transparent. You are then estimate what percentage of the area is transparent.",
        "note": null
    },
    {
        "id": 9,
        "label": "How much of tree crown is missing ?",
        "type": "range",
        "required": true,
        "image": null,
        "info": "Treat this as a 3D assessment; please walk around the tree (wherever possible) and note the outline of the crown, look at areas within for branches that are dead or missing",
        "note": null
    },
    {
        "id": 10,
        "label": "Are there signs of defoliation",
        "type": "radio",
        "options": ["Yes", "No"],
        "required": true,
        "image": null,
        "info": null,
        "note": "Check for areas where leaves are sparse or missing, or abnormal in their colour, texture or shape."
    },
    {
        "id": 11,
        "label": "What is the height of the lowest living crown ?",
        "type": "text",
        "required": true,
        "image": null,
        "info": "Measure the height of the lowest living crown, please ignore branches that do not form part of the crown.",
        "note": null
    },
    {
        "id": 12,
        "label": "What is the height of the tree ?",
        "type": "text",
        "image": null,
        "info": "Measure the total height of the tree from it's base to the tip of the crown.",
        "note": null
    },
    {
        "id": 13,
        "label": "What is the circumference at your breast height ?",
        "type": "text",
        "image": null,
        "info": "Where multiple stems emerge from the same tree, please measure the largest stem. If the stems are seperate at ground level, they should be treated as individual trees." ,
        "note": null
    },
    {
        "id": 14,
        "label": "What is the average number of active bleeds ?",
        "type": "text",
        "required": true,
        "image": null,
        "info": "Ensure you are ignoring any bleeds below 1m. Look at the whole stem and branches. How many cracks or holes in the bark are actively exuding a dark, viscous substance?",
        "note": "Ignore bleeds below 1m"
    },
    {
        "id": 15,
        "label": "What is the average length of the bleeds in centimetres ?",
        "type": "text",
        "required": true,
        "image": null,
        "info": "Measure from the top of the crack to the lowest point at which the dark substance has bled.",
        "note": null,
        "showIf": (answers) => parseFloat(answers[14]) > 0
    },
    {
        "id": 16,
        "label": "What is the average number of black stains ?",
        "type": "text",
        "required": true,
        "image": null,
        "info": "Ignoring anything below 1m, look at the whole stem and branches. How many cracks or holes in the bark are stained black?",
        "note": "Ignore stains below 1m"
    },
    {
        "id": 17,
        "label": "What is the average length of the stains?",
        "type": "number",
        "min": 1,
        "max": 140,
        "required": true,
        "image": null,
        "info": "Measure from the top of the crack to the lowest point at which the bark is stained black.",
        "note": "Please enter your answer in cm",
        "showIf": (answers) => parseFloat(answers[16]) > 0
    },
    {
        "id": 18,
        "label": "Is there evidence of fungal growth?",
        "type": "radio",
        "options": ["Yes", "No"],
        "required": true,
        "image": null,
        "info": null,
        "note": "Assess the whole tree. Can you see fungal fruiting bodies emerging from the bark?"
    }
];