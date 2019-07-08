export default {
  callback_id: 'new_skill_claim_submit',
  title: 'Endorse skill',
  submit_label: 'Endorse',
  elements: [
    {
      label: 'Teammate',
      type: 'select',
      name: 'user',
      data_source: 'users',
      placeholder: 'Teammate Name'
    },
    {
      label: 'Skill',
      type: 'select',
      name: 'skill',
      "options": [
        {
          "label": "Developer",
          "value": "Developer"
        },
        {
          "label": "Foosball winner",
          "value": "Foosball winner"
        },
        {
          "label": "Product Manager",
          "value": "Product Manager"
        },
        {
          "label": "UX Designer",
          "value": "UX Designer"
        },
      ]
      },
  ],
};