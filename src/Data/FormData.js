export const choiceYesNo = [
    {
        "name": "No",
        "value": 0
    },
    {
        "name": "Yes",
        "value": 1
    },]
export const choiceGender = [
    {
        "name": "Female",
        "value": 0
    },
    {
        "name": "Male",
        "value": 1
    },
]
const choiceAge = Array(100).fill(1).map((n, i) => {
    const num = n + i
    return {
        "name": num,
        "value": num
    }
})

export const FormData = {
    "cols": 2,
    "items": [
        // {
        //     "Name": {
        //         "name": "Name",
        //         "type": "dropdown",
        //         "dropdown_items": choiceYesNo,
        //         "individual_col" : true
        //     }
        // },
        {

            "id": "gender",
            "name": "Gender",
            "type": "dropdown",
            "dropdown_items": choiceGender,
            "individual_col": false

        },
        {
            "id": "age",
            "name": "Age",
            "type": "dropdown",
            "dropdown_items": choiceAge,
            "individual_col": false
        },
        {
            "id": "smoking",
            "name": "Smoking",
            "type": "dropdown",
            "dropdown_items": choiceYesNo,
            "individual_col": false

        },
        {
            "id": "yellow_fingers",
            "name": "Yellow Fingers",
            "type": "dropdown",
            "dropdown_items": choiceYesNo,
            "individual_col": false
        },
        {
            "id": "anxiety",
            "name": "Anxiety",
            "type": "dropdown",
            "dropdown_items": choiceYesNo,
            "individual_col": false

        },
        {
            "id": "peer_pressure",
            "name": "Peer pressure",
            "type": "dropdown",
            "dropdown_items": choiceYesNo,
            "individual_col": false

        },
        {
            "id": "chronic_disease",
            "name": "Chronic disease",
            "type": "dropdown",
            "dropdown_items": choiceYesNo,
            "individual_col": false

        },
        {
            "id": "fatigue",
            "name": "Fatigue",
            "type": "dropdown",
            "dropdown_items": choiceYesNo,
            "individual_col": false

        },
        {
            "id": "allergy",
            "name": "Allergy",
            "type": "dropdown",
            "dropdown_items": choiceYesNo,
            "individual_col": false

        },
        {
            "id": "wheezing",
            "name": "Wheezing",
            "type": "dropdown",
            "dropdown_items": choiceYesNo,
            "individual_col": false

        },

        {
            "id": "alcohol",
            "name": "Alcohol",
            "type": "dropdown",
            "dropdown_items": choiceYesNo,
            "individual_col": false

        },
        {
            "id": "coughing",
            "name": "Coughing",
            "type": "dropdown",
            "dropdown_items": choiceYesNo,
            "individual_col": false

        },
        {
            "id": "shortness_of_breath",
            "name": "Shortness of breath",
            "type": "dropdown",
            "dropdown_items": choiceYesNo,
            "individual_col": false

        },
        {
            "id": "swallowing_difficulty",
            "name": "Swallowing difficulty",
            "type": "dropdown",
            "dropdown_items": choiceYesNo,
            "individual_col": false
        },
        {
            "id": "chest_pain",
            "name": "Chest pain",
            "type": "dropdown",
            "dropdown_items": choiceYesNo,
            "individual_col": false

        },

    ]

}