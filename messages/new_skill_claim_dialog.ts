export default {
  callback_id: 'new_skill_claim_submit',
  title: 'Sign skill claim',
  submit_label: 'Sign',
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