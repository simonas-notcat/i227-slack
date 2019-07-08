
import Help from './messages/help'
import { sendProfileForRequest } from './actions/profile'

export default (req, res, next) => {
  if (req.body.command === '/devbot') {
    const type = req.body.text.split(' ')[0];
    if (type === 'profile') {
      res.json();
      sendProfileForRequest(req.body)
    } else {
      res.json(Help);
    }
  } else {
    next();
  }
}
