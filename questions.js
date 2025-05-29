// Full set of questions user is asked. Seperated to a different file for readability but could be placed into app.js if desired.


//order is important that it is same as questions and then final meta data order is (uid,ts,long,lat)
// custom question skipping based on user answers to questions. If question order modified question skip params need to be updated

export const headers = ['compartment_id','subcompartment_id', 'tree_id', 'species', 'social_class', 'crown_obs', 'crown_transpar', 'cross_miss',  'live_crown',
'tree_height', 'dbh', 'active_bleeds', 'bleed_length', 'staining', 'stain_length', 'highest_stain_bleed', 'agrilus_emergence_holes', 'defoli', 'fungal_growth_tree',  'fungal_growth_roots', 'mildew',
 'photos_taken', 'uid','ts','longitude', 'latitude']

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
        "label": "Sub-compartment ID",
        "type": "select",
        "options": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
        "required": true,
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 2,
        "label": "Tree Identifier",
        "type": "text",
        "required": true,
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 3,
        "label": "Species",
        "type": "select",
        "options": ["Quercus robur", "Quercus petraea", "Hybrid", "Unknown Native Oak"],
        "required": true,
        "image": null,
        "info": null,
        "note": null
    },
    {
        "id": 4,
        "label": "Social Class",
        "type": "radio",
        "options": ["1. Dominant (No neighbour is taller)", "2. Co-dominant (Neighbours are the same height)", "3. Sub-dominant (Neighbours taller, but not shaded)", "4 - Suppressed (Shaded out by neighbours)"],
        "required": true,
        "image": null,
        "info": "What is the stature of the tree in relation to it's neighbours? 1. Dominant (no neighbour is taller) 2. Co-dominant (neighbours are same height) 3.Sub-dominant (Neighbours taller, but not shaded) 4.Suppressed (shaded out by neighbours)",
        "note": "Score the tree's stature from dominant(1) to suppressed(5)"
    },

    {
        "id": 5,
        "label": "How much of tree crown is missing ?",
        "type": "range",
        "rmin": 5,
        "rmax": 95,
        "rstep": 5,
        "required": true,
        "image": null,
        "info": "This is a 3D assessment; walk around the tree and note the outline of the crown, looking for areas within where branches are dead or missing.",
        "note": null
    },

    {
        "id": 6,
        "label": "Where are you standing to collect your data?",
        "type": "radio",
        "options": ["Under Tree", "Away from Tree"],
        "required": true,
        "image": null,
        "info": null,
        "note": "Your position is important for the next question on crown transparency. Please stay in place until it’s completed.",
    },
    {
        "id": 7,
        "label": "How much of the tree crown is transparent ?",
        "type": "range",
        "rmin": 5,
        "rmax": 100,
        "rstep": 5,
        "required": true,
        "image": "graphics/Transparencyguide.png",
        "info": "Select a representative area of foliage in the crown you are surveying. The foliage is treated as opaque; everything else, including the branches is treated as transparent.",
        "note": null
    },
    

    {
        "id": 8,
        "label": "Are there signs of insect defoliation?",
        "type": "radio",
        "options": ["Yes", "No"],
        "required": true,
        "image": null,
        "info": null,
        "note": "Are there areas where leaves are sparse or missing, or abnormal in their colour, texture or shape?"
    },
    
    {
        "id": 9,
        "label": "What is the height of the lowest living crown?",
        "type": "number",
        "min": 1,
        "max": 40,
        "required": false,
        "image": null,
        "info": "Measure the height of the lowest living crown, ignoring branches that do not form part of the crown. ",
        "note": "Please provide your answer in metres"
    },
    {
        "id": 10,
        "label": "What is the height of the tree?",
        "type": "number",
        "min": 1,
        "max": 50,
        "required": false,
        "image": null,
        "info": "Measure the total height of the tree from it's base to the tip of the crown.",
        "note": null
    },
    {
        "id": 11,
        "label": "What is the circumference(cm) at 1.3m from the ground? ",
        "type": "number",
        "min": 50,
        "max": 1000,
        "image": null,
        "info": "Measure at 1.3m on the stem in cm. Where multiple stems emerge from the same tree, measure the largest stem. If the stems are seperate at ground level, treat them as individual trees. ",
        "note": null
    },
    {
        "id": 12,
        "label": "What is the average number of active bleeds (liquid currently running out of bark crack) ?",
        "type": "number",
        "min": 0,
        "max": 100,
        "required": true,
        "image": "graphics/activebleed.jpg",
        "info": "Look at the whole stem and branches. How many points have liquid currently running out of bark cracks?",
        "note": null
    },
    {
        "id": 13,
        "label": "What is the average length of the bleeds (in centimetres) ?",
        "type": "number",
        "min": 1,
        "max": 140,
        "required": true,
        "image": "graphics/activebleed.jpg",
        "info": "Measure from the top of the crack to the lowest point at which the dark substance has bled.",
        "note": null,
        "showIf": (answers) => parseFloat(answers[12]) > 0
    },
    
    {
        "id": 14,
        "label": "What is the average number of dry black stains?",
        "type": "number",
        "min": 0,
        "max": 100,
        "required": true,
        "image": "graphics/blackstain.JPG",
        "info": "Ignoring anything below 1m, look at the whole stem and branches. How many cracks or holes in the bark are stained black?",
        "note": ""
    },
    {
        "id": 15,
        "label": "What is the average length of the stains in cm?",
        "type": "number",
        "min": 1,
        "max": 140,
        "required": true,
        "image": "graphics/blackstain.JPG",
        "info": "Measure from the top of the crack to the lowest point at which the bark is stained black.",
        "note": null,
        "showIf": (answers) => parseFloat(answers[14]) > 0
    },
    {
        "id": 16,
        "label": "What is the height of the highest bleed or stain (in metres) ?",
        "type": "number",
        "min": 1,
        "max": 50,
        "required": true,
        "image": "graphics/activebleed.jpg",
        "info": null,
        "note": null,
        "showIf": (answers) => parseFloat(answers[12]) > 0 || parseFloat(answers[14]) > 0
    },
    {
        "id": 17,
        "label": "Are there D-shaped Agrilus emergence holes?",
        "type": "radio",
        "options": ["Yes", "No"],
        "required": true,
        "image": null,
        "info": null,
        "note": "Look at the stem- can you see distinctive D-shaped emergence holes of the Agrilus beetle?"
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
    },
    {
        "id": 19,
        "label": "Are there signs of fungal fruiting bodies near the roots?",
        "type": "radio",
        "options": ["Yes", "No"],
        "required": true,
        "image": null,
        "info": null,
        "note": null,
    },
    {
        "id": 20,
        "label": "Are there signs of mildew?",
        "type": "radio",
        "options": ["Yes", "No"],
        "required": true,
        "image": null,
        "info": null,
        "note": null,
    },
    
    {
        "id": 21,
        "label": "Please take supporting photos of any stem symptoms and indicate if you have here.",
        "type": "radio",
        "options": ["Yes", "No"],
        "required": true,
        "image": null,
        "info": null,
        "note": null,
    }
];