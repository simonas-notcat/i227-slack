
export default (req, res, next) => {
  if (req.body.command === '/interactive-example') {
    const type = req.body.text.split(' ')[0];
    if (type === 'button') {
      res.json(interactiveButtons);
    } else {
      res.send('Use this command followed by `button`, `menu`, or `dialog`.');
    }
  } else {
    next();
  }
}

const interactiveButtons = {
  text: 'The terms of service for this app are _not really_ here: <https://unsplash.com/photos/bmmcfZqSjBU>',
  response_type: 'in_channel',
  attachments: [{
    text: 'Do you accept the terms of service?',
    callback_id: 'accept_tos',
    actions: [
      {
        name: 'accept_tos',
        text: 'Yes',
        value: 'accept',
        type: 'button',
        style: 'primary',
      },
      {
        name: 'accept_tos',
        text: 'No',
        value: 'deny',
        type: 'button',
        style: 'danger',
      },
    ],
  }],
};
