
import Help from './messages/help'
import { sendProfileForRequest } from './actions/profile'
import { sendVoteForRequest } from './actions/new_claim'

export default (req, res, next) => {
  if (req.body.command === '/wot') {
    const type = req.body.text.split(' ')[0];
    if (type === 'profile') {
      res.json();
      sendProfileForRequest(req.body)
    } else if (type === 'vote') {
      res.json();
      sendVoteForRequest(req.body)
    } else {
      res.json(Help);
    }
  } else {
    next();
  }
}
