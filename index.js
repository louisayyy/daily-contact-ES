/*EXPERIENCESAMPLER LICENSE
The MIT License (MIT)
Copyright (c) 2014-2020 Sabrina Thai & Elizabeth Page-Gould
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* activate localStorage */
var localStore = window.localStorage;

/* Create a global variable to hold network info */
var networkString;// = louisa you, louisa you, louisa , you, louisa, Person 6, Person 7, Person 8, Person 9, Person 10, Person 11, Person 12, Person 13, Person 14, Person 15, Person 16, Person 17, Person 18, Person 19, Person 20';

/* surveyQuestion Model (This time, written in "JSON" format to interface more cleanly with Mustache) */
/* This is used to input the questions you would like to ask in your experience sampling questionnaire*/
var surveyQuestions = [
/*number each question in this variable starting from 0, so it is easy to reference question items when setting up question logic*/
                       /*0*/
                       /*snooze question, where selecting "No" snoozes the app for a predetermined amount of time*/
                       {
                       "type":"mult1",
                       "variableName": "snooze",
                       "questionPrompt": "Are you able to take the survey now?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                {"label": "No"},
                                {"label": "Yes"}
                                ],
                       },
                       /* 1 genWell*/
                       {
                        "type":"mult1",
                        "variableName": "genWell",
                        "questionPrompt": "How are you doing right now?",
                        "minResponse": 1,
                        "maxResponse": 8,
                        "labels": [
                                {"label": "1 (Bad)"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 (Good)"},
                                {"label": "I choose not to answer"}
                            ]
                        },
                        /* 2 genStress*/
                        {
                        "type":"mult1",
                        "variableName": "genStress",
                        "questionPrompt": "Right now, how stressed, anxious, and overwhelmed do you feel?",
                        "minResponse": 1,
                        "maxResponse": 8,
                        "labels": [
                                {"label": "1 (Not at all)"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 (Completely)"},
                                {"label": "I choose not to answer"}
                            ]
                        },
                        /* 3 genCope*/
                        {
                        "type":"mult1",
                        "variableName": "genCope",
                        "questionPrompt": "Do you have what you need to cope with stressors right now?",
                        "minResponse": 1,
                        "maxResponse": 8,
                        "labels": [
                                {"label": "1 (Not at all)"},
                                {"label": "2"},
                                {"label": "3"},
                                {"label": "4"},
                                {"label": "5"},
                                {"label": "6"},
                                {"label": "7 (Completely)"},
                                {"label": "I choose not to answer"}
                            ]
                        },
                        /* 4 intBranch*/
                        {
                        "type": "mult1",
                        "variableName": "intBranch",
                        "questionPrompt": "Did you interact with anyone since you last completed a survey?",
                        "minResponse": 0,
                        "maxResponse": 1,
                        "labels": [
                                {"label": "No"},
                                {"label": "Yes"},
                                ]
                        },

                        /* BRANCH LOGIC HERE */
                        /* 5 intPartner*/
                        {
                        "type": "checklist2",
                        "variableName": "intPartner",
                        "questionPrompt": "Who was interacting with you?",
                        "minResponse": 1,
                        "maxResponse": 21,
                        "labels": [
                                {"label": "NAME"},
                                {"label": "Someone else"},
                            ]
                        },
                       /* 6 intDuration*/
                       {
                       "type":"number",
                       "variableName": "intDuration",
                       "questionPrompt": "What was the duration of the interaction in minutes?",
                       },
                       /* 7 intStarttime*/
                       {
                       "type":"timePicker",
                       "variableName": "intStarttime",
                       "questionPrompt": "What was the approximate start time of the interaction?",
                       },
                       /* 8 intInitiate*/
                       {
                       "type":"mult1",
                       "variableName": "intInitiate",
                       "questionPrompt": "Who initiated the interaction?",
                       "minResponse": 1,
                       "maxResponse": 4,
                       "labels": [
                                {"label": "Self"},
                                {"label": "Other"},
                                {"label": "Neither/Both"},
                                {"label": "I choose not to answer"}
                                ]
                       },
                       /* 9 intSupport*/
                       {
                        "type": "mult1",
                        "variableName": "intSupport",
                        "questionPrompt": "Did either you or the other person(s) seek social support?",
                        "minResponse": 0,
                        "maxResponse": 1,
                        "labels": [
                                {"label": "No"},
                                {"label": "Yes"},
                                ]
                       },
                       /* 10 intLocation*/
                       {
                        "type":"mult1",
                        "variableName": "intLocation",
                        "questionPrompt": "Where did the interaction take place?",
                        "minResponse": 1,
                        "maxResponse": 8,
                        "labels": [
                       			{"label": "In person"},
                       			{"label": "Phone conversation"},
                       			{"label": "Instant messaging (e.g. texting, messaging chat)"},
                       			{"label": "Video conference (e.g. Zoom, Skype, Teams"},
                                {"label": "Text communication (e.g. email)"},
                                {"label": "Social media or internet forum"},
                                {"label": "Other"},
                                {"label": "I choose not to answer"}
                                ]
                       },
                       /* 11 */
                       {
                        "type":"text",
                        "variableName": "intLocationOther",
                        "questionPrompt": "Please describe where the interaction took place.",
                       },

                        /* 12 intConflict*/
                       {
                       "type":"mult1",
                       "variableName": "intConflict",
                       "questionPrompt": "Was there any conflict during the interaction?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                       			{"label": "No"},
                       			{"label": "Yes"},
                                ]
                       },
                       /* BRANCH LOGIC HERE */
                       /* 13 intConflictR*/
                       {
                        "type":"mult1",
                        "variableName": "intConflictR",
                        "questionPrompt": "Has the conflict been resolved?",
                        "minResponse": 0,
                        "maxResponse": 1,
                        "labels": [
                                    {"label": "No"},
                                    {"label": "Yes"},
                                 ]
                        },
                        /* 14 intHappiness*/
                       {
                        "type":"mult1",
                        "variableName": "intHappiness",
                        "questionPrompt": "During the interaction, <br />how <b>happy</b> did you feel?",
                        "minResponse": 1,
                        "maxResponse": 8,
                        "labels": [
                                    {"label": "1 Not at all"},
                                    {"label": "2"},
                                    {"label": "3"},
                                    {"label": "4"},
                                    {"label": "5"},
                                    {"label": "6"},
                                    {"label": "7 A great deal"},
                                    {"label": "I choose not to answer"}
                                 ]
                        },
                        /* 15 intAnger*/
                       {
                        "type":"mult1",
                        "variableName": "intAnger",
                        "questionPrompt": "During the interaction, <br />how <b>angry</b> did you feel?",
                        "minResponse": 1,
                        "maxResponse": 8,
                        "labels": [
                                    {"label": "1 Not at all"},
                                    {"label": "2"},
                                    {"label": "3"},
                                    {"label": "4"},
                                    {"label": "5"},
                                    {"label": "6"},
                                    {"label": "7 A great deal"},
                                    {"label": "I choose not to answer"}
                                 ]
                        },
                        /* 16 intRelax*/
                       {
                        "type":"mult1",
                        "variableName": "intRelax",
                        "questionPrompt": "During the interaction, <br />how <b>relaxed</b> did you feel?",
                        "minResponse": 1,
                        "maxResponse": 8,
                        "labels": [
                                    {"label": "1 Not at all"},
                                    {"label": "2"},
                                    {"label": "3"},
                                    {"label": "4"},
                                    {"label": "5"},
                                    {"label": "6"},
                                    {"label": "7 A great deal"},
                                    {"label": "I choose not to answer"}
                                 ]
                        },
                        /* 17 intAnxiety*/
                        {
                            "type":"mult1",
                            "variableName": "intAnxiety",
                            "questionPrompt": "During the interaction, <br />how <b>anxious</b> did you feel?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                    {"label": "1 Not at all"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 A great deal"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },
                        /* 18 intAnxiety*/
                        {
                            "type":"mult1",
                            "variableName": "intAnxiety",
                            "questionPrompt": "During the interaction, <br />how <b>scared</b> did you feel?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                    {"label": "1 Not at all"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 A great deal"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },
                        /* 19 intValence*/
                        {
                            "type":"mult1",
                            "variableName": "intValence",
                            "questionPrompt": "In general, how would you describe the interaction you just had? <br />Was it positive or negative?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                        {"label": "1 Very negative"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 Very positive"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },
                         /* 20 intDesire*/
                        {
                            "type":"mult1",
                            "variableName": "intDesire",
                            "questionPrompt": "In general, how much would you would you want to interact with this person again?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                        {"label": "1 Not at all"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 A great deal"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },
                         /* 21 intPressure*/
                        {
                            "type":"mult1",
                            "variableName": "intPressure",
                            "questionPrompt": "During the interaction, did you feel pressured to change your beliefs?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                        {"label": "1 Not at all"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 A great deal"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },
                        /* 22 intPersuade*/
                        {
                            "type":"mult1",
                            "variableName": "intPersuade",
                            "questionPrompt": "During the interaction, did you think that the other person might try to change your beliefs?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                        {"label": "1 Not at all"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 A great deal"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },
                         /* 23 intConceal*/
                        {
                            "type":"mult1",
                            "variableName": "intConceal",
                            "questionPrompt": "During the interaction, did you conceal any of your identities?",
                            "minResponse": 0,
                            "maxResponse": 1,
                            "labels": [
                                        {"label": "No"},
                                        {"label": "Yes"},
                                     ]
                            },
                         /* BRANCH LOGIC HERE */
                         /* 24 intConcealID*/
                        {
                            "type":"text",
                            "variableName": "intConcealID",
                            "questionPrompt": "What identities did you conceal?",
                            },
                        /* BRANCH LOGIC HERE */
                        /* 25 partName*/
                            {
                            "type":"text",
                            "variableName": "partName",
                            "questionPrompt": "This is a new person. Please give them a nickname.",
                                },
                            /* 26 partRel*/
                            {
                            "type":"checklist",
                            "variableName": "partRel",
                            "questionPrompt": "What is your relationship with this person (NAME), if any? (Check all that apply)",
                            "minResponse": 0,
                            "maxResponse": 10,
                            "labels": [
                                    {"label": "Stranger/No relationship"},
                                    {"label": "Friend"},
                                    {"label": "Best Friend"},
                                    {"label": "Romantic Partner"},
                                    {"label": "Coworker"},
                                    {"label": "Neighbour"},
                                    {"label": "Teammate"},
                                    {"label": "Classmate"},
                                    {"label": "Family"},
                                    {"label": "Other Acquaintance"},
                                    {"label": "I choose not to answer"}
                                    ]
                                },
                             /* 27 partCloseness*/
                             {
                                "type":"mult1",
                                "variableName": "partCloseness",
                                "questionPrompt": "How <b>close</b> do you feel to NAME?",
                                "minResponse": 1,
                                "maxResponse": 8,
                                "labels": [
                                        {"label": "1 (Not at all)"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 (Very)"},
                                        {"label": "I choose not to answer"}
                                        ]
                                    },
                            /* 28 partVoluntary*/
                            {
                                "type":"mult1",
                                "variableName": "partVoluntary",
                                "questionPrompt": "How voluntary is your relationship to NAME?",
                                "minResponse": 1,
                                "maxResponse": 8,
                                "labels": [
                                        {"label": "1 (Not at all)"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 (Completely)"},
                                        {"label": "I choose not to answer"}
                                        ]
                                    },
                             /* 29 partLiking*/
                            {
                            "type":"mult1",
                            "variableName": "partLiking",
                            "questionPrompt": "How much do you <b>like</b> NAME?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                    {"label": "-3 (Really dislike)"},
                                    {"label": "-2"},
                                    {"label": "-1"},
                                    {"label": "0"},
                                    {"label": "1"},
                                    {"label": "2"},
                                    {"label": "3 (Really like)"},
                                    {"label": "I choose not to answer"}
                                    ]
                                },
                             /* 30 partTrust*/
                            {
                            "type":"mult1",
                            "variableName": "partTrust",
                            "questionPrompt": "How much do you <b>trust</b> NAME?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                    {"label": "1 (Not at all)"},
                                    {"label": "2"},
                                    {"label": "3"},
                                    {"label": "4"},
                                    {"label": "5"},
                                    {"label": "6"},
                                    {"label": "7 (Completely)"},
                                    {"label": "I choose not to answer"}
                                    ]
                                },
                             /* 31 partCare*/
                            {
                            "type":"mult1",
                            "variableName": "partCare",
                            "questionPrompt": "How much do you <b>care</b> about NAME?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                    {"label": "1 (Not at all)"},
                                    {"label": "2"},
                                    {"label": "3"},
                                    {"label": "4"},
                                    {"label": "5"},
                                    {"label": "6"},
                                    {"label": "7 (Very much)"},
                                    {"label": "I choose not to answer"}
                                         ]
                                },
                             /* 32 partAge*/
                            {
                            "type":"number",
                            "variableName": "partAge",
                            "questionPrompt": "How old is NAME (years)?",
                                },
                             /* 33 partGender*/
                            {
                            "type":"mult1",
                            "variableName": "partGender",
                            "questionPrompt": "What is NAME's gender identity?",
                            "minResponse": 1,
                            "maxResponse": 6,
                            "labels": [
                                    {"label": "Man"},
                                    {"label": "Woman"},
                                    {"label": "Nonbinary"},
                                    {"label": "Another"},
                                    {"label": "Don't know/unsure"},
                                    {"label": "I choose not to answer"}
                                    ]
                                },
                             /* 34 partSexualID*/
                             {
                            "type":"mult1",
                            "variableName": "partSexualID",
                            "questionPrompt": "What is NAME's sexual identity?",
                            "minResponse": 1,
                            "maxResponse": 7,
                            "labels": [
                                    {"label": "Bisexual"},
                                    {"label": "Gay/Lesbian"},
                                    {"label": "Queer"},
                                    {"label": "Heterosexual/Straight"},
                                    {"label": "Another"},
                                    {"label": "Don't know/unsure"},
                                    {"label": "I choose not to answer"}
                                    ]
                                },
                             /* 35 partEthnicity*/
                             {
                            "type":"checklist",
                            "variableName": "partEthnicity",
                            "questionPrompt": "What is NAME's ethnicity?",
                            "minResponse": 0,
                            "maxResponse": 11,
                            "labels": [
                                    {"label": "Indigenous (North America)"},
                                    {"label": "Black or African"},
                                    {"label": "East Asian"},
                                    {"label": "White or European"},
                                    {"label": "Latino/a"},
                                    {"label": "Native Hawaiian or Pacific Islander"},
                                    {"label": "Middle Eastern"},
                                    {"label": "South Asian"},
                                    {"label": "South East Asian"},
                                    {"label": "Another"},
                                    {"label": "Don't know/unsure"},
                                    {"label": "I choose not to answer"}
                                    ]
                                },
                            /* 36 partPolitical*/
                            {
                            "type":"mult1",
                            "variableName": "partPolitical",
                            "questionPrompt": "What is NAME's political orientation?",
                            "minResponse": 1,
                            "maxResponse": 9,
                            "labels": [
                                    {"label": "Extremely liberal"},
                                    {"label": "Moderately liberal"},
                                    {"label": "Slightly liberal"},
                                    {"label": "Neither liberal nor conservative"},
                                    {"label": "Slightly conservative"},
                                    {"label": "Moderately conservative"},
                                    {"label": "Extremely conservative"},
                                    {"label": "Don't know/unsure"},
                                    {"label": "I choose not to answer"}
                                    ]
                                },
                             /* 37 partReligion*/
                             {
                            "type":"mult1",
                            "variableName": "partReligion",
                            "questionPrompt": "What are NAME's religious beliefs?",
                            "minResponse": 1,
                            "maxResponse": 11,
                            "labels": [
                                    {"label": "Christian"},
                                    {"label": "Muslim"},
                                    {"label": "Jewish"},
                                    {"label": "Buddhist"},
                                    {"label": "Hindu"},
                                    {"label": "Sikh"},
                                    {"label": "Atheist"},
                                    {"label": "Agnostic"},
                                    {"label": "Another"},
                                    {"label": "Don't know/unsure"},
                                    {"label": "I choose not to answer"}
                                    ]
                                },
                            /* BRANCH LOGIC HERE */
                        /* 38 mediaPresence*/
                        {
                            "type":"mult1",
                            "variableName": "mediaPresence",
                            "questionPrompt": "Did you consume any media since you last completed a survey (magazines, newspapers, newsletters, videos)?",
                            "minResponse": 0,
                            "maxResponse": 1,
                            "labels": [
                                        {"label": "No"},
                                        {"label": "Yes"},
                                     ]
                            },
                            /* 39 oldMedia*/
                            {
                                "type":"mult1",
                                "variableName": "mediaPresence",
                                "questionPrompt": "Since you did not consume any new media, please answer the next few questions for the <br /> <b>last</b> media you remember consuming.",
                                "minResponse": 1,
                                "maxResponse": 1,
                                "labels": [
                                            {"label": "OK"},
                                         ]
                                },
                         /* 40 mediaGroups*/
                        {
                            "type":"checklist",
                            "variableName": "mediaGroups",
                            "questionPrompt": "Were any of these groups depicted in the media (select all that apply)?",
                            "minResponse": 0,
                            "maxResponse": 33,
                            "labels": [
                                        {"label": "Children"},
                                        {"label": "Teenagers"},
                                        {"label": "Young adults"},
                                        {"label": "Middle-aged adults"},
                                        {"label": "Older adults"},
                                        {"label": "Men"},
                                        {"label": "Women"},
                                        {"label": "Nonbinary people"},
                                        {"label": "Bisexual people"},
                                        {"label": "Gay/Lesbian people"},
                                        {"label": "Queer people"},
                                        {"label": "Heterosexual/Straight people"},
                                        {"label": "Indigenous people"},
                                        {"label": "Black people"},
                                        {"label": "East Asian people"},
                                        {"label": "White people"},
                                        {"label": "Latino/a people"},
                                        {"label": "Native Hawaiian or Pacific Islander people"},
                                        {"label": "Middle Eastern people"},
                                        {"label": "South Asian people"},
                                        {"label": "South East Asian people"},
                                        {"label": "Christians"},
                                        {"label": "Muslims"},
                                        {"label": "Jews"},
                                        {"label": "Buddhists"},
                                        {"label": "Hindus"},
                                        {"label": "Sikhs"},
                                        {"label": "Atheists"},
                                        {"label": "Agnostics"},
                                        {"label": "Liberals"},
                                        {"label": "Conservatives"},
                                        {"label": "Political Moderates"},
                                        {"label": "Immigrants"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },
                        /* 41 mediaDuration*/
                        {
                            "type":"number",
                            "variableName": "mediaDuration",
                            "questionPrompt": "How long did you spend consuming this media, in minutes?",
                            },
                        /* 42 mediaStart*/
                        {
                            "type":"timePicker",
                            "variableName": "mediaStart",
                            "questionPrompt": "What was the approximate time you started consuming this media?",
                            },
                        /* 43 mediaInitiate*/
                        {
                            "type":"mult1",
                            "variableName": "mediaInitiate",
                            "questionPrompt": "Did you actively seek out the media?",
                            "minResponse": 0,
                            "maxResponse": 1,
                            "labels": [
                                {"label": "No"},
                                {"label": "Yes"},
                            ]
                        },
                        /* 44 pieceMedium */
                        {
                        "type":"mult1",
                        "variableName":"What type of medium did you use?",
                        "questionPrompt":"What type of medium did you use?",
                        "minResponse": 0,
                        "maxResponse": 8,
                        "labels": [
                        	{"label":"Internet"},
                        	{"label":"Radio"},
                        	{"label":"Print"},
                        	{"label":"Television"},
                        	{"label":"Movie"},
                        	{"label":"Video"},
                        	{"label":"Podcast"},
                        	{"label":"Other"},
                        	{"label": "I choose not to answer"}
                        ]
                        },
                        /* 45 mediaConflict*/
                       {
                        "type":"mult1",
                        "variableName": "mediaConflict",
                        "questionPrompt": "Was there any conflict depicted in the media?",
                        "minResponse": 0,
                        "maxResponse": 1,
                        "labels": [
                                    {"label": "No"},
                                    {"label": "Yes"},
                                 ]
                        },
                        /* 46 mediaViolence*/
                        {
                         "type":"mult1",
                         "variableName": "mediaViolence",
                         "questionPrompt": "Was there any violence depicted in the media?",
                         "minResponse": 0,
                         "maxResponse": 1,
                         "labels": [
                                     {"label": "No"},
                                     {"label": "Yes"},
                                  ]
                         },
                        /*47 mediaHappiness*/
                        {
                            "type":"mult1",
                            "variableName": "mediaHappiness",
                            "questionPrompt": "While consuming this media, <br />how <b>happy</b> did you feel?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                        {"label": "1 (Not at all)"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 (Very)"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },
                        /* 48 mediaAnger*/
                        {
                            "type":"mult1",
                            "variableName": "mediaAnger",
                            "questionPrompt": "While consuming this media, <br />how <b>angry</b> did you feel?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                        {"label": "1 (Not at all)"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 (Very)"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },
                        /* 49 mediaRelax*/
                        {
                            "type":"mult1",
                            "variableName": "mediaRelax",
                            "questionPrompt": "While consuming this media, <br />how <b>relaxed</b> did you feel?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                        {"label": "1 (Not at all)"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 (Very)"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },
                        /* 50 mediaAnxiety*/
                        {
                            "type":"mult1",
                            "variableName": "mediaAnxiety",
                            "questionPrompt": "While consuming this media, <br />how <b>anxious</b> did you feel?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                        {"label": "1 (Not at all)"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 (Very)"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },
                        /* 51 mediaValence*/
                        {
                            "type":"mult1",
                            "variableName": "mediaValence",
                            "questionPrompt": "In general, was the media you consumed positive or negative?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                        {"label": "1 (Very negative)"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 (Very positive)"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },
                         /* 52 mediaDesire*/
                        {
                            "type":"mult1",
                            "variableName": "mediaDesire",
                            "questionPrompt": "In general, how much would you would you want to consume media like this in the future?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                        {"label": "1 (Not at all)"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 (A great deal)"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },
                         /* 53 mediaSource*/
                         {
                            "type":"mult1",
                            "variableName": "mediaSource",
                            "questionPrompt": "In general, how much would you want to consume media from this source in the future?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                        {"label": "1 (Not at all)"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 (A great deal)"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },
                         /* 54 mediaReflect*/
                        {
                            "type":"mult1",
                            "variableName": "mediaReflect",
                            "questionPrompt": "Did the media make you reflect on yourself?",
                            "minResponse": 0,
                            "maxResponse": 1,
                            "labels": [
                                        {"label": "No"},
                                        {"label": "Yes"},
                                     ]
                            },
                         /* 55 mediaPressure*/
                        {
                            "type":"mult1",
                            "variableName": "mediaPressure",
                            "questionPrompt": "Did the media make you feel pressured to change your beliefs?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                        {"label": "1 Not at all"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 A great deal"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },
                        /* 56 mediaPersuade*/
                        {
                            "type":"mult1",
                            "variableName": "mediaPersuade",
                            "questionPrompt": "Did you think the media might try to change your beliefs?",
                            "minResponse": 1,
                            "maxResponse": 8,
                            "labels": [
                                        {"label": "1 Not at all"},
                                        {"label": "2"},
                                        {"label": "3"},
                                        {"label": "4"},
                                        {"label": "5"},
                                        {"label": "6"},
                                        {"label": "7 A great deal"},
                                        {"label": "I choose not to answer"}
                                     ]
                            },

                         /* 57  nightlySurveyLink*/
                        {
                       		"type":"link",
                       		"variableName": "nightlySurveyLink",
                       		"questionPrompt": "Please click <a href='https://utorontopsych.az1.qualtrics.com/jfe/form/SV_4TKpItlOKb398fr?pid=PID' target='_blank'>HERE</a> to open your nightly survey. The survey will open in a web browser window. <br /> Please return to the app <b>AFTER</b> completing the survey. <br /> <br /> <br /> <br />",
                       		},
                       	/* 58  goBackToLink*/
                       {
                       		"type":"mult1",
                       		"variableName": "goBackToLink",
                       		"questionPrompt": "Did you accidentally skip the survey link? <br /><br />Click <b>YES</b> to go back to your survey link page.",
                       		"minResponse": 0,
                       		"maxResponse": 1,
                       		"labels": [
                                {"label": "No"},
                                {"label": "Yes"}
                                ],
                       },
                       ];

/*These are the messages that are displayed at the end of the questionnaire*/
var lastPage = [
				/*input your last-page message*/
                {
                "message": "Saving data..."
                },
                /*input snooze last-page message*/
                {
                "message": "Snoozed! We will ask again later."
                },
                {
                "message": "Thank you for your interest in our study. Unfortunately, our app is incompatible with your phone, so you CANNOT participate in our study. We apologize for the inconvenience. "
                },
                ];

/*Questions to set up participant notifications so that notifications are customized to participant's schedule*/
var participantSetup = [
                        // - 10
                        {
						"type":"number",
						"variableName": "participant_id",
						"questionPrompt": "Please enter your participant ID:"
                        },
                        // -9
                        {
                        "type":"mult1",
                       	"variableName":"osType",
                       	"questionPrompt":"What type of device do you have?",
                       	"minResponse":0,
                       	"maxResponse":1,
                       	"labels": [
                       		{"label":"iPhone or Other Apple Device"},
                       		{"label":"Android Phone or Android Device"}
                       	]
                        },
                        // -8
                        {
                        "type":"mult1",
						"variableName": "testNotification",
						"questionPrompt": "Next, we will test whether the notification system is working on your phone. Please click the button below to test the notification system. You will receive a notification in ten seconds. If you see the notification, do <b>NOT</b> click on it. Clicking on it will interrupt your app setup. <br/><br/>If you have an Apple device, please go to your home screen after you click the button below, so you can see the notification. If you stay in the app, you will NOT see the notification. Please return to the app after you have seen the notification or 10 seconds have passed. ",
						"minResponse": 1,
                       	"maxResponse": 1,
                       	"labels": [
                                {"label": "Test notification now"},
                        ]
                        },
                        // -7
                        {
                        "type":"mult1",
                       	"variableName":"notificationWorked",
                       	"questionPrompt":"Did you receive the test notification?",
                       	"minResponse":0,
                       	"maxResponse":1,
                       	"labels": [
                       		{"label":"No"},
                       		{"label":"Yes"}
                       	]
                        },
                        // -6
                        {
                        "type":"instructions",
                       	"variableName":"notificationFail",
                       	"questionPrompt":"It looks like your notification system is not working. You are ineligible to participate in our study. ",
                        },
                        // -5
						{
						"type":"timePicker",
						"variableName": "weekdayWakeTime",
						"questionPrompt": "What time do you normally wake up on weekdays?"
                        },
                        // -4
						{
						"type":"timePicker",
						"variableName": "weekdaySleepTime",
						"questionPrompt": "What time do you normally go to sleep on weekdays?"
                        },
                        // -3
						{
						"type":"timePicker",
						"variableName": "weekendWakeTime",
						"questionPrompt": "What time do you normally wake up on weekends?"
                        },
                        // -2
						{
						"type":"timePicker",
						"variableName": "weekendSleepTime",
						"questionPrompt": "What time do you normally go to sleep on weekends?"
                        },
                        // -1
						{
						"type":"text",
						"variableName": "networkString",
						"questionPrompt": "We sent you a text snippet that had your social network. Please copy and paste that here:"
                        }
                    ];

/*Populate the view with data from surveyQuestion model*/
// Making mustache templates
//This line determines the number of questions in your participant setup
//Shout-out to Rebecca Grunberg for this great feature!
var NUMSETUPQS = participantSetup.length;

//This line tells ExperienceSampler which question in surveyQuestions is the snooze question
//If you choose not to use the snooze option, just comment it out
var SNOOZEQ = 0;
//This section of code creates the templates for all the question formats
var questionTmpl = "<p>{{{questionText}}}</p><ul>{{{buttons}}}</ul>";
var questionTextTmpl = "{{{questionPrompt}}}";
var buttonTmpl = "<li><button id='{{id}}' value='{{value}}'>{{label}}</button></li>";
var textTmpl="<li><textarea cols=50 rows=5 id='{{id}}'></textarea></li><li><button type='submit' value='Enter'>Enter</button></li>";
var numberTmpl = "<li><input type='number' id='{{id}}'></input></li><br/><br/><li></li><li><button type='submit' value='Enter'>Enter</button></li>";
var checkListTmpl="<li><input type='checkbox' id='{{id}}' value='{{value}}'>{{label}}</input></li>";
var instructionTmpl = "<li><button id='{{id}}' value = 'Next'>Next</button></li>";
var linkTmpl = "<li><button id='{{id}}' value = 'Next'>Click here AFTER finishing the survey in the link above</button></li>";
var sliderTmpl = "<li><input type='range' min='{{min}}' max='{{max}}' value='{{value}}' orient=vertical id='{{id}}' oninput='outputUpdate(value)'></input><output for='{{id}}' id='slider'>50</output><script>function outputUpdate(slidervalue){document.querySelector('#slider').value=slidervalue;}</script></li><li><button type='submit' value='Enter'>Enter</button></li>";
var datePickerTmpl = '<li><input id="{{id}}" data-format="DD-MM-YYYY" data-template="D MMM YYYY" name="date"><br /><br /></li><li><button type="submit" value="Enter">Enter</button></li><script>$(function(){$("input").combodate({firstItem: "name",minYear:2015, maxYear:2016});});</script>';
var dateAndTimePickerTmpl = '<li><input id="{{id}}" data-format="DD-MM-YYYY-HH-mm" data-template="D MMM YYYY  HH:mm" name="datetime24"><br /><br /></li><li><button type="submit" value="Enter">Enter</button></li><script>$(function(){$("input").combodate({firstItem: "name",minYear:2015, maxYear:2016});});</script>';
var timePickerTmpl = "<li><input id ='{{id}}' type='time'></input><br /><br /></li><li><button type='submit' value='Enter'>Enter</button></li>";
var lastPageTmpl = "<h3>{{message}}</h3>";
//This line generates the unique key variable. You will not assign the value here, because you want it the value to change
//with each new questionnaire
var uniqueKey;
//If you need to declare any other global variables (i.e., variables to be used in more than one function of ExperienceSampler)
//you should declare them here.
//For example, you might declare your piped text variable or your question branch response variable
var mediaCondition;
var newPartner = 0;
var partName;

var app = {
    // Application Constructor
initialize: function() {
    this.bindEvents();
},
    // Bind Event Listeners
bindEvents: function() {
    document.addEventListener("deviceready", this.onDeviceReady, false);
    document.addEventListener("resume", this.onResume, false);
    document.addEventListener("pause", this.onPause, false);
},
//these functions tell the app what to do at different stages of running
onDeviceReady: function() {
    app.init();
},

onResume: function() {app.sampleParticipant();},

onPause: function() {app.pauseEvents();},

//Beginning our app functions
/* The first function is used to specify how the app should display the various questions. You should note which questions
should be displayed using which formats before customizing this function*/
renderQuestion: function(question_index) {
    //First load the correct question from the JSON database
	var question;
    if (question_index <= -1) {question = participantSetup[question_index + NUMSETUPQS];}
    else {question = surveyQuestions[question_index];}
    var questionPrompt = question.questionPrompt;
    //If you want to include piped text in your question wording, you would implement it in this section.
    //Below is an example of how you would look for the NAME placeholder in your surveyQuestion questionPrompts
    //and replace it with the response value that you assign to the name variable
    //See our example app to see how you can implement this
	if (questionPrompt.indexOf('PID') >= 0) {
		questionPrompt = questionPrompt.replace("PID", function replacer() {return localStore.participant_id;});
      	}
    if (questionPrompt.indexOf('NAME') >= 0) {
		questionPrompt = questionPrompt.replace("NAME", function replacer() {return partName;});
      	}
    question.questionText = Mustache.render(questionTextTmpl, {questionPrompt: questionPrompt});
    //Now populate the view for this question, depending on what the question type is
    //This part of the function will render different question formats depending on the type specified
    //Another shout-out to Rebecca Grunberg for this amazing improvement to ExperienceSampler
    switch (question.type) {
    	case 'mult1': // Rating scales (i.e., small numbers at the top of the screen and larger numbers at the bottom of the screen).
    		question.buttons = "";
        	var label_count = 0;
        	for (var i = question.minResponse; i <= question.maxResponse; i++) {
            	var label = question.labels[label_count++].label;
            	//If you want to implement piped text in your wording choice, you would place it here
    			//Below is an example of how you would look for the NAME placeholder in your surveyQuestion labels
    			//and replace it with
                if (label.indexOf('NAME') >= 0){
            		label = label.replace("NAME", function replacer() {return partName;});
            		}
            	question.buttons += Mustache.render(buttonTmpl, {
                                                id: question.variableName+i,
                                                value: i,
                                                label: label
                                                });
        	}
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
        		app.recordResponse(this, question_index, question.type);
        	});
        	break;
        case 'mult2': // Rating scales (i.e., positive numbers at the top of the screen and negative numbers at the bottom of the screen).
    		question.buttons = "";
            var label_count = 0;
            for (var j = question.maxResponse; j >= question.minResponse; j--) {
                var label = question.labels[label_count++].label;
                if (label.indexOf('NAME') >= 0){
            		label = label.replace("NAME", function replacer() {return partName;});
            		}
                question.buttons += Mustache.render(buttonTmpl, {
                                                    id: question.variableName+j,
                                                    value: j,
                                                    label: label
                                                    });
            }
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
        		app.recordResponse(this, question_index, question.type);
        	});
        	break;
        case 'checklist':
        	question.buttons = "";
        	var label_count = 0;
        	var checkboxArray = [];
        	for (var i = question.minResponse; i <= question.maxResponse; i++) {
            	var label = question.labels[label_count++].label;
            	if (label.indexOf('NAME') >= 0){
            		label = label.replace("NAME", function replacer() {return partName;});
            		}
            	question.buttons += Mustache.render(checkListTmpl, {
                                                	id: question.variableName+i,
                                                	value: i,
                                                	label: label
                                                	});
        	}
        	question.buttons += "<li><button type='submit' value='Enter'>Enter</button></li>";
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click( function(){
                                          checkboxArray.push(question.variableName);
                                          $.each($("input[type=checkbox]:checked"), function(){checkboxArray.push($(this).val());});
                                          app.recordResponse(String(checkboxArray), question_index, question.type);
            });
            break;
            case 'checklist2':
            	question.buttons = "";
            	var label_count = 0;
            	var checkboxArray = [];
              // Parse network string into an array
              var networkList = networkString.split(", ");
              for(var i = 0; i < networkList.length; i++){
                if (networkList[i].includes("Person")) {
                  networkList.splice(i, 1);
                  i--;
                }
              }
              networkString = networkList.join(", ");
              localStore.networkString = networkString;
              var labelList = networkList;
              labelList.push("Someone else");
            	for (var i = 0; i < labelList.length; i++) {
                	var label = labelList[i];
                	question.buttons += Mustache.render(checkListTmpl, {
                                                    	id: question.variableName+i,
                                                    	value: i,
                                                    	label: label
                                                    	});
            	}
            	question.buttons += "<li><button type='submit' value='Enter'>Enter</button></li>";
            	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
            	$("#question ul li button").click( function(){
                                              checkboxArray.push(question.variableName);
                                              $.each($("input[type=checkbox]:checked"), function(){checkboxArray.push($(this).val());});
                                              app.recordResponse(String(checkboxArray), question_index, question.type);
                });
                break;
        case 'slider':
        	question.buttons = Mustache.render(sliderTmpl, {id: question.variableName+"1"}, {min: question.minResponse}, {max: question.maxResponse}, {value: (question.maxResponse)/2});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var slider = [];
        	$("#question ul li button").click(function(){
        			slider.push(question.variableName);
        			slider.push($("input[type=range]").val());
        			app.recordResponse(String(slider), question_index, question.type);
        	});
        	break;
        case 'instructions':
        	question.buttons = Mustache.render(instructionTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var instruction = [];
        	$("#question ul li button").click(function(){
        		instruction.push(question.variableName);
        		instruction.push($(this).val());
        		app.recordResponse(String(instruction), question_index, question.type);
        	});
        	break;
        case 'link':
        	question.buttons = Mustache.render(linkTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var instruction = [];
        	$("#question ul li button").click(function(){
        		instruction.push(question.variableName);
        		instruction.push($(this).val());
        		app.recordResponse(String(instruction), question_index, question.type);
        	});
        	break;
	case 'text': //default to open-ended text
        	question.buttons = Mustache.render(textTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
				//If you want to force a response from your participants for
				//open-ended questions, you should uncomment this portion of the code
// 				if (app.validateResponse($("textarea"))){
        		 	app.recordResponse($("textarea"), question_index, question.type);
//                 }
//                 else {
//                     alert("Please enter something.");
//                 }
            });
            break;
        case 'number': //default to open-ended text
        	question.buttons = Mustache.render(numberTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	$("#question ul li button").click(function(){
				//If you want to force a response from your participants for
				//open-ended questions, you should uncomment this portion of the code
				if (app.validateNumber($("input"))){
        		 	app.recordResponse($("input"), question_index, question.type);
                }
                else {
                    alert("Please enter a number.");
                }
            });
            break;
        case 'datePicker':
        	question.buttons = Mustache.render(datePickerTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var date, dateSplit, variableName = [], dateArray = [];
        	$("#question ul li button").click(function(){
        		date = $("input").combodate('getValue');
        		dateArray.push(question.variableName);
        		dateArray.push(date);
        		app.recordResponse(String(dateArray), question_index, question.type);
        	});
        	break;
        case 'dateAndTimePicker':
        	question.buttons = Mustache.render(dateAndTimePickerTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var date, dateSplit, variableName = [], dateArray = [];
        	$("#question ul li button").click(function(){
        		date = $("input").combodate('getValue');
        		dateArray.push(question.variableName);
        		dateArray.push(date);
        		app.recordResponse(String(dateArray), question_index, question.type);
        	});
        	break;
        case 'timePicker':
        	question.buttons = Mustache.render(timePickerTmpl, {id: question.variableName+"1"});
        	$("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
        	var time, timeSplit, variableName = [], timeArray = [];
        	$("#question ul li button").click(function(){
				if (app.validateTime($("input"))){
        		 	app.recordResponse($("input"), question_index, question.type);
                }
                else {
                    alert("Please enter a time.");
                }
        	});
        	break;
        }
    },

renderLastPage: function(pageData, question_index) {
    $("#question").html(Mustache.render(lastPageTmpl, pageData));
	//This section should be implemented if you choose to use a snooze feature
	//It tells ExperienceSampler that if the participant has chosen to snooze the app,
	//the app should save a snooze value of 1 (this value will be used to reset the unique key, so that
	//this data is does not have the same unique key as the subsequent questionnaire)
    if ( question_index == SNOOZEQ ) {
        app.snoozeNotif();
        localStore.snoozed = 1;
        app.saveData();
    }
    //If you choose to implement the snooze function, uncomment the else in the statement below
    else if ( question_index == -1) {
    	app.saveDataLastPage();
    }
    //This part of the code says that if the participant has completed the entire questionnaire,
    //ExperienceSampler should create a completed tag for it.
    //This tag will be used to count the number of completed questionnaires participants have completed
    //at the end of each day
    //The time stamp created here will also be used to create an end time for your restructured data
    else {
    	var datestamp = new Date();
    	var year = datestamp.getFullYear(), month = datestamp.getMonth(), day=datestamp.getDate(), hours=datestamp.getHours(), minutes=datestamp.getMinutes(), seconds=datestamp.getSeconds(), milliseconds=datestamp.getMilliseconds();
    	localStore[uniqueKey + '.' + "completed" + "_" + "completedSurvey"  + "_" + year + "_" + month + "_" + day + "_" + hours + "_" + minutes + "_" + seconds + "_" + milliseconds] = 1;
    	app.saveDataLastPage();
    }
},

/* Initialize the whole thing */
init: function() {
	//First, we assign a value to the unique key when we initialize ExperienceSampler
	uniqueKey = new Date().getTime();
	var now = new Date();
// 	var now = new Date(2021, 6, 30, 10, 0, 0, 0);

	app.scheduleNotifTrigger(now);
// 	alert("Your notifications have been scheduled.");
	var nowDate = new Date();
// 	alert("nowDate is " + nowDate);
	var nowDayOfWeek = nowDate.getDay();
	var surveyHour, surveyMinutes;
	//The statement below states that if there is no participant id or if the participant id is left blank,
	//ExperienceSampler would present the participant set up questions
	if (localStore.participant_id === " " || !localStore.participant_id || localStore.participant_id == "undefined") {app.renderQuestion(-NUMSETUPQS);}
// 	if (localStore.weekendSleepTime === " " || !localStore.weekendSleepTime || localStore.weekendSleepTime == "undefined" || localStore.weekdaySleepTime === " " || !localStore.weekdaySleepTime || localStore.weekdaySleepTime == "undefined") {app.renderQuestion(-NUMSETUPQS);}

	var weekendSleepTime = localStore.weekendSleepTime.split(":");
	var weekdaySleepTime = localStore.weekdaySleepTime.split(":");

//	if (nowDayOfWeek == 0 || nowDayOfWeek == 6) {
//		surveyHour = Number(weekendSleepTime[0]) - 1;
//   		surveyMinutes = Number(weekendSleepTime[1]);
//	}
//	else {
//		surveyHour = Number(weekdaySleepTime[0]) - 1;
//		surveyMinutes = Number(weekdaySleepTime[1]);
//	}

surveyHour = 21;
surveyMinutes = 0;
var surveyTime = new Date();
surveyTime.setHours(surveyHour, surveyMinutes, 0 , 0);
var surveyTimeEpoch = surveyTime.getTime();

var nextExpSampling = new Date();
// var tomorrow = new Date().getDate() + 1;
// nextExpSampling.setDate(tomorrow);
nextExpSampling.setHours(10, 0, 0, 0);
var nextExpSamplingEpoch = nextExpSampling.getTime();

  	//otherwise ExperienceSampler should just save the unique key and display the first question in survey questions

  // This section implements the experience sampling versus nightly survey
	if (uniqueKey >= surveyTimeEpoch || uniqueKey < nextExpSamplingEpoch){
// 		alert("i'm showing the nightly survey");
		uniqueKey = new Date().getTime();
        localStore.uniqueKey = uniqueKey;
    	var startTime = new Date(uniqueKey);
    	var syear = startTime.getFullYear(), smonth = startTime.getMonth(), sday=startTime.getDate(), shours=startTime.getHours(), sminutes=startTime.getMinutes(), sseconds=startTime.getSeconds(), smilliseconds=startTime.getMilliseconds();
    	localStore[uniqueKey + "_" + "startTime"  + "_" + syear + "_" + smonth + "_" + sday + "_" + shours + "_" + sminutes + "_" + sseconds + "_" + smilliseconds] = 1;
      	networkString = localStore.networkString;
      	app.renderQuestion(57);
	}
	else {
    	uniqueKey = new Date().getTime();
        localStore.uniqueKey = uniqueKey;
    	var startTime = new Date(uniqueKey);
    	var syear = startTime.getFullYear(), smonth = startTime.getMonth(), sday=startTime.getDate(), shours=startTime.getHours(), sminutes=startTime.getMinutes(), sseconds=startTime.getSeconds(), smilliseconds=startTime.getMilliseconds();
    	localStore[uniqueKey + "_" + "startTime"  + "_" + syear + "_" + smonth + "_" + sday + "_" + shours + "_" + sminutes + "_" + sseconds + "_" + smilliseconds] = 1;
      networkString = localStore.networkString;
      app.renderQuestion(0);
    }
    localStore.snoozed = 0;
//     alert("I finished running the init function. ");
},

/* Record User Responses */
recordResponse: function(button, count, type) {
		//uncomment up to "localStore[uniqueRecord] = response;" to test whether app is recording and sending data correctly (Stage 2 of Customization)
		//This tells ExperienceSampler how to save data from the various formats
    //Record date (create new date object)
    var datestamp = new Date();
    var year = datestamp.getFullYear(), month = datestamp.getMonth(), day=datestamp.getDate(), hours=datestamp.getHours(), minutes=datestamp.getMinutes(), seconds=datestamp.getSeconds(), milliseconds=datestamp.getMilliseconds();
    //Record value of text field
    var response, currentQuestion, uniqueRecord;
    if (type == 'text') {
        response = button.val();
        // remove newlines from user input
        response = response.replace(/(\r\n|\n|\r)/g, ""); //encodeURIComponent(); decodeURIComponent()
        currentQuestion = button.attr('id').slice(0,-1);
    }
    else if (type == 'number') {
        response = button.val();
        // remove newlines from user input
        response = response.replace(/(\r\n|\n|\r)/g, ""); //encodeURIComponent(); decodeURIComponent()
        currentQuestion = button.attr('id').slice(0,-1);
    }
    else if (type == 'slider') {
    	response = button.split(/,(.+)/)[1];
        currentQuestion = button.split(",",1);
    }
    //Record the array
    else if (type == 'checklist') {
        response = button.split(/,(.+)/)[1];
        currentQuestion = button.split(",",1);
    }
    //Record the array
    else if (type == 'checklist2') {
        response = button.split(/,(.+)/)[1];
        currentQuestion = button.split(",",1);
    }
    else if (type == 'instructions') {
    	response = button.split(/,(.+)/)[1];
        currentQuestion = button.split(",",1);
    }
    //Record value of clicked button
    else if (type == 'mult1') {
        response = button.value;
        //Create a unique identifier for this response
        currentQuestion = button.id.slice(0,-1);
    }
    //Record value of clicked button
    else if (type == 'mult2') {
        response = button.value;
        //Create a unique identifier for this response
        currentQuestion = button.id.slice(0,-1);
    }
    else if (type == 'datePicker') {
		response = button.split(/,(.+)/)[1];
     	currentQuestion = button.split(",",1);
    }
    else if (type == 'dateAndTimePicker') {
		response = button.split(/,(.+)/)[1];
     	currentQuestion = button.split(",",1);
    }
    else if (type == 'timePicker') {
    	response = button.val();
        currentQuestion = button.attr('id').slice(0,-1);
    }
    if (count == -NUMSETUPQS) {
    	var participant_id = response;
     	mediaCondition = Number(participant_id)%2;
      	localStore.mediaCondition = mediaCondition;
    }
    if (count == 5 && response.split(",")[(response.split(",").length) - 1] == (localStore.networkString.split(", ").length)) {
      newPartner = 1;
    }
    if (count == 25) {
      partName = response;
      networkString = networkString + ", " + response;
      localStore.networkString = networkString;
    }
    if (count == -1) {networkString = response;}

    if (count <= -1) {uniqueRecord = currentQuestion;}
    else {uniqueRecord = uniqueKey + "_" + currentQuestion + "_" + year + "_" + month + "_" + day + "_" + hours + "_" + minutes + "_" + seconds + "_" + milliseconds;}
    //Save this to local storage
    localStore[uniqueRecord] = response;

		/*Question Logic Statements*/
		//Stage 3 of Customization
		//if your questionnaire has two branches based on the absence or presence of a phenomenon, you will need the next statement
		//this statement allows you to record whether the phenomenon was absent or present so you can specify which branch the participant should complete when
		//the questionnaire splits into the two branches
		//if not then you do not need the next statement and should leave it commented out
        //if (count == 5) {phenomenonPresence = response;}
		//if you have piped text, you would assign your response variable here
		//where X is the question index number of the question you ask for response you would like to pipe
		//In this example, we just use name to consist with our earlier variables
		//if (count ==23) {name = response;}
		//The line below states that if the app is on the last question of participant setup, it should schedule all the notifications
		//then display the default end of survey message, and then record which notifications have been scheduled.
		//You will test local notifications in Stage 4 of customizing the app
		//********IF YOU HAVE NO QUESTION LOGIC BUT HAVE SCHEDULED NOTIFICATIONS, YOU NEED TO UNCOMMENT THE FOLLOWING LINE
		//TO EXECUTE THE scheduleNotifs() FUNCTION********
   	if (count == -8){app.testNotif(); $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(-7);});}
   	else if (count == -7 && response == 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(-6);});}
   	 else if (count == -7 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(-5);});}
    else if (count == -6) {app.renderLastPage(lastPage[2], count);}
   	else if (count == -1){
   		app.scheduleNotifs();
   		app.renderLastPage(lastPage[0], count);
//    		mediaCondition = Number(localStore.participant_id)%2;
//       	localStore.mediaCondition = mediaCondition;
//       	console.log("mediaCondition is " + mediaCondition);
   		app.scheduleNotifs();
   		}
    //Identify the next question to populate the view
		//the next statement is about the snooze function
		//This statement says that if the participant says they are currently unable to complete the questionnaire now,
		//the app will display the snooze end of survey message. You can customize the snooze function in Stage 4 of Customization
    else if (count == SNOOZEQ && response == 0) {app.renderLastPage(lastPage[1], count);}
		//The statement below tells the survey under what conditions should participants be shown one branch of the questionnaire as opposed to the other
		//Remember each question logic requires at least two lines of code
		//Replace X with the question number where the questionnaire splits into two branches
		//Replace Y with the response associated with the presence of the phenomenon and A with the number of the question participants should be presented with
		//Replace Z with the response associated with the absence of the phenomenon and B with the number of the question participants should be presented with
		//The code that preceded the app.renderQuestion function is just telling ExperienceSampler that the previous question should fade out
		//You can choose not implement this feature; however, we have made the question fade in feature a default function of ExperienceSampler (another shout-out to
		//to Rebecca Grunberg for the great idea), and it looks more aesthetically pleasing if the fade in is accompanied by a fade out
    //else if (count == X & response < 10 && phenomenonPresence == Y) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(A);});}
    //else if (count == X & response < 10 && phenomenonPresence == Z) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(B);});}
		//The next two statements illustrate the structure that all other question logic statements will follow
		//They are similar to the ones regarding the absence and presence of the phenomenon, except this time the critical condition is the response chosen
		//The first statement says if the question number is X and the response is less than Y, display question number Z
		//In that statement, replace X with the question number where the question logic occurs, Y with the specific response value that will trigger the question logic,
		//and Z with the question number that should be displayed if response Y is chosen
		//The second statement, says if the question number is X and the response is not equal to Y, display question number A
		//Remember that to do question logic for one question, you need to have AT LEAST two conditional statements about what to do if the trigger response is chosen, AND
		//what to do if the trigger response is NOT chosen.
    else if (count == 3){console.log("mediaCondition is " + localStore.mediaCondition); $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(4);});}
    else if (count == 4 && response == 0 && localStore.mediaCondition == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(38);});}
    else if (count == 4 && response == 0 && localStore.mediaCondition == 0) {app.renderLastPage(lastPage[0], count);}
    else if (count == 4 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(5);});}

    else if (count == 10 && response != 7) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(12);});}
    else if (count == 10 && response == 7) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(11);});}


    // change to 12, 14, and 13
    else if (count == 12 && response == 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(14);});}
    else if (count == 12 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(13);});}

    // change to 23, 24, 25,
    else if (count == 23 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(24);});}
    else if (count == 23 && response == 0 && newPartner == 1) {newPartner = 0; $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(25);});}
    else if (count == 23 && response == 0 && newPartner != 1) {app.renderLastPage(lastPage[0], count);}

    // change to 24, 25, 24
    else if (count == 24 && newPartner == 1) {newPartner = 0; $("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(25);});}
    else if (count == 24 && newPartner == 0) {app.renderLastPage(lastPage[0], count);}

    // change to 37
    else if (count == 37) {app.renderLastPage(lastPage[0], count);}

    // change to 38 and 39
    else if (count == 38 && response == 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(39);});}
    // change to 38 and 40
    else if (count == 38 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(40);});}

    // change to 56
    else if (count == 56) {app.renderLastPage(lastPage[0], count);}

	// logic in case participant missed the survey link
	// go back to survey link if they mixed it
	else if (count == 58 && response == 1){$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(57);});}
	// or else, just go to the end of the survey
	else if (count == 58 && response == 0){app.renderLastPage(lastPage[0], count);}
// 		//Uncomment the "/*else*/" below only when customizing question logic (Stage 3), so that the app will just proceed to the next question in the JSON database
// 		//DO NOT uncomment the "/*else*/" below when testing whether questions are being displayed in the right format (Stage 1) OR if you have no question logic
		//in your questionnaire
	   else if (count < surveyQuestions.length-1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(count+1);});}
	   else {app.renderLastPage(lastPage[0], count);};
},

/* Prepare for Resume and Store Data */
/* Time stamps the current moment to determine how to resume */
pauseEvents: function() {
    localStore.pause_time = new Date().getTime();
    localStore.uniqueKey = uniqueKey;
    app.saveData();
},

sampleParticipant: function() {
    var current_moment = new Date();
    var current_time = current_moment.getTime();
    app.scheduleNotifTrigger(current_moment);
//     current_time = 1622687432000;
    //change X to the amount of time the participant is locked out of the app for in milliseconds
    //e.g., if you want to lock the participant out of the app for 10 minutes, replace X with 600000
    //If you don't have a snooze feature, remove the "|| localStore.snoozed == 1"

    var nowDayOfWeek = new Date().getDay();
	var weekendSleepTime = localStore.weekendSleepTime.split(":");
	var weekdaySleepTime = localStore.weekdaySleepTime.split(":");

//	if (nowDayOfWeek == 0 || nowDayOfWeek == 6) {
//		var surveyHour = Number(weekendSleepTime[0]) - 1;
//   		var surveyMinutes = Number(weekendSleepTime[1]);
//	}
//	else {
//		var surveyHour = Number(weekdaySleepTime[0]) - 1;
//		var surveyMinutes = Number(weekdaySleepTime[1]);

//	}

    surveyHour = 21;
    surveyMinutes = 0;
	var surveyTime = new Date();
	surveyTime.setHours(surveyHour, surveyMinutes, 0 , 0);
	var surveyTimeEpoch = surveyTime.getTime();

	var nextExpSampling = new Date();
	// var tomorrow = new Date().getDate() + 1;
	// nextExpSampling.setDate(tomorrow);
	nextExpSampling.setHours(10, 0, 0, 0);
	var nextExpSamplingEpoch = nextExpSampling.getTime();

    if (current_time >= surveyTimeEpoch || current_time < nextExpSamplingEpoch){
		uniqueKey = localStore.uniqueKey;
    	var startTime = new Date(uniqueKey);
    	var syear = startTime.getFullYear(), smonth = startTime.getMonth(), sday=startTime.getDate(), shours=startTime.getHours(), sminutes=startTime.getMinutes(), sseconds=startTime.getSeconds(), smilliseconds=startTime.getMilliseconds();
    	localStore[uniqueKey + "_" + "startTime"  + "_" + syear + "_" + smonth + "_" + sday + "_" + shours + "_" + sminutes + "_" + sseconds + "_" + smilliseconds] = 1;
      	networkString = localStore.networkString;
      	app.renderQuestion(57);
	}

    else if ((current_time - localStore.pause_time) > 10000 || localStore.snoozed == 1) { //Liz Here: Return to 10 minutes or 600000 ms
        uniqueKey = new Date().getTime();
        localStore.snoozed = 1;
    	var startTime = new Date(uniqueKey);
    	var syear = startTime.getFullYear(), smonth = startTime.getMonth(), sday=startTime.getDate(), shours=startTime.getHours(), sminutes=startTime.getMinutes(), sseconds=startTime.getSeconds(), smilliseconds=startTime.getMilliseconds();
    	localStore[uniqueKey + "_" + "startTime"  + "_" + syear + "_" + smonth + "_" + sday + "_" + shours + "_" + sminutes + "_" + sseconds + "_" + smilliseconds] = 1;
        app.renderQuestion(0);
    }
    else {
    	uniqueKey = localStore.uniqueKey;
    }
    app.saveData();
},

//uncomment this function to test data saving function (Stage 2 of Customization)
saveDataLastPage:function() {
 	var storage = JSON.stringify(localStore);
 	var storage_save=JSON.parse(storage);
     $.ajax({
            type: 'post',
            url: 'https://script.google.com/macros/s/AKfycbwNbYN3aB6nr-5Qt5oAhXBsq8869ItiXFmCJ6h36nIl1YVGvn_6Y-KiGuZb_rX_J8PW/exec',
            data: storage_save,
            crossDomain: true,
            timeout: 180000,
            success: function (result) {
            	var pid = localStore.participant_id, snoozed = localStore.snoozed, uniqueKey = localStore.uniqueKey, pause_time=localStore.pause_time;//, networkString = localStore.networkString;
            	var weekendSleepTime = localStore.weekendSleepTime, weekdaySleepTime = localStore.weekdaySleepTime, mediaCondition = localStore.mediaCondition;
            	var scheduleNotifsTime2 = localStore.scheduleNotifsTime2, installationDate = localStore.installationDate,  networkString = localStore.networkString;
            	var secondNotifDate = localStore.secondNotifDate;
            	localStore.clear();
            	localStore.participant_id = pid;
              	localStore.networkString = networkString;
              	localStore.mediaCondition = mediaCondition;
            	localStore.snoozed = snoozed;
 				localStore.uniqueKey = uniqueKey;
 				localStore.pause_time = pause_time;
 				localStore.weekendSleepTime = weekendSleepTime;
 				localStore.weekdaySleepTime = weekdaySleepTime;
 				localStore.mediaCondition = mediaCondition;
 				localStore.scheduleNotifsTime2 = scheduleNotifsTime2;
           		localStore.installationDate = installationDate;
           		localStore.secondNotifDate = secondNotifDate;
//  				console.log("storage is " + storage);
            	$("#question").html("<h3>Your responses have been recorded. Thank you for completing this survey.</h3>");
            },
            complete: function(data){
            	console.log("completed");
            },
			error: function (request, textStatus, errorThrown) {
						if (textStatus === "timeout"){
							$("#question").html("<h3>It looks like the server is currently overloaded. Please try resending your data later. Click on the button below, and we'll remind you in 30 minutes to try sending your data again. If problems persist, please contact the researchers (seeinghumanlab@gmail.com).</h3><br><button>Set Data Sending Reminder</button>");
							$("#question button").click(function () {app.dataSendingNotif();localStore.snoozed=2;console.log("localStore.snoozed is " + localStore.snoozed);});

						}
						else {
							var response = JSON.stringify(request);
							console.log("request is " + response);
							$("#question").html("<h3>Please try resending data. If problems persist, please contact the researchers (dailysurveystudy@gmail.com).</h3><br><button>Resend data</button>");
							$("#question button").click(function () {app.saveDataLastPage();});
						}
					}
            });
//            e.preventDefault();
},

//uncomment this function to test data saving function (Stage 2 of Customization)
saveData:function() {
 	var storage = JSON.stringify(localStore);
 	var storage_save=JSON.parse(storage);
     $.ajax({
            type: 'post',
            //https://script.google.com/macros/s/AKfycbwNbYN3aB6nr-5Qt5oAhXBsq8869ItiXFmCJ6h36nIl1YVGvn_6Y-KiGuZb_rX_J8PW/exec
            url: 'https://script.google.com/macros/s/AKfycbwNbYN3aB6nr-5Qt5oAhXBsq8869ItiXFmCJ6h36nIl1YVGvn_6Y-KiGuZb_rX_J8PW/exec',
            data: storage_save,
            crossDomain: true,
            success: function (result) {
              	var pid = localStore.participant_id, snoozed = localStore.snoozed, uniqueKey = localStore.uniqueKey, pause_time=localStore.pause_time;
              	var weekendSleepTime = localStore.weekendSleepTime, weekdaySleepTime = localStore.weekdaySleepTime, mediaCondition = localStore.mediaCondition;
            	var scheduleNotifsTime2 = localStore.scheduleNotifsTime2, installationDate = localStore.installationDate,  networkString = localStore.networkString;
            	var secondNotifDate = localStore.secondNotifDate;
            	localStore.participant_id = pid;
              	localStore.networkString = networkString;
              	localStore.mediaCondition = mediaCondition;
            	localStore.snoozed = snoozed;
 				localStore.uniqueKey = uniqueKey;
 				localStore.pause_time = pause_time;
 				localStore.weekendSleepTime = weekendSleepTime;
 				localStore.weekdaySleepTime = weekdaySleepTime;
				localStore.mediaCondition = mediaCondition;
           		localStore.scheduleNotifsTime2 = scheduleNotifsTime2;
           		localStore.installationDate = installationDate;
           		localStore.secondNotifDate = secondNotifDate;
            },
            complete: function(data){
            	console.log("completed");
            },
            error: function (request, error) {
            	console.log(error);
            	var response = JSON.stringify(request);
				console.log("request is " + response);
            	}
            });
//             e.preventDefault();
},


saveDataAndClear:function() {
	var storage=JSON.stringify(localStore);
	var storage_save=JSON.parse(storage);
    $.ajax({
		//If you are using the google option, the "type" should be 'get'
		//If you are using the server option, the "type" should be 'post'
           type: 'post',
			//url: 'https://script.google.com/macros/s/AKfycbxeP9Fg9n2Te-RPby7EaVheLqwI0hCWbu1Uo7G-1MltaZf8GDaG/exec',
			//second server
			//url: 'https://script.google.com/macros/s/AKfycbwKNBIjN6in_RR4NK6s_IVrKqkp9mhiKIzQUWrcLV5RzDFGQAVs/exec',
           //third server
           // https://script.google.com/macros/s/AKfycbwNbYN3aB6nr-5Qt5oAhXBsq8869ItiXFmCJ6h36nIl1YVGvn_6Y-KiGuZb_rX_J8PW/exec
            url: 'https://script.google.com/macros/s/AKfycbwNbYN3aB6nr-5Qt5oAhXBsq8869ItiXFmCJ6h36nIl1YVGvn_6Y-KiGuZb_rX_J8PW/exec',
           data: storage_save,
           crossDomain: true,
           success: function (result) {
              	var pid = localStore.participant_id, snoozed = localStore.snoozed, uniqueKey = localStore.uniqueKey, pause_time=localStore.pause_time;
              	var weekendSleepTime = localStore.weekendSleepTime, weekdaySleepTime = localStore.weekdaySleepTime, mediaCondition = localStore.mediaCondition;
            	var scheduleNotifsTime2 = localStore.scheduleNotifsTime2, installationDate = localStore.installationDate;
            	var networkString = localStore.networkString;
            	var secondNotifDate = localStore.secondNotifDate;
            	localStore.clear();
            	localStore.participant_id = pid;
              	localStore.networkString = networkString;
            	localStore.snoozed = snoozed;
 				localStore.uniqueKey = uniqueKey;
 				localStore.pause_time = pause_time;
 				localStore.weekendSleepTime = weekendSleepTime;
 				localStore.weekdaySleepTime = weekdaySleepTime;
				localStore.mediaCondition = mediaCondition;
           		localStore.scheduleNotifsTime2 = scheduleNotifsTime2;
           		localStore.installationDate = installationDate;
           		localStore.secondNotifDate = secondNotifDate;
//            		alert("data has been saved");

           },
           complete: function(data){
            	console.log("completed");
            },
           error: function (request, error) {
            	console.log(error);
            	var response = JSON.stringify(request);
				console.log("request is " + response);
            	}
            });
//             e.preventDefault();
},



// Local Notifications Javascript
// Stage 5 of Customization
//This code is for signal-contingent designs with varying time intervals between notifications
scheduleNotifs:function() {
		//Section 1 - Declaring necessary variables
		//Declare an empty array to hold all your notifications
		var notifs=[];
		//Declares the number of intervals between the notifications for each day (i.e., if beeping participants 6 times, declare 6 intervals)
    var interval1, interval2, interval3, interval4, interval5, interval6, interval7;

		//Declares a variable to represent the id of each notification for the day
		//Declare as many letters as you have intervals (i.e., 6 intervals, declare 6 ids)
    var a, b, c, d, e, f, g;

		//Declare a variable to represent new date to be calculated for each beep
		//That is, if there are 6 intervals, declare 6 new dates
    var date1, date2, date3, date4, date5, date6, date7;

    var epoch1, epoch2, epoch3, epoch4, epoch5, epoch6, epoch7;

		//The statement below declares the start and end time of the daily data collection period
		//These variables are not necessary if the start and end time of the daily data collection period do not vary across the experience
		//sampling data collection period
    var currentMaxHour, currentMaxMinute, currentMinHour, currentMinMinute, nextMinHour, nextMinMinute;

		//The next three lines create variables for the present time when the notifications are being scheduled
    var dateObject = new Date();
    var now = dateObject.getTime();
    var dayOfWeek = dateObject.getDay(), currentHour = dateObject.getHours(), currentMinute = dateObject.getMinutes();

		//The next variables represent the amount of time between the end of the data collection to the start of the next one (nightlyLag),
		//the interval between the scheduling time and the start of the first data collection period (currentLag), the maximum amount of time
		//in the data collection period (maxInterval), and the time between until the end of the next data collection period (in our case
		//Sleep time; SleepInterval)
    var currentLag, maxInterval, SleepInterval;
    var surveyHour, surveyMinutes;

		//These variables represent the participant's time values
		var weekendSleepTime = localStore.weekendSleepTime.split(":");
		var weekendWakeTime = localStore.weekendWakeTime.split(":");
		var weekdaySleepTime = localStore.weekdaySleepTime.split(":");
		var weekdayWakeTime = localStore.weekdayWakeTime.split(":");

		//Then you can declare any values that you might use more than once such as the number of milliseconds in a day
   	var day = 86400000;
   	var minDiaryLag = 6000000;
   	var randomDiaryLag = 1200000;

   	var installationTime = new Date();
    var secondNotifDate = new Date();
    secondNotifDate.setDate(secondNotifDate.getDate()+7);
    secondNotifDate.setHours(6, 0, 0, 0);

 	var secondLocalNotif = new Date();
 	secondLocalNotif.setDate(secondLocalNotif.getDate()+7);
 	secondLocalNotif.setHours(10, 0, 0, 0);
 	var secondLocalNotifEpoch = secondLocalNotif.getTime();

		//This is a loop that repeats this block of codes for the number of days there are in the experience sampling period
		//Replace X with the number of days in the experience sampling period (e.g., collecting data for 7 days, replace X with 7)
		//Note that iOS apps can only have 64 unique notifications, so you should keep that in mind if you are collecting data
		//for more than longer periods of time
    for (i = 0; i < 7; i++)
    {
		//The code below (up to "else { nightlyLag = ...}" is only necessary if you allow the daily data collection period to vary across
		//weekdays and weekends
   		currentMaxHour = 20;
   		currentMaxMinutes = 0;
   		currentMinHour = 10;
   		currentMinMinutes = 0;
   		nextMinHour = 10;
   		nextMinMinutes = 0;
   		currentLag = (((((24 - parseInt(currentHour) + parseInt(currentMinHour))*60) - parseInt(currentMinute) + parseInt(currentMinMinutes))*60)*1000);

        var alarmDay = dayOfWeek + 1 + i;
        if (alarmDay > 6) {alarmDay = alarmDay-7};
        surveyHour = 21;
        surveyMinutes = 00;
        surveyLag = (((((24 - Number(currentHour) + Number(surveyHour))*60) - Number(currentMinute) + Number(surveyMinutes))*60)*1000);

    	// determine lag for nightly diary
//    	var alarmDay = dayOfWeek + 1 + i;
//    	if (alarmDay > 6) {alarmDay = alarmDay-7;}
        //enter time weekendDinnerTime hour and then enter weekendDinnerTime minute
//   		if (alarmDay == 0 || alarmDay == 6) {
//   			surveyHour = Number(weekendSleepTime[0]) - 1;
//   			surveyMinutes = Number(weekendSleepTime[1]);
//   			}

//   		else {
//   				surveyHour = Number(weekdaySleepTime[0]) - 1;
//   				surveyMinutes = Number(weekdaySleepTime[1]);
//   				}
//   		if (surveyHour <= 10){
//   			surveyLag = (((((48 - Number(currentHour) + Number(surveyHour))*60) - Number(currentMinute) + Number(surveyMinutes))*60)*1000);
//   		}
//   		else {
//   			surveyLag = (((((24 - Number(currentHour) + Number(surveyHour))*60) - Number(currentMinute) + Number(surveyMinutes))*60)*1000);
//   		}

        //The maxInterval is the number of milliseconds between wakeup time and Sleep time
        maxInterval = (((((parseInt(currentMaxHour) - parseInt(currentMinHour))*60) + parseInt(currentMaxMinute) - parseInt(currentMinMinute))*60)*1000);
			//This part of the code calculates how much time there should be between the questionnaires
			//Change X to the minimum amount of time that should elapse between beeps in seconds
			//Change Y to the amount of additional time in seconds that should elapse to reach the maximum amount of time
			//The part of the code that accompanies Y randomly generates a number that allows for notifications to occur randomly between X and X+Y after the previous beep
			//That is, X + Y = maximum amount of time that can elapse between beeps

			//If designing an interval-based design, delete "Math.round(Math.random()*Y)+" and replace X with the amount of time in seconds between each beep
   			interval1 = parseInt(currentLag) + (parseInt(Math.round(Math.random()*30))) + day*i;
   			interval2 = interval1 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
   			interval3 = interval2 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
   			interval4 = interval3 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
   			interval5 = interval4 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
            interval6 = interval5 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
            // schedule nightly survey link
            interval7 = parseInt(surveyLag) + day*i;


			//This part of the code calculates a unique ID for each notification
        a = 101+(parseInt(i)*100);
        b = 102+(parseInt(i)*100);
        c = 103+(parseInt(i)*100);
        d = 104+(parseInt(i)*100);
        e = 105+(parseInt(i)*100);
        f = 106+(parseInt(i)*100);
        //survey nightly survey link
        g = 107+(parseInt(i)*100);

			//This part of the code calculates the time when the notification should be sent by adding the time interval to the current date and time
        date1 = new Date(now + interval1);
        date2 = new Date(now + interval2);
        date3 = new Date(now + interval3);
        date4 = new Date(now + interval4);
        date5 = new Date(now + interval5);
        date6 = new Date(now + interval6);
        date7 = new Date(now + interval7);

        epoch1 = date1.getTime();
        epoch2 = date2.getTime();
        epoch3 = date3.getTime();
        epoch4 = date4.getTime();
        epoch5 = date5.getTime();
        epoch6 = date6.getTime();
        epoch7 = date7.getTime();



			//This part of the code schedules the notifications. It pushes all the properties into the notif array
        	cordova.plugins.notification.local.schedule([
        		{id: a, trigger: {at: new Date(epoch1)}, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
        		{id: b, trigger: {at: new Date(epoch2)}, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
        		{id: c, trigger: {at: new Date(epoch3)}, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
        		{id: d, trigger: {at: new Date(epoch4)}, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
        		{id: e, trigger: {at: new Date(epoch5)}, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
        		{id: f, trigger: {at: new Date(epoch6)}, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
        		{id: g, trigger: {at: new Date(epoch7)}, text: 'Time for your nightly Diary Survey!', title: 'Nightly Survey'}

        	]);

			//This part of the code records when the notifications are scheduled for and sends it to the server
        	localStore['notification_' + i + '_1'] = localStore.participant_id + "_" + a + "_" + date1;
        	localStore['notification_' + i + '_2'] = localStore.participant_id + "_" + b + "_" + date2;
        	localStore['notification_' + i + '_3'] = localStore.participant_id + "_" + c + "_" + date3;
        	localStore['notification_' + i + '_4'] = localStore.participant_id + "_" + d + "_" + date4;
        	localStore['notification_' + i + '_5'] = localStore.participant_id + "_" + e + "_" + date5;
        	localStore['notification_' + i + '_6'] = localStore.participant_id + "_" + f + "_" + date6;
            localStore['notification_' + i + '_7'] = localStore.participant_id + "_" + g + "_" + date7;
    }
	cordova.plugins.notification.local.schedule({
                                         id: "999999",
                                         title: 'Diary Surveys',
                                         text: `It's time for you to schedule next week's surveys!`,
                                         at: new Date(secondLocalNotifEpoch),
                                         });
    console.log("secondLocalNotifEpoch is " + new Date(secondLocalNotifEpoch));
    localStore.installationDate=installationTime;
    localStore.secondNotifDate = secondNotifDate;
//     alert("Your notifications have been scheduled.");
},

scheduleNotifs2:function() {
		//Section 1 - Declaring necessary variables
		//Declare an empty array to hold all your notifications
		var notifs=[];
		//Declares the number of intervals between the notifications for each day (i.e., if beeping participants 6 times, declare 6 intervals)
    var interval1, interval2, interval3, interval4, interval5, interval6, interval7;

		//Declares a variable to represent the id of each notification for the day
		//Declare as many letters as you have intervals (i.e., 6 intervals, declare 6 ids)
    var a, b, c, d, e, f, g;

		//Declare a variable to represent new date to be calculated for each beep
		//That is, if there are 6 intervals, declare 6 new dates
    var date1, date2, date3, date4, date5, date6, date7;

    var epoch1, epoch2, epoch3, epoch4, epoch5, epoch6, epoch7;

		//The statement below declares the start and end time of the daily data collection period
		//These variables are not necessary if the start and end time of the daily data collection period do not vary across the experience
		//sampling data collection period
    var currentMaxHour, currentMaxMinute, currentMinHour, currentMinMinute, nextMinHour, nextMinMinute;

		//The next three lines create variables for the present time when the notifications are being scheduled
    var dateObject = new Date();
    var now = dateObject.getTime();
    var dayOfWeek = dateObject.getDay(), currentHour = dateObject.getHours(), currentMinute = dateObject.getMinutes();
    scheduleNotifsTime2 = new Date();

		//The next variables represent the amount of time between the end of the data collection to the start of the next one (nightlyLag),
		//the interval between the scheduling time and the start of the first data collection period (currentLag), the maximum amount of time
		//in the data collection period (maxInterval), and the time between until the end of the next data collection period (in our case
		//Sleep time; SleepInterval)
    var currentLag, maxInterval, SleepInterval;
    var surveyHour, surveyMinutes;

		//These variables represent the participant's time values
		var weekendSleepTime = localStore.weekendSleepTime.split(":");
		var weekdaySleepTime = localStore.weekdaySleepTime.split(":");

		//Then you can declare any values that you might use more than once such as the number of milliseconds in a day
   	var day = 86400000;
   	var minDiaryLag = 6000000;
   	var randomDiaryLag = 1200000;

		//This is a loop that repeats this block of codes for the number of days there are in the experience sampling period
		//Replace X with the number of days in the experience sampling period (e.g., collecting data for 7 days, replace X with 7)
		//Note that iOS apps can only have 64 unique notifications, so you should keep that in mind if you are collecting data
		//for more than longer periods of time
    for (i = 0; i < 7; i++)
    {
		//The code below (up to "else { nightlyLag = ...}" is only necessary if you allow the daily data collection period to vary across
		//weekdays and weekends
   		currentMaxHour = 20;
   		currentMaxMinutes = 0;
   		currentMinHour = 10;
   		currentMinMinutes = 0;
   		nextMinHour = 10;
   		nextMinMinutes = 0;
   		currentLag = (((((24 - parseInt(currentHour) + parseInt(currentMinHour))*60) - parseInt(currentMinute) + parseInt(currentMinMinutes))*60)*1000);

    	// determine lag for nightly diary
    	var alarmDay = dayOfWeek + 1 + i;
    	if (alarmDay > 6) {alarmDay = alarmDay-7;}
        //enter time weekendDinnerTime hour and then enter weekendDinnerTime minute
   		if (alarmDay == 0 || alarmDay == 6) {
   			surveyHour = Number(weekendSleepTime[0]) - 1;
   			surveyMinutes = Number(weekendSleepTime[1]);
   			}

   		else {
   				surveyHour = Number(weekdaySleepTime[0]) - 1;
   				surveyMinutes = Number(weekdaySleepTime[1]);
   				}
   		if (surveyHour <= 10){
   			surveyLag = (((((48 - Number(currentHour) + Number(surveyHour))*60) - Number(currentMinute) + Number(surveyMinutes))*60)*1000);
   		}
   		else {
   			surveyLag = (((((24 - Number(currentHour) + Number(surveyHour))*60) - Number(currentMinute) + Number(surveyMinutes))*60)*1000);
   		}

        //The maxInterval is the number of milliseconds between wakeup time and Sleep time
        maxInterval = (((((parseInt(currentMaxHour) - parseInt(currentMinHour))*60) + parseInt(currentMaxMinute) - parseInt(currentMinMinute))*60)*1000);
			//This part of the code calculates how much time there should be between the questionnaires
			//Change X to the minimum amount of time that should elapse between beeps in seconds
			//Change Y to the amount of additional time in seconds that should elapse to reach the maximum amount of time
			//The part of the code that accompanies Y randomly generates a number that allows for notifications to occur randomly between X and X+Y after the previous beep
			//That is, X + Y = maximum amount of time that can elapse between beeps

			//If designing an interval-based design, delete "Math.round(Math.random()*Y)+" and replace X with the amount of time in seconds between each beep
   			interval1 = parseInt(currentLag) + (parseInt(Math.round(Math.random()*30))) + day*i;
   			interval2 = interval1 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
   			interval3 = interval2 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
   			interval4 = interval3 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
   			interval5 = interval4 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
            interval6 = interval5 + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag));
            // schedule nightly survey link
            interval7 = parseInt(surveyLag) + day*i;


			//This part of the code calculates a unique ID for each notification
        a = 101+(parseInt(i)*100);
        b = 102+(parseInt(i)*100);
        c = 103+(parseInt(i)*100);
        d = 104+(parseInt(i)*100);
        e = 105+(parseInt(i)*100);
        f = 106+(parseInt(i)*100);
        //survey nightly survey link
        g = 107+(parseInt(i)*100);

			//This part of the code calculates the time when the notification should be sent by adding the time interval to the current date and time
        date1 = new Date(now + interval1);
        date2 = new Date(now + interval2);
        date3 = new Date(now + interval3);
        date4 = new Date(now + interval4);
        date5 = new Date(now + interval5);
        date6 = new Date(now + interval6);
        date7 = new Date(now + interval7);

        epoch1 = date1.getTime();
        epoch2 = date2.getTime();
        epoch3 = date3.getTime();
        epoch4 = date4.getTime();
        epoch5 = date5.getTime();
        epoch6 = date6.getTime();
        epoch7 = date7.getTime();



			//This part of the code schedules the notifications. It pushes all the properties into the notif array
        	cordova.plugins.notification.local.schedule([
        		{id: a, trigger: {at: new Date(epoch1)}, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
        		{id: b, trigger: {at: new Date(epoch2)}, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
        		{id: c, trigger: {at: new Date(epoch3)}, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
        		{id: d, trigger: {at: new Date(epoch4)}, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
        		{id: e, trigger: {at: new Date(epoch5)}, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
        		{id: f, trigger: {at: new Date(epoch6)}, text: 'Time for your next Diary Survey!', title: 'Diary Surveys'},
        		{id: g, trigger: {at: new Date(epoch7)}, text: 'Time for your nightly Diary Survey!', title: 'Nightly Survey'}

        	]);

			//This part of the code records when the notifications are scheduled for and sends it to the server
        	localStore['notification_' + i + '_1'] = localStore.participant_id + "_" + a + "_" + date1;
        	localStore['notification_' + i + '_2'] = localStore.participant_id + "_" + b + "_" + date2;
        	localStore['notification_' + i + '_3'] = localStore.participant_id + "_" + c + "_" + date3;
        	localStore['notification_' + i + '_4'] = localStore.participant_id + "_" + d + "_" + date4;
        	localStore['notification_' + i + '_5'] = localStore.participant_id + "_" + e + "_" + date5;
        	localStore['notification_' + i + '_6'] = localStore.participant_id + "_" + f + "_" + date6;
            localStore['notification_' + i + '_7'] = localStore.participant_id + "_" + g + "_" + date7;

    }
//     alert("scheduleNotifsTime2 is " + scheduleNotifsTime2);
    localStore.scheduleNotifsTime2 = scheduleNotifsTime2;
//     alert("localStore.scheduleNotifsTime2 is " + localStore.scheduleNotifsTime2);
    app.saveDataAndClear();
	alert("Your notifications have been scheduled.");
// 	alert("networkString is " + localStore.networkString);
},


//Stage 4 of Customization
//Uncomment lines inside the snoozeNotif function to test the snooze scheduling notification function
//Replace X with the number of seconds you want the app to snooze for (e.g., 10 minutes is 600 seconds)
//You can also customize the Title of the message, the snooze message that appears in the notification
snoozeNotif:function() {
    var now = new Date().getTime(), snoozeDate = new Date(now + 600*1000);
    var id = '99';
    cordova.plugins.notification.local.schedule({
                                         id: id,
                                         title: 'Diary Survey',
                                         text: 'Are you able to take the survey now?',
                                         at: snoozeDate,
                                         });
},
//This function forces participants to respond to an open-ended question if they have left it blank
validateResponse: function(data){
        var text = data.val();
//         console.log(text);
        if (text === ""){
        	return false;
        } else {
        	return true;
        }
    },
validateNumber: function(data){
        var num = data.val();
//         console.log(text);
		if (num === "") {
			return false
		}
        else if (isNaN(num)){
        	return false;
        }
        else {
        	return true;
        }
    },
validateTime: function(data){
	var time = data.val();
	if (time=== ""){
		return false
	}
	else {
		return true
	}
},

daysBetweenDates: function( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;

  // Convert back to days and return
  return Math.round(difference_ms/one_day);
},

scheduleNotifTrigger: function(now){
	var daysUntilSecondNotif;
	if (localStore.secondNotifDate != undefined){
		var secondNotifDate = new Date(localStore.secondNotifDate);
		daysUntilSecondNotif = app.daysBetweenDates(now, secondNotifDate);
//        alert("daysUntilSecondNotif is " + daysUntilSecondNotif);
	}
	if (daysUntilSecondNotif <= 0 && localStore.scheduleNotifsTime2 == "undefined"){
		alert("Your questions will load shortly. Please wait while we schedule your notifications for the next week. ");
		app.scheduleNotifs2();
	}

},

testNotif:function() {
    var id = '9999';
    cordova.plugins.notification.local.schedule({
                                         icon: 'ic_launcher',
                                         id: id,
                                         title: 'Daily Surveys',
                                         text: 'Your test notification has fired!',
                                         trigger: {in: 10, unit: 'second'},
                                         });
},

};
